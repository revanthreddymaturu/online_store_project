from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('',views.getRoutes, name='routes'),
    path('api/users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/products/',views.getProducts, name='products'),
    path('api/users/profile',views.getUserProfile, name='user-profile'),
    path('api/users/profile/update',views.updateUserProfile, name='user-profile-update'),
    path('api/users/register/',views.registerUser, name='register-users'),
    path('api/users/',views.getUsers, name='users'),
    path('api/product/<str:pk>/',views.getProduct, name='product'),
]
