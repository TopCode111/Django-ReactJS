# Generated by Django 2.2.3 on 2019-09-20 06:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portalapi', '0012_auto_20190920_1215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalquestionchoices',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portalapi.MedicalQuestions'),
        ),
    ]