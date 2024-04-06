from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import *
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
            data = super().validate(attrs)
            serializer=UserSerializerWithToken(self.user).data
            for k,v in serializer.items():
                 data[k]=v
            return data

class MyTokenObtainPairView(TokenObtainPairView):
     serializer_class=MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    serializer=UserSerializerWithToken(user,many=False)
    data=request.data
    if data['first_name']!='':
        user.first_name=data['first_name']
    if data['last_name']!='':
        user.last_name=data['last_name']
    if data['password']!='':
        user.password=make_password(data['password'])
   
    user.save()
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:    
        user=User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
         message={'detail':"User with this email already exists, try with a new email"}
         return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)