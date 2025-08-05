from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Home page
    path('getResponse/', views.getResponse, name='getResponse'),  # Chatbot response endpoint
    path('train_individual/', views.train_individual, name='train_individual'),  # Individual training endpoint
    path('train_batch/', views.train_batch, name='train_batch'),  # Batch training endpoint
]