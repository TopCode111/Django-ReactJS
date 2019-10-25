from rest_framework import serializers
from authentication.serializer import SignupSerialzer
from authentication.models import User
from .models import Patient, Protocol, MedicalQuestions, PatientAnswers, MedicalQuestionChoices
from django.db import transaction

class PatientAnswersSerializer(serializers.ModelSerializer):
  class Meta:
    model = PatientAnswers
    fields = ['question_id', 'answer']

class PatientSerializer(serializers.ModelSerializer):
  
  user = SignupSerialzer(required=False)
  answers = PatientAnswersSerializer(required=False, many=True)

  class Meta:
    model = Patient
    fields = '__all__'
  
  def create(self, validated_data):
    user_data = validated_data.pop('user')

    with transaction.atomic():
      inserted_data = User.objects.create_patient(**user_data)
      patient = Patient.objects.create(user=inserted_data, **dict((k, v) for k, v in validated_data.items() if k != 'answers'))
      answers_list = validated_data['answers']
      for answer in answers_list:
        PatientAnswers.objects.create(patient=patient, **answer)

    return patient

class ProtocolSerializer(serializers.ModelSerializer):
  class Meta:
    model = Protocol
    fields = '__all__'

class MedicalQuestionChoicesSerializer(serializers.ModelSerializer):
  class Meta:
    model = MedicalQuestionChoices
    exclude = ('question',)
  
class MedicalQuestionsSerializer(serializers.ModelSerializer):
  medicalquestionchoices_set = MedicalQuestionChoicesSerializer(many=True)
  answer = serializers.CharField(required=False)
  class Meta:
    model = MedicalQuestions
    fields = '__all__'