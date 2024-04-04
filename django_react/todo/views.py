from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import todo
from .serializers import TodoSerializer

class ListTodoView(ListAPIView):
    queryset = todo.objects.all()
    serializer_class = TodoSerializer

class CreateTodoView(CreateAPIView):
    queryset = todo.objects.all()
    serializer_class = TodoSerializer

class UpdateTodoView(UpdateAPIView):
    queryset = todo.objects.all()
    serializer_class = TodoSerializer

class DeleteTodoView(DestroyAPIView):
    queryset = todo.objects.all()
    serializer_class = TodoSerializer