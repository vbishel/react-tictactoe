import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class GameConsumer(WebsocketConsumer):
  
  
  def connect(self):
    self.room_name = self.scope
    print(self.scope)
    self.accept()