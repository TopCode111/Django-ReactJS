from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class SignupSerialzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password','first_name','last_name','phone','dob','address','city','state','postcode','country','speciality')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError('Incorrect Credentials')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('role', 'email', 'first_name', 'last_name')