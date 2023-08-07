from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import BookSerializer
from .models import Book,Category,Tag
# Create your views here.
class BookView(mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = BookSerializer
    permission_classes = []
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'page_numbers': ['exact', 'in','lte','gte'],
        'created_at': ['date__lte', 'date__gte'],
    }
    search_fields = ['name']
    # sort
    ordering_fields = ['authors', 'tag', 'name', 'created_at','updated_at','page_numbers','categories']
    # pagination
    pagination_class = LimitOffsetPagination
    
    queryset = Book.objects.all()

