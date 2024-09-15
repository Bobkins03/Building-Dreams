from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class CPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPU
        fields = '__all__'

class GPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPU
        fields = '__all__'
class RAMSerializer(serializers.ModelSerializer):
    class Meta:
        model = RAM
        fields = '__all__'

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = '__all__'

class MotherBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotherBoard
        fields = '__all__'

class PSUSerializer(serializers.ModelSerializer):
    class Meta:
        model = PSU
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = '__all__'

class CoolingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooling
        fields = '__all__'

class PeripheralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peripheral
        fields = '__all__'

class BuildSerializer(serializers.ModelSerializer):
    cpu = CPUSerializer(required=False)
    gpu = GPUSerializer(required=False)
    ram = RAMSerializer(required=False)
    mb = MotherBoardSerializer(required=False)
    stor = StorageSerializer(required=False)
    case = CaseSerializer(required=False)
    cool = CoolingSerializer(required=False)
    psu = PSUSerializer(required=False)
    periph = PeripheralSerializer(required=False)
    user = User

    class Meta:
        model = Build
        fields = ['id', 'name', 'user', 'cpu', 'gpu', 'ram', 'mb', 'stor', 'case', 'cool', 'psu', 'periph']

class BuildUpdateSerializer(serializers.Serializer):
    type = serializers.CharField(required=True)
    id = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):
    chats = serializers.PrimaryKeyRelatedField(many=True, queryset=Chat.objects.all())
    builds = serializers.PrimaryKeyRelatedField(many=True, queryset=Build.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'chats', 'builds']