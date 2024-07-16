from django.urls import path
from .views import CreateRoomView, GetRoomView, JoinRoomView, DeleteRoomView

urlpatterns = [
  path('create-room', CreateRoomView.as_view()),
  path('get-room', GetRoomView.as_view()),
  path('join-room', JoinRoomView.as_view()),
  path('delete-room/<str:roomCode>', DeleteRoomView.as_view(), name = "delete-room"),
]