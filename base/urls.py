from django.urls import path
from . import views

urlpatterns = [
    path('',views.login,name='login'),
    path('home/', views.home, name='home'),
    path('map/', views.map, name='map'),
    path('algorithum/', views.algorithum, name='algorithum'),
    path('project_summary/', views.project_summary, name='project_summary'),
path('graph/', views.visualize_data, name='visualize_data'),
]
