from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room, generate_unique_code
from .serializers import CreateRoomSerializer, RoomSerializer

# Create your views here.
class CreateRoomView(APIView):
  serializer_class = CreateRoomSerializer

  def post(self, request):
    if not self.request.session.exists(self.request.session.session_key):
      self.request.session.create()

    serializer = self.serializer_class(data = request.data)
    if serializer.is_valid():
      host_symbol = serializer.data.get('host_symbol')
      wins_to_end = serializer.data.get('wins_to_end')
      host = self.request.session.session_key
      queryset = Room.objects.filter(host=host)
      if queryset.exists():
        room = queryset[0]
        room.delete()
      room = Room(
        host = host, 
        host_symbol = host_symbol, 
        wins_to_end = wins_to_end
      )
      room.save()
      self.request.session['room_code'] = room.code
      return Response(RoomSerializer(room).data, status = status.HTTP_201_CREATED)
    
    return Response({'Bad Request': 'Invalid data'}, status = status.HTTP_400_BAD_REQUEST)


class GetRoomView(APIView):
  serializer_class = RoomSerializer
  lookup_url_kwarg = 'code'

  def get(self, request):
    code = request.GET.get(self.lookup_url_kwarg)
    if code != None:
      data = Room.objects.filter(code = code)
      if len(data) > 0:
        room = RoomSerializer(data[0]).data
        room['is_host'] = self.request.session.session_key == data[0].host
        return Response(room, status = status.HTTP_200_OK)
      
      return Response({'Not Found': 'Invalid Room Code'}, status = status.HTTP_404_NOT_FOUND)

    return Response({'Bad Request': 'Code Parameter Not Found'}, status = status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):
  lookup_url_kwarg = 'code'

  def post(self, request):
    if not self.request.session.exists(self.request.session.session_key):
      self.request.session.create()
    
    code = request.GET.get(self.lookup_url_kwarg)
    if code != None:
      data = Room.objects.filter(code = code)
      if len(data) > 0:
        room = data[0]
        room.player = self.request.session.session_key
        room.save()
        return Response({ 'message': 'Room Joined' }, status = status.HTTP_200_OK)
    
    return Response({ 'Bad Request': 'Room Not Found' }, status = status.HTTP_400_BAD_REQUEST)
