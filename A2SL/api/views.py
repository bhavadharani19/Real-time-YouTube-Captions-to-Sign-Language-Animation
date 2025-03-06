from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from nltk.tokenize import word_tokenize
from django.contrib.staticfiles import finders

@csrf_exempt
def animation_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text', '')
        words = word_tokenize(text.lower())
        animations = [f'{word}.mp4' if finders.find(f'animations/{word}.mp4') else list(word) for word in words]
        return JsonResponse({'animations': animations})
    return JsonResponse({'error': 'Invalid request'}, status=400)