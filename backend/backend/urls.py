"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from dreamsdatabase import views

router = routers.DefaultRouter()
router.register(r'builds', views.BuildView)
router.register(r'cpus', views.CPUView)
router.register(r'gpus', views.GPUView)
router.register(r'rams', views.RAMView)
router.register(r'motherboards', views.MotherBoardView)
router.register(r'storages', views.StorageView)
router.register(r'cases', views.CaseView)
router.register(r'coolings', views.CoolingView)
router.register(r'psus', views.PSUView)
router.register(r'peripherals', views.PeripheralView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('chat/',include('dreamsdatabase.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.SignUpView.as_view(), name="signup"),
    path('create-user/', views.create_user, name='create-user'),
    path('login-user/', views.login_user, name='login-user'),
    path('logout-user/', views.logout_user, name='logout-user'),
    path('get-user/', views.get_user, name='get-user'),
    path('create-chat/', views.create_chat, name='create-chat'),
    path('create-build/', views.create_build, name='create-build'),
    path('get-builds/', views.get_builds, name='get-builds'),
    path('get-chats/', views.get_chats, name='get-chats')
]
