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

class ExperienceAnalysisRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    company = serializers.CharField(max_length=200)
    location = serializers.CharField(max_length=200)
    period = serializers.CharField(max_length=100)
    description = serializers.CharField()

class ExperienceAnalysisResponseSerializer(serializers.Serializer):
    overview = serializers.CharField()
    key_skills = serializers.ListField(child=serializers.CharField())
    achievements = serializers.ListField(child=serializers.CharField())
    growth_areas = serializers.ListField(child=serializers.CharField())
    industry_impact = serializers.CharField()
    leadership_qualities = serializers.CharField()
    unique_aspects = serializers.CharField()
