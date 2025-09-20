from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'session_id', 'message', 'response', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)
    session_id = serializers.CharField(max_length=255, required=False)

class ChatResponseSerializer(serializers.Serializer):
    response = serializers.CharField()
    timestamp = serializers.DateTimeField()
