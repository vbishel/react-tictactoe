from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path, path
from .consumers import GameConsumer


websocket_urlpatterns = [
    re_path(r'^room/(?P<room_name>[^/]+)/$', GameConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
  'websocket': URLRouter(websocket_urlpatterns),
})