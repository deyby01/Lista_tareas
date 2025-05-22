from django.contrib import admin
from .models import Task # Importamos el modelo Task

# Register your models here.
admin.site.register(Task) # Registramos el modelo Task en el sitio de administración