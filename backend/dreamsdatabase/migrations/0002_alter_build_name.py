# Generated by Django 5.0.4 on 2024-04-23 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dreamsdatabase', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='build',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
