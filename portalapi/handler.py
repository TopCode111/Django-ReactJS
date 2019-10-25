from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.conf import settings

def send_email(email, path):
    send_mail(
        'Test',
        """
        You have been registerd to TeleMonica.
        Email: {0}
        Please log in to {1} and use the application.
        """.format(email, path),
        settings.EMAIL_HOST_USER,
        [email]
    )

