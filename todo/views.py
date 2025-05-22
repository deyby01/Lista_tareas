from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

# Create your views here.

class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all().order_by('-created_at') # Obtener todas las tareas, ordenadas por fecha de creación descendente
    serializer_class = TaskSerializer

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk' # 'pk' es la clave primaria (primary key), es decir, el 'id'