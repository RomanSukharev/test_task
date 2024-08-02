from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, viewsets, pagination
from .serializers import LoginSerializer, LoginResponseSuccessSerializer, LoginResponseBadRequestSerializer, \
    TokenCheckSuccessSerializer, NoteSerializer
from .models import Note

unauthorized_response = openapi.Response('Пользователь неавторизован.', LoginResponseBadRequestSerializer)
bad_request_response = openapi.Response('Данные переданы неверно.', LoginResponseBadRequestSerializer)


class TokenView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer, responses={
        200: LoginResponseSuccessSerializer,
        400: unauthorized_response,
        401: bad_request_response,
    })
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    "token": token.key,
                    "user_id": user.pk,
                    "email": user.email,
                    "username": user.username
                })
            return Response({"error": "Неверный логин или пароль"}, status=401)
        return Response({"error": "Введите логин и пароль"}, status=400)


class TokenCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={
        200: TokenCheckSuccessSerializer,
        401: unauthorized_response,
    })
    def get(self, request):
        return Response({'status': 'OK'}, status=200)


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
