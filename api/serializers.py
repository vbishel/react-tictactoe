from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('id', 'code', 'host', 'host_symbol', 'wins_to_end', 'created_at', 'player')


class CreateRoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('host_symbol', 'wins_to_end')


class UpdateRoomSerializer(serializers.ModelSerializer):
  code = serializers.CharField(validators=[])

  class Meta:
    model = Room
    fields = ('host_symbol', 'wins_to_end')
