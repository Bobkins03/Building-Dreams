from django.contrib import admin

# Register your models here.
from .models import Build, CPU, GPU, RAM, Storage, MotherBoard, PSU, Case, Cooling, Peripheral

admin.site.register(Build)
admin.site.register(CPU)
admin.site.register(GPU)
admin.site.register(RAM)
admin.site.register(Storage)
admin.site.register(MotherBoard)
admin.site.register(PSU)
admin.site.register(Case)
admin.site.register(Cooling)
admin.site.register(Peripheral)


