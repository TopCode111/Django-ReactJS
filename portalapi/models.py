from django.db import models
from authentication.models import User
# Create your models here.

QUESTION_TYPES = (
    ('PO', 'Polar'),
    ('OP', 'Options')
)

class Doctor(models.Model):
    speciality = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

class Protocol(models.Model):
    name = models.CharField(max_length=255)

class Patient(models.Model):    
    inclusion_date = models.DateTimeField()
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, null=True)
    expected_date = models.DateField(null=True)
    answered_date = models.DateField(null=True)
    rank = models.IntegerField()
    barthel = models.IntegerField()
    decision = models.CharField(max_length=255,null=True)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=255, null=True)
    notes = models.CharField(max_length=255, null=True)
    diagnostic = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    consent = models.CharField(max_length=255, null=True)
    telemonitoring = models.BooleanField(default=False)

class MedicalQuestions(models.Model):
    question = models.CharField(max_length=255)
    question_type = models.CharField(max_length=2, choices=QUESTION_TYPES, default='PO')
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE, null=False)

class MedicalQuestionChoices(models.Model):
    choice = models.CharField(max_length=255)
    question = models.ForeignKey(MedicalQuestions, on_delete=models.CASCADE, null=False)

class PatientAnswers(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=False)
    question = models.ForeignKey(MedicalQuestions, on_delete=models.CASCADE, null=False)
    answer = models.CharField(max_length=255)
