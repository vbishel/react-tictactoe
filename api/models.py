import string
import random
from django.db import models


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Room(models.Model):
  code = models.CharField(
    max_length=8, default=generate_unique_code, unique=True
  )
  host = models.CharField(max_length = 50, unique = True)
  host_symbol = models.CharField(max_length = 1, default = "X")
  wins_to_end = models.IntegerField(null = False, default = 1)
  created_at = models.DateTimeField(auto_now_add = True)
  player = models.CharField(max_length = 50, unique = True, default = None, null = True)
