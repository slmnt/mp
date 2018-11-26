# Generated by Django 2.0.7 on 2018-11-26 01:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_code_auth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coments', models.CharField(max_length=1000)),
                ('createat', models.DateTimeField(default=django.utils.timezone.now)),
                ('auth', models.ForeignKey(default=False, on_delete=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='code',
            name='title',
            field=models.CharField(default='null', max_length=15),
        ),
        migrations.AddField(
            model_name='code',
            name='updateat',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='comment',
            name='root',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Code'),
        ),
    ]
