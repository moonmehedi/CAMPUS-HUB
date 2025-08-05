from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import csv
import io
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer, ChatterBotCorpusTrainer



def index(req):
    return render(req,'index.html')




# Initialize the chatbot
bot = ChatBot('chatbot', read_only=False, logic_adapters=[
    {
        'import_path': 'chatterbot.logic.BestMatch',
        'default_response': 'I am sorry, but I do not understand.',
    }
])

# Pre-train the chatbot with some initial data
list_to_train = [
    "hi",
    "hi, there",
    "what's your name?",
    "I'm a chatbot",
    "what is your fav food?",
    "i like cheese",
    'Hi how are you?',
    'I am doing well.',
    'How can I retake a course?',
    'You can retake a course by re-registering during the next semester. Please contact the administration for approval.',
]

# Train the chatbot with the initial data
list_trainer = ListTrainer(bot)
list_trainer.train(list_to_train)

# Train the chatbot with the English corpus
ChatterBotCorpusTrainer(bot).train('chatterbot.corpus.english')


#previous code here

@csrf_exempt  # Temporarily exempt from CSRF for testing purposes (not recommended for production)
def getResponse(request):
    print('Received request')
    if request.method == 'POST':
        try:
            data=json.loads(request.body)
            message=data.get('message','')
            print('Received message:',message)
            
            botres=str(bot.get_response(message))
            return JsonResponse({'message':botres})
        except json.JSONDecodeError:
            return JsonResponse({'error':'Invalid JSON'},status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)














# Individual training endpoint
@csrf_exempt
def train_individual(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            question = data.get('question', '')
            answer = data.get('answer', '')
            print('Received question:', question)
            print('Received answer:', answer)

            if not question or not answer:
                return JsonResponse({'error': 'Question and answer are required'}, status=400)

            # Train the chatbot with the new question-answer pair
            list_trainer.train([question, answer])

            return JsonResponse({'message': 'Training successful'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def train_batch(request):
    if request.method == 'POST':
        try:
            # Check if a file was uploaded
            if 'file' not in request.FILES:
                print('No file uploaded')
                return JsonResponse({'error': 'No file uploaded'}, status=400)

            file = request.FILES['file']
            print('Received file:', file.name)
            if not file.name.endswith('.csv'):
                print('File must be a CSV')
                return JsonResponse({'error': 'File must be a CSV'}, status=400)

            # Read the CSV file
            file_data = file.read().decode('utf-8')
            csv_data = csv.reader(io.StringIO(file_data))

            # Extract question-answer pairs from the CSV
            training_data = []
            for row in csv_data:
                if len(row) >= 2:  # Ensure there are at least two columns (question and answer)
                    training_data.append(row[0])  # Question
                    training_data.append(row[1])  # Answer

            # Train the chatbot with the batch data
            print('Received training data:', training_data)
            list_trainer.train(training_data)

            return JsonResponse({'message': 'Batch training successful'})
        except Exception as e:
            print('Error:', str(e))
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)