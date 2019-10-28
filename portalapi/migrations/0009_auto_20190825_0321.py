# Generated by Django 2.2.3 on 2019-08-24 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portalapi', '0008_patientanswers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='answered_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='decision',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='expected_date',
            field=models.DateField(null=True),
        ),
    ]