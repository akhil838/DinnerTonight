from flask import Flask, jsonify, request,render_template
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key = GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

app = Flask(__name__)
CORS(app)
app.static_folder = 'static'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_bio', methods=['POST'])
def generate_bio():
    # Extract data from the request
    data = request.json
 
    hobbies = data.get('hobbies', [])
    interests = data.get('interests', [])
    professions = data.get('professions', [])
    personalities = data.get('personalities', [])
    relationships = data.get('relationships', [])
    
    response = model.generate_content(f'Generate short Bio, my hobbies are {hobbies}, im intrested in {interests}, and my professions are {professions}, my personalities are {personalities}, and my relationships goals are {relationships}')

    # Create a simple bio message
    bio_message = response.text    
    
    # Return the bio as a JSON response
    return jsonify({"bio": bio_message})
