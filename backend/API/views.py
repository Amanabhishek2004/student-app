from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from .permissions import *
from django.contrib.auth import login
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from rest_framework import status
from .serializers import *
from .models import *
from .utils import *
from django.conf import settings
import datetime

# Create your views here.

#  due assignmnets must have students name there


class MyObtainTokenPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        #  filtering the staff data
        token["USERNAME"] = user.username
        token["STAFF_STATUS"] = staff_data.objects.filter(name=user).exists()
        token["ID"] = user.pk

        return token


class MyObtainTokenPair(TokenObtainPairView):
    serializer_class = MyObtainTokenPairSerializer


class StudentListCreateView(generics.ListAPIView, generics.CreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    serializer_class = StudentReadSerializer

    def get_queryset(self):
        user_id = self.request.GET.get("user_id")
        print(self.request.user)

        if user_id:
            user = User.objects.get(username=user_id)
            staff = staff_data.objects.filter(name=user)

            if staff.exists():
                return Student.objects.all()
            if Student.objects.filter(name=user).exists():
                print(Student.objects.filter(name=user))
                return Student.objects.filter(name=user)

    def create(self, request, *args, **kwargs):
        if self.request.data:
            if self.request.data["name"]:
                user_obj = User(
                    username=self.request.data["name"]["username"],
                    email=self.request.data["name"]["email"],
                )
                # Set the password using set_password to ensure it is hashed
                user_obj.set_password(self.request.data["name"]["password"])
                user_obj.save()

                # Create the student object
                instance = Student.objects.create(name=user_obj)
                return Response({"data": instance})
        return super().create(request, *args, **kwargs)


class AssignmentViewAPI(generics.ListAPIView, generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = assignements.objects.all()
    serializer_class = AssignmentSerializer

    # completed the creation as well as the duplicate data handling

    def create(self, request, *args, **kwargs):
        if not staff_data.objects.filter(name=request.user).exists():
            student_id = int(self.request.data["student"])
            submitted_to = int(self.request.data["submitted_to"])

            object = Assignmnet_given_by_teacher.objects.get(id=submitted_to)

            for i in object.data.all():
                if i.student.id == student_id:
                    return Response(
                        {"Message": "You have already submitted the assignment"}
                    )

            return super().create(request, *args, **kwargs)
        return Response({"message": "not authorised"})

    def get_queryset(self):
        user = user_details(self.request)
        subject = self.request.GET.get("subject")
        submitted_to = self.request.GET.get("submitted_to")
        user_data = User.objects.get(id=user["ID"])
        print(self.request.user)
        if subject:
            subject = Subject.objects.get(id=int(subject))

        if submitted_to:
            submitted_to = Assignmnet_given_by_teacher.objects.get(id=int(submitted_to))
        if not user["STAFF_STATUS"]:

            if subject and submitted_to:

                return assignements.objects.filter(submitted_to=submitted_to).filter(
                    subject=subject
                )

            return super().get_queryset()
        else:
      

            if subject and submitted_to:
                submitted_to = Assignmnet_given_by_teacher.objects.get(id=int(self.request.GET.get("submitted_to")))
                subject = Subject.objects.get(id=int(self.request.GET.get("subject")))
                print("working")   
                return (
                    assignements.objects.filter(submitted_to=submitted_to)
                    .filter(subject=subject)
                )


class AssignmnetUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):

    queryset = assignements.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if request.GET.get("user_id"):
            user = User.objects.get(username=(request.GET.get("user_id")))
            if assignements.objects.filter(student__name=user).exists():

                return super().update(request, *args, **kwargs)
        else:
            return Response({"Message": "Not allowed"})


class AssignmentGivenDataAPI(generics.ListAPIView, generics.CreateAPIView):

    # This route will be designed both ways for listing all the data as well as listing specific subject data

    queryset = Assignmnet_given_by_teacher.objects.all()
    serializer_class = AssignmentGivenDataSerializer

    def get_queryset(self):
      
        subject = self.request.GET.get("subject")
        user_id = self.request.GET.get("user_id")
        print(user_id)

        staff = None
        querysets = Assignmnet_given_by_teacher.objects.all()

        if user_id:
            print("working")
            user = User.objects.get(username=user_id)
            staff = staff_data.objects.filter(name=user)
            if staff.exists():
                print(staff)
                querysets = Assignmnet_given_by_teacher.objects.filter(
                    teacher_name=staff.first()
                )
                print(querysets)

        if subject:
            subject_obj = Subject.objects.get(id=int(subject))
            querysets = Assignmnet_given_by_teacher.objects.filter(subject=subject_obj)

        return querysets


class MarkAttendanceAPI(generics.RetrieveUpdateAPIView):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def update(self, request, *args, **kwargs):

        user_id = request.GET.get("user_id")
        user_id = User.objects.get(id=int(user_id))
        if staff_data.objects.filter(name=user_id).exists():
            subject = self.request.GET.get("sub")
            student = self.request.GET.get("stu")
            data = int(self.request.GET.get("data"))

            obj = (
                Attendance.objects.filter(subject__name=subject)
                .filter(student__name__username=student)
                .first()
            )

            if obj.status == data and datetime.date.today() == obj.updated_attendance:
                return Response(
                    {"message": "No changes in attendance status."},
                    status=status.HTTP_200_OK,
                )

            if datetime.date.today() != obj.updated_attendance:
                obj.subject.no_of_classes_occured += 1

            if obj.status == 1 and data == 1:
                if datetime.date.today() != obj.updated_attendance:
                    obj.no_of_classes_attended += 1
                    obj.status = data
                    obj.save()
            if data != obj.status:

                obj.status = data
                if data == 0:
                    obj.no_of_classes_attended -= 1
                    obj.save()

                if data == 1:
                    obj.no_of_classes_attended += 1
                    obj.save()

            return super().update(request, *args, **kwargs)
        else:
            return Response({"Message": "Not authorized"})


class DueAssingmentGetApi(generics.ListAPIView):

    queryset = Assignmnet_given_by_teacher.objects.all()
    serializer_class = AssignmentGivenDataSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        objects = []
        if not staff_data.objects.filter(name=request.user).exists():
            user_data = user_details(self.request)
            user = User.objects.get(id=user_data["ID"])
            assignments_passed_due_date = Assignmnet_given_by_teacher.objects.filter(
                Deadline__lte=timezone.now().date()
            )
            for assignment in assignments_passed_due_date:
                is_user_assigned = any(
                    ass.student.name == user for ass in assignment.data.all()
                )
                if not is_user_assigned:
                    objects.append(assignment)
            print(objects)
            # Serialize the data and return the response
            serialized_data = self.get_serializer(objects, many=True)
            return Response({"data": serialized_data.data})

        else:
            assignments_passed_due_date = Assignmnet_given_by_teacher.objects.filter(
                teacher_name__name=request.user
            ).filter(Deadline__lte=timezone.now().date())
            for assignment in assignments_passed_due_date:
                students = Student.objects.all()

                for student in students:
                    is_user_assigned = any(
                        ass.student == student for ass in assignment.data.all()
                    )
                    if not is_user_assigned:
                        objects.append(
                            {
                                "Student": student.name.username,
                                "assignment": self.get_serializer(assignment).data,
                            }
                        )
         
            return Response({"data": objects})
