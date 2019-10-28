from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator

def send_email(name, email, date, path):
    send_mail(
        'Telemonica 360',
        """
        Dear {0}, you agreed on {1} to have regular follow-up by your doctor. Please click on this link to
        start the questionnaire: {2}.If you encounter any technical problem please contact Telemonica
        Support Centre.""".format(name, date, path),
        settings.EMAIL_HOST_USER,
        [email]
    )