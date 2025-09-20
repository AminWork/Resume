from django.urls import path
from .views import ChatbotView, ChatHistoryView, ExperienceAnalysisView

urlpatterns = [
    path('chat/', ChatbotView.as_view(), name='chatbot'),
    path('history/', ChatHistoryView.as_view(), name='chat_history'),
    path('analyze-experience/', ExperienceAnalysisView.as_view(), name='experience_analysis'),
]
