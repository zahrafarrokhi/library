# Generated by Django 4.2.4 on 2023-08-04 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='address',
        ),
        migrations.AlterField(
            model_name='author',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
