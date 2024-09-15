from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .serializer import *
from .models import *

from django.contrib.auth import authenticate, login, logout
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy

import asyncio
from typing import AsyncGenerator
from django.shortcuts import render, redirect
from django.http import HttpRequest, StreamingHttpResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from . import models
import json
# Create your views here.

@csrf_exempt
@api_view(['POST'])
def create_user(request: HttpRequest) -> HttpRequest:
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    if username and password:
        print("Attempting to create user " + username)
        u,created = User.objects.get_or_create(username=username)
        if created:
            u.set_password(password)
            u.save()
            print("Created user " + username)
            return HttpResponse(status=201)
        
    return HttpResponse(status=200)

@csrf_exempt
@api_view(['POST'])
def login_user(request) -> HttpRequest:
    user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
    if user:
        login(request, user)
        try:
            token = Token.objects.get(user_id=user.id)
        except Token.DoesNotExist:
            token = Token.objects.create(user=user)
        
        print("Logged in user " + user.get_username() + ", tok=" + token.key)
        
        return HttpResponse(token.key, status=200)   

    return HttpResponse(status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request) -> HttpRequest:
    if request.user:
        logout(request)
        print("Logged out user " + request.user.get_username())
        return HttpResponse(status=200)   

    return HttpResponse(status=400)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request) -> HttpRequest:
    if request.user and not request.user.is_anonymous:
        user_data = serializers.serialize('json', [request.user])
        print("USER DATA: " + user_data)
        return HttpResponse(user_data, status=200, content_type='application/json')   
    else:
        print("No logged in user!")
    
    return HttpResponse(status=400)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_builds(request) -> HttpRequest:
    if request.user and not request.user.is_anonymous:
        user_builds = Build.objects.filter(user=request.user)
        print(f"got {len(user_builds)} builds")
        result_data = serializers.serialize('json', user_builds)
        return HttpResponse(result_data, status=200, content_type='application/json')   
    else:
        print("No logged in user!")
    
    return HttpResponse(status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat(request: HttpRequest) -> HttpResponse:
    print("Received create chat")
    if request.user and not request.user.is_anonymous:
        print("Creating new chat")
        new_chat = Chat.objects.create(user=request.user)
        new_chat.save()
        return HttpResponse(new_chat.id, status=200)
    
    return HttpResponse(status=400)
        # request.session['username'] = request.user.get_username()

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chats(request) -> HttpRequest:
    if request.user and not request.user.is_anonymous:
        if request.user.is_superuser:
            user_chats = Chat.objects.all()
        else:
            user_chats = Chat.objects.filter(user=request.user)
        
        print(f"got {len(user_chats)} chats")
        result_data = serializers.serialize('json', user_chats)
        return HttpResponse(result_data, status=200, content_type='application/json')   
    else:
        print("No logged in user!")
    
    return HttpResponse(status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_build(request: HttpRequest) -> HttpResponse:
    print("Received create build")
    if request.user and not request.user.is_anonymous:
        print("Creating new build")
        new_build = Build.objects.create(user=request.user, name="My Cool Build")
        new_build.save()
        return HttpResponse(new_build.id, status=200)
    
    return HttpResponse(status=400)

def chat(request: HttpRequest) -> HttpResponse:
    if not request.session.get('username'):
        return redirect('lobby')
    return render(request, 'chat.html')


def create_message(request: HttpRequest) -> HttpResponse:
    content = request.POST.get("content")
    username = request.session.get("username")

    if not username:
        return HttpResponse(status=403)
    author, _ = models.Author.objects.get_or_create(name=username)

    if content:
        models.Message.objects.create(author=author, content=content)
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=200)


async def stream_chat_messages(request: HttpRequest) -> StreamingHttpResponse:
    """
    Streams chat messages to the client as we create messages.
    """
    async def event_stream():
        """
        We use this function to send a continuous stream of data 
        to the connected clients.
        """
        async for message in get_existing_messages():
            yield message

        last_id = await get_last_message_id()

        # Continuously check for new messages
        while True:
            new_messages = models.Message.objects.filter(id__gt=last_id).order_by('created_at').values(
                'id', 'author__name', 'content'
            )
            async for message in new_messages:
                yield f"data: {json.dumps(message)}\n\n"
                last_id = message['id']
            await asyncio.sleep(0.1)  # Adjust sleep time as needed to reduce db queries.

    async def get_existing_messages() -> AsyncGenerator:
        messages = models.Message.objects.all().order_by('created_at').values(
            'id', 'author__name', 'content'
        )
        async for message in messages:
            yield f"data: {json.dumps(message)}\n\n"

    async def get_last_message_id() -> int:
        last_message = await models.Message.objects.all().alast()
        return last_message.id if last_message else 0

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')



class BuildView(viewsets.ModelViewSet):
    queryset = Build.objects.all()
    serializer_class = BuildSerializer

    @csrf_exempt
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def set_field(self, request, pk=None):
        print("Setting build field")
        build = self.get_object()
        serializer = BuildUpdateSerializer(data=request.data)
        if serializer.is_valid():
            build.set_field(serializer.validated_data['type'], serializer.validated_data['id'])
            build.save()
            return Response({'STATUS': 'OK'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CPUView(viewsets.ModelViewSet):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer

class GPUView(viewsets.ModelViewSet):
    queryset = GPU.objects.all()
    serializer_class = GPUSerializer
    
class RAMView(viewsets.ModelViewSet):
    queryset = RAM.objects.all()
    serializer_class = RAMSerializer
    
class StorageView(viewsets.ModelViewSet):
    queryset = Storage.objects.all()
    serializer_class = StorageSerializer

class MotherBoardView(viewsets.ModelViewSet):
    queryset = MotherBoard.objects.all()
    serializer_class = MotherBoardSerializer

class PSUView(viewsets.ModelViewSet):
    queryset = PSU.objects.all()
    serializer_class = PSUSerializer

class CaseView(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class PeripheralView(viewsets.ModelViewSet):
    queryset = Peripheral.objects.all()
    serializer_class = PeripheralSerializer

class CoolingView(viewsets.ModelViewSet):
    queryset = Cooling.objects.all()
    serializer_class = CoolingSerializer

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = "signup.html"
