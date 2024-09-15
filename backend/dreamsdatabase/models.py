
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats')
    # admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_chats', blank=False, null=True)
    
class Author(models.Model):
    name = models.CharField(max_length=500)

class Message(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class CPU(models.Model):
    name = models.CharField(max_length=100, unique=True)
    core_count = models.IntegerField()
    clock_speed = models.FloatField(max_length = 3)
    TDP = models.IntegerField()
    intergrated_graphics = models.CharField(max_length = 100)
    CPU_socket = models.CharField(max_length=100)
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class GPU(models.Model):
    name = models.CharField(max_length=100, unique=True)
    chipset = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    memory = models.IntegerField()
    clock_speed = models.FloatField(max_length = 4)
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class RAM(models.Model):
    name = models.CharField(max_length=100, unique=True)
    memory_standard = models.CharField(max_length=100)
    clock_speed = models.FloatField(max_length = 4)
    memory = models.IntegerField()
    modules = models.IntegerField()
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class Storage(models.Model):
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length = 3, choices={"SSD":"SSD","HDD":"HDD"})
    capacity = models.IntegerField()
    capacity_unit = models.CharField(max_length = 2, choices={"TB":"TB","GB":"GB"})
    cache = models.IntegerField(blank=True)
    interface = models.CharField(max_length = 100)
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class MotherBoard(models.Model):
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    CPU_socket = models.CharField(max_length=100)
    memory_slots = models.IntegerField()
    max_memory = models.IntegerField()
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class PSU(models.Model):
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    wattage = models.IntegerField()
    modular = models.CharField(max_length = 100)
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class Case(models.Model):
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    power_supply = models.CharField(max_length = 100)
    fan_count = models.IntegerField()
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class Cooling(models.Model):
    name = models.CharField(max_length=100, unique=True)
    fan_count = models.IntegerField()
    max_RPM = models.IntegerField()
    type = models.CharField(max_length = 6,choices={"AIR":"Air","LIQUID":"Liquid"})
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name

class Peripheral(models.Model):
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100)
    iconpath = models.CharField(max_length=100)
    price = models.FloatField(max_length = 10)
    def __str__(self):
        return self.name


class Build(models.Model):
    name = models.CharField(max_length=100) # , unique=True
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cpu = models.ForeignKey(CPU, on_delete=models.CASCADE, blank=True, null=True)
    gpu = models.ForeignKey(GPU, on_delete=models.CASCADE, blank=True, null=True)
    ram = models.ForeignKey(RAM, on_delete=models.CASCADE, blank=True, null=True)
    mb = models.ForeignKey(MotherBoard, on_delete=models.CASCADE, blank=True, null=True)
    stor = models.ForeignKey(Storage, on_delete=models.CASCADE, blank=True, null=True)
    case = models.ForeignKey(Case, on_delete=models.CASCADE, blank=True, null=True)
    cool = models.ForeignKey(Cooling, on_delete=models.CASCADE, blank=True, null=True)
    psu = models.ForeignKey(PSU, on_delete=models.CASCADE, blank=True, null=True)
    periph = models.ForeignKey(Peripheral, on_delete=models.CASCADE, blank=True, null=True)


    def __str__(self):
        return self.name
    
    def set_field(self, type, id):
        if type == 'name':
            self.name = id
        elif type == 'cpu':
            self.cpu = CPU.objects.get(pk=id)
        elif type == 'gpu':
            self.gpu = GPU.objects.get(pk=id)
        elif type == 'ram':
            self.ram = RAM.objects.get(pk=id)
        elif type == 'mb':
            self.mb = MotherBoard.objects.get(pk=id)
        elif type == 'stor':
            self.stor = Storage.objects.get(pk=id)
        elif type == 'case':
            self.case = Case.objects.get(pk=id)
        elif type == 'cool':
            self.cool = Cooling.objects.get(pk=id)
        elif type == 'psu':
            self.psu = PSU.objects.get(pk=id)
        elif type == 'periph':
            self.periph = Peripheral.objects.get(pk=id)