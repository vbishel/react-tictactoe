from django.urls import path
from .views import index

app_name = "frontend"

urlpatterns = [
    path("", index),
    path("singleplayer", index),
    path("create-room", index),
    path("room/<str:roomCode>", index),
    path("join-room", index)
]