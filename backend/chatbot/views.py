from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import ChatMessage
from .serializers import ChatRequestSerializer, ChatResponseSerializer, ChatMessageSerializer
from .services import ChatbotService
import uuid

class ChatbotView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.chatbot_service = ChatbotService()
    
    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data['message']
            session_id = serializer.validated_data.get('session_id', str(uuid.uuid4()))
            
            # Process message with chatbot service
            response_text = self.chatbot_service.process_message(message)
            
            # Save to database
            chat_message = ChatMessage.objects.create(
                session_id=session_id,
                message=message,
                response=response_text
            )
            
            # Return response
            response_data = {
                'response': response_text,
                'timestamp': timezone.now(),
                'session_id': session_id
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatHistoryView(APIView):
    def get(self, request):
        session_id = request.query_params.get('session_id')
        if session_id:
            messages = ChatMessage.objects.filter(session_id=session_id)
        else:
            messages = ChatMessage.objects.all()[:20]  # Last 20 messages
        
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
