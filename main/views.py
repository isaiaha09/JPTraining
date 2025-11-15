from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def contact_me(request):
    return render(request, 'main/contact_me.html')

def recovery_and_rehability(request):
    return render(request, 'main/recovery_and_rehability.html')

def about_me(request):
    return render(request, 'main/about_me.html')

def about_jpt(request):
    return render(request, 'main/about_jpt.html')

def gallery(request):
    return render(request, 'main/gallery.html')


# Helper for Django Distill: static pages with no URL parameters
def no_parameters():
    return None