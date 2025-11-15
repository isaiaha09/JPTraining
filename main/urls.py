from django.urls import path
from django_distill import distill_path
from . import views

# For Django Distill, you need a function returning URL parameters
def get_index():
    return None

urlpatterns = [
    distill_path('', views.index, name='home', distill_func=get_index, distill_file='index.html'),
    distill_path('contact_me/', views.contact_me, name='contact_me', distill_func=get_index, distill_file='contact_me.html'),
    distill_path('recovery_and_rehability/', views.recovery_and_rehability, name='recovery_and_rehability', distill_func=get_index, distill_file='recovery_and_rehability.html'),
    distill_path('about_me/', views.about_me, name='about_me', distill_func=get_index, distill_file='about_me.html'),
    distill_path('about_jpt/', views.about_jpt, name='about_jpt', distill_func=get_index, distill_file='about_jpt.html'),
    distill_path('gallery/', views.gallery, name='gallery', distill_func=get_index, distill_file='gallery.html'),
]