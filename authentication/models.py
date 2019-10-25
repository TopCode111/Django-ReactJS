from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from .managers import UserManager
# Create your models here.

ROLE_CHOICES = (
    ('DR', 'Doctor'),
    ('PT', 'Patient'),
    ('AD', 'Admin'),
)

class User(AbstractBaseUser, PermissionsMixin):

    objects = UserManager()

    email = models.EmailField(blank=False, unique=True)
    password = models.CharField(blank=False,max_length=255)
    
    first_name = models.CharField(blank=False,max_length=255)
    last_name = models.CharField(blank=False,max_length=255)

    phone = models.CharField(max_length=255)
    dob = models.DateField()

    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postcode = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    speciality = models.CharField(max_length=255)
    other = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)

    role = models.CharField(max_length=2, choices=ROLE_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', '']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.first_name
