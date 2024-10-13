from django.contrib import admin
from django.urls import path , include
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
 
    path('refresh/' , TokenRefreshView.as_view() , name = "user-token-refresh"),
    path('token/' , MyObtainTokenPair.as_view() , name = "user-token-generator"),
    path('students/' , StudentListCreateView.as_view() , name = "student-api"),
    path('assignmnets/' , AssignmentViewAPI.as_view() , name = "assignment-api" ),
    path('assignmnets/RUD/<int:pk>' , AssignmnetUpdateDestroyAPI.as_view() , name = "assignment-update-delete" ),
    path("given_assignments/" , AssignmentGivenDataAPI.as_view() , name="assignment-given-data"),
    path("due_assingments/" , DueAssingmentGetApi.as_view() , name = "past-due-assignments"),
    path('Mark-Attendance/<int:pk>/' , MarkAttendanceAPI.as_view()  , name = "Mark-Attendance")
]