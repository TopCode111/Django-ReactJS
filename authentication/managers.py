from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **kwargs):
        """
        Create new user
        """
        if not email:
            return False
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.role = 'DR'
        user.set_password(password)
        user.save(using=self._db)
        from portalapi.models import Doctor
        doctor = Doctor(speciality=kwargs['speciality'], user=user)
        doctor.save()
        return user
    
    def create_user(self, email, password, **kwargs):
        """
            Function to add additional fields value        
        """
        # **kwargs.set_default()
        return self._create_user(email, password, **kwargs)

    def create_patient(self, email, password, **kwargs):
        """
            Function to add additional fields value        
        """
        # **kwargs.set_default()
        if not email:
            return False
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.role = 'PT'
        user.set_password(password)
        user.save(using=self._db)
        return user