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
    
    response = model.generate_content(f'Create a unique and engaging dating bio along with a 2-3 word title based on the following characteristics. Keep it short maximum upto 4-5 sentences. The bio should sound natural and creative, combining personality traits, hobbies, personality traits, relationship goals and professional details into a fun, relatable narrative. Add a few lines to make the bio stand out with a hint of personality and relationship goals. Here are the details: Hobbies:{hobbies}, Interests:{interests}, Profession:{professions}, Personality:{personalities}, Relationship:{relationships}')

    # Create a simple bio message
    bio_message = response.text.split('\n\n')

    # Return the bio as a JSON response
    return jsonify({"bio": bio_message[1],"title":bio_message[0].strip('**')})

