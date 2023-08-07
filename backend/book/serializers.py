
from rest_framework import serializers
from .models import Book,Category,Tag
from author.serializers import AuthorSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    tag = TagSerializer(many=True)
    class Meta:
        model = Book
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


