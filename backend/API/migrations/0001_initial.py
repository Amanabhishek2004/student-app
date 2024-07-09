# Generated by Django 4.2.7 on 2024-07-09 05:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='assignements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.FileField(blank=True, null=True, upload_to='./assignemnets')),
                ('is_draft', models.CharField(max_length=24, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(blank=True, null=True)),
                ('no_of_classes_attended', models.IntegerField(default=0)),
                ('updated_attendance', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('no_of_classes_occured', models.IntegerField(blank=True, default=0, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance_status', models.CharField(max_length=7)),
                ('attendance', models.ManyToManyField(related_name='attandance_data', to='API.attendance')),
                ('name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('subjects', models.ManyToManyField(to='API.subject')),
            ],
        ),
        migrations.CreateModel(
            name='staff_data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(blank=True, max_length=20, null=True)),
                ('name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=25, null=True)),
                ('assignement', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.assignements')),
                ('student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.student')),
            ],
        ),
        migrations.AddField(
            model_name='attendance',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='student_data', to='API.student'),
        ),
        migrations.AddField(
            model_name='attendance',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.subject'),
        ),
        migrations.CreateModel(
            name='Assignmnet_given_by_teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('data', models.ManyToManyField(blank=True, to='API.assignements')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.subject')),
                ('teacher_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.staff_data')),
            ],
        ),
        migrations.CreateModel(
            name='Assignment_uploaded',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('For_data', models.ManyToManyField(blank=True, to='API.assignmnet_given_by_teacher')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.staff_data')),
            ],
        ),
        migrations.AddField(
            model_name='assignements',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.student'),
        ),
        migrations.AddField(
            model_name='assignements',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='API.subject'),
        ),
        migrations.AddField(
            model_name='assignements',
            name='submitted_to',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='API.assignmnet_given_by_teacher'),
        ),
    ]
