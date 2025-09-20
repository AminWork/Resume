from django.db import models
from django.utils import timezone

class ChatMessage(models.Model):
    session_id = models.CharField(max_length=255, default='default')
    message = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-timestamp']
        
    def __str__(self):
        return f"{self.session_id}: {self.message[:50]}..."
