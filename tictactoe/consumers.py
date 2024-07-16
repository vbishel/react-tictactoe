import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        sid = await extractSessionIdFromScope(self.scope)
        self.room_code = ''.join(c for c in self.scope['path'] if c.isupper() or c.isdigit())
        self.room_group_name = f"room_{self.room_code}"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'player_join',
                'session_id': sid,
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def player_join(self, event):
        await self.send(text_data=json.dumps({
            'type': 'player_join',
            'session_id': event['session_id']
        }))


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

async def extractSessionIdFromScope(scope):
    stri = str(scope['headers'][10][-1])
    idx = stri.index('sessionid=')
    stri = stri[idx:]
    idx = stri.index('=')
    return stri[idx + 1:len(stri) - 1]