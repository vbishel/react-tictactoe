from django.urls import path
from .views import CreateRoomView, GetRoomView, JoinRoomView

urlpatterns = [
  path('create-room', CreateRoomView.as_view()),
  path('get-room', GetRoomView.as_view()),
  path('join-room', JoinRoomView.as_view())
]