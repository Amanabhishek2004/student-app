# Generated by Django 5.0.7 on 2024-08-31 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_assignements_submission_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignmnet_given_by_teacher',
            name='Deadline',
            field=models.DateField(blank=True, null=True),
        ),
    ]
