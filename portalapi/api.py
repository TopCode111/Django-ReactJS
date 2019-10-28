import datetime
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializer import PatientSerializer, ProtocolSerializer, MedicalQuestionsSerializer
from .models import Patient, Protocol, PatientAnswers
from authentication.models import User
from . import handler
from .token_generator import account_activation_token
from rest_framework.decorators import api_view
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text

class PatientAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PatientSerializer

    def get(self, request, *args, **kwargs):
        return Response(PatientSerializer(Patient.objects.all(), many=True).data)
        # return Patient.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patient = serializer.create(request.data)
        token = account_activation_token.make_token(patient.user)
        uid = urlsafe_base64_encode(force_bytes(patient.user.pk))
        
        today = datetime.date.today()
        date = today + datetime.timedelta( (4-today.weekday()) % 7 ) # TODO: Fix this according to settings
        
        handler.send_email(patient.user.first_name + " " + patient.user.last_name, patient.user.email, date.strftime('%Y %B %d'), request.build_absolute_uri('/') + '#/survey/' + uid + '/' + account_activation_token.make_token(patient.user))
        return Response({
            "patient": PatientSerializer(patient, context=self.get_serializer_context()).data
        })
    
    def delete(self, request, *args, **kwargs):
        patient = get_object_or_404(Patient, pk=kwargs['id'])
        patient.delete()
        user = get_object_or_404(User, pk=patient.user_id)
        user.delete()
        return Response("Patient with id {kwargs['id']} deleted", status=status.HTTP_204_NO_CONTENT)

class ProtocolViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer

class MedicalQuestionsAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MedicalQuestionsSerializer

    def get(self, request, *args, **kwargs):
        return Response(MedicalQuestionsSerializer(Protocol.objects.get(id=kwargs['protocol_id']).medicalquestions_set.all(), many=True).data)

@api_view()
def activate(request, uidb64, token):
    uid = force_bytes(urlsafe_base64_decode(uidb64))
    user = User.objects.get(pk=uid)
    if(account_activation_token.check_token(user, token)):
        return Response({"message": 'Account activated.'})
    
    return Response({"message": 'Activation link invalid.'}, status=status.HTTP_400_BAD_REQUEST)


class MedicalSurveyAPI(generics.GenericAPIView):
    serializer_class = MedicalQuestionsSerializer
    queryset = ''

    def get(self, request, *args, **kwargs):
        
        uid = force_bytes(urlsafe_base64_decode(kwargs['uidb64']))
        token = kwargs['token']
        user = User.objects.get(pk=uid)
        if(account_activation_token.check_token(user, token)):
            patient = Patient.objects.get(user_id=uid)

            serialized = MedicalQuestionsSerializer(patient.protocol.medicalquestions_set.all(), many=True)
            return Response({'questions': serialized.data, 'patient': '{} {}'.format(patient.user.first_name, patient.user.last_name)})
        return Response([])
    
    def post(self, request, *args, **kwargs):        
        uid = force_bytes(urlsafe_base64_decode(kwargs['uidb64']))
        token = kwargs['token']
        user = User.objects.get(pk=uid)
        if(account_activation_token.check_token(user, token)):
            patient = Patient.objects.get(user_id=uid)
            serializer = MedicalQuestionsSerializer(data=request.data, many=True)
            if(serializer.is_valid()):
                for data in request.data:
                    PatientAnswers.objects.update_or_create(patient=patient, question_id=data['id'], defaults= {'answer': data['answer']} )

            return Response(MedicalQuestionsSerializer(patient.protocol.medicalquestions_set.all(), many=True).data)
        return Response([])