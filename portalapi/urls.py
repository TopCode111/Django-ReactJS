from django.urls import path
from rest_framework import routers
from .api import PatientAPI, ProtocolViewSet, MedicalQuestionsAPI, activate, MedicalSurveyAPI

router = routers.DefaultRouter()

router.register('api/protocol', ProtocolViewSet)

urlpatterns = [
  path('api/patient', PatientAPI.as_view()),
  path('api/patient/<int:id>', PatientAPI.as_view()),
  path('api/protocol/<int:protocol_id>/questions', MedicalQuestionsAPI.as_view()),
  path('api/activate/<str:uidb64>/<str:token>', activate),
  path('api/survey/<str:uidb64>/<str:token>', MedicalSurveyAPI.as_view()),
] + router.urls