from rest_framework import serializers

from .models import Note


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class LoginResponseSuccessSerializer(serializers.Serializer):
    token = serializers.CharField()
    user_id = serializers.IntegerField()
    email = serializers.EmailField()
    username = serializers.CharField()


class LoginResponseBadRequestSerializer(serializers.Serializer):
    error = serializers.CharField()


class TokenCheckSuccessSerializer(serializers.Serializer):
    status = serializers.CharField()


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Note
