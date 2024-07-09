from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .permissions import *
from django.contrib.auth import login
from rest_framework import generics
from django.shortcuts import render
from rest_framework import status
from.serializers import *
from .models import *
import datetime

# Create your views here.


class StudentListCreateView(generics.ListAPIView):
      queryset = Student.objects.all()
      serializer_class = StudentReadSerializer


class AssignmentViewAPI(generics.ListAPIView ,generics.CreateAPIView):
      queryset = assignements.objects.all()
      serializer_class = AssignmentSerializer
  
     # completed the creation as well as the duplicate data handling
 
      def create(self, request, *args, **kwargs):
            
            student_id =  int(self.request.data["student"])
            submitted_to = int(self.request.data["submitted_to"])

            object = Assignmnet_given_by_teacher.objects.get(id = submitted_to)
            
            for i in object.data.all():
                  if i.student.id ==  student_id:
                        return Response({
                     "Message":"You have already submitted the assignment"
                        })        
            
            return super().create(request, *args, **kwargs)
      def get_queryset(self):
           
           subject = (self.request.GET.get("subject"))
           submitted_to = (self.request.GET.get("submitted_to"))
           print(subject)
           print(submitted_to)
           if subject:
                subject = Subject.objects.get(id = int(subject))

           if submitted_to:
                submitted_to = Assignmnet_given_by_teacher.objects.get(id = int(submitted_to))     

           if subject and submitted_to:
                  
                  return assignements.objects.filter(submitted_to = submitted_to).filter(subject = subject)
           
           return super().get_queryset()
      



class AssignmnetUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
      queryset = assignements.objects.all()
      serializer_class = AssignmentSerializer


class AssignmentGivenDataAPI(generics.ListAPIView , generics.CreateAPIView):
    
    # This route will be designed both ways for listing all the data as well as listing specific subject data
     
      queryset = Assignmnet_given_by_teacher.objects.all()
      serializer_class = AssignmentGivenDataSerializer

      def get_queryset(self):
            
            subject = self.request.GET.get("subject")

            # submitted_to = self.request.GET.get("submitted_to")

            querysets = Assignmnet_given_by_teacher.objects.all()
            if subject:
                  subject_obj = Subject.objects.get(id = int(subject))
                  querysets = Assignmnet_given_by_teacher.objects.filter(subject = subject_obj)
            
            return querysets

class MarkAttendanceAPI(generics.RetrieveUpdateAPIView):

      queryset = Attendance.objects.all()
      serializer_class = AttendanceSerializer
      # print(self.request)
      def update(self, request, *args, **kwargs):
      #     print(request.user)
          if staff_data.objects.filter(name = request.user).exists():  
             subject = self.request.GET.get("sub")
             student = self.request.GET.get("stu")
             data = int(self.request.GET.get("data"))

             obj = Attendance.objects.filter(subject__name = subject).filter(student__name__username = student).first()

             if obj.status == data and datetime.date.today() == obj.updated_attendance:
                     return Response({"message": "No changes in attendance status."}, status=status.HTTP_200_OK)
            
             if datetime.date.today() != obj.updated_attendance:              
                  obj.subject.no_of_classes_occured+=1

             if obj.status==1 and data == 1: 
                if datetime.date.today() != obj.updated_attendance:
                      obj.no_of_classes_attended+=1
                      obj.status = data
                      obj.save()
             if data !=obj.status:
                  # if datetime.date.today() == obj.updated_attendance:
                  obj.status = data                  
                  if data == 0:   
                      obj.no_of_classes_attended-=1      
                      obj.save()

                  if data == 1:
                        obj.no_of_classes_attended+=1
                        obj.save()
                            
             return super().update(request, *args, **kwargs)
          else:
               return Response({
                    "Message":"Not authorized"
               })



from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.sessions.models import Session
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User, Student
from .serializers import LoginSerializer
import datetime

@csrf_exempt
@api_view(['POST'])
def logi_user_view(request):
    if request.method == 'POST':
        if request.content_type == 'multipart/form-data':
            data = request.POST.dict()
        else:
            data = JSONParser().parse(request)

        serialized_data = LoginSerializer(data=data)
        
        if serialized_data.is_valid():
            user = authenticate(username=data["Username"], password=data["Password"])
            if user and Student.objects.filter(name=user).exists():
                student = get_object_or_404(Student, name=user)
                login(request, user)

                # Create a new session
                session = Session()
                session.session_key = Session.objects.get_new_session_key()
                session.expire_date = datetime.datetime.now() + datetime.timedelta(days=7)  # Set expiration date
                session_data = {
                    'user_id': user.id,
                    'test_key': 'test_value'  # test key-value pair
                }
                session.session_data = Session.objects.encode(session_data)
                session.save()  # Save the session to generate a session key
                
                # Associate session with the request
                request.session = session_data
                request.session['session_key'] = session.session_key

                print("Login successfully done!")
                print("Session Key:", session.session_key)
                print("Session Data:", session_data)
                
                response_data = {
                    "STAFF_STATUS": False,
                    "ID": student.pk,
                    "USERNAME": student.name.username,
                    "session_key": session.session_key  # Include session key in response
                }
                return JsonResponse(response_data)
            else:
                return JsonResponse({
                    "Error": "Invalid username or password"
                }, status=401)
        else:
            return JsonResponse({
                "Error": serialized_data.errors
            }, status=400)



