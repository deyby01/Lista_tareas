from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True) # blank=True permite que el campo sea vacío en formularios, null=True permite que la BD guarde NULL
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True) # Se establece automáticamente al crear el objeto

    def __str__(self):
        return self.title