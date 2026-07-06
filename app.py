import os
import requests
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder='templates', static_folder='static')

GEMINI_API_KEY = "AIzaSyDuInl9syH3KK5rGyPGZVZlkdjIsMhK2EU"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_data = request.get_json() or {}
        user_message = user_data.get('message', '')
        history = user_data.get('history', [])
        
        if not user_message:
            return jsonify({'status': 'error', 'message': 'No message provided'}), 400
            
        # Build contents array with history and current message
        contents = []
        for turn in history:
            role = 'user' if turn.get('role') == 'user' else 'model'
            contents.append({
                'role': role,
                'parts': [{'text': turn.get('text', '')}]
            })
            
        # Add latest user message
        contents.append({
            'role': 'user',
            'parts': [{'text': user_message}]
        })
        
        # System instructions to guide the model as an MCAT Coach
        system_instruction = {
            'parts': [{
                'text': (
                    "You are a supportive, expert MCAT preparatory coach. "
                    "Your goal is to guide students to achieve a score of 515+. "
                    "Help them understand complex scientific and behavioral concepts "
                    "across physics, biochemistry, general chemistry, organic chemistry, "
                    "biology, and psychology/sociology. "
                    "When explaining: "
                    "1. Break down difficult concepts into simple terms. "
                    "2. If relevant, show step-by-step calculations using clear numbers or dimensional analysis. "
                    "3. Highlight active recall strategies or mnemonics to memorize the material. "
                    "4. Structure your response with clean Markdown (bold text, bullet points, numbered lists). "
                    "Be encouraging, concise, and focused on helping them succeed on the exam."
                )
            }]
        }
        
        payload = {
            'contents': contents,
            'systemInstruction': system_instruction,
            'generationConfig': {
                'temperature': 0.7,
                'maxOutputTokens': 2048
            }
        }
        
        response = requests.post(GEMINI_URL, json=payload, headers={'Content-Type': 'application/json'}, timeout=30)
        response.raise_for_status()
        
        res_json = response.json()
        candidates = res_json.get('candidates', [])
        if not candidates:
            return jsonify({'status': 'error', 'message': 'Empty response from model'}), 502
            
        model_text = candidates[0].get('content', {}).get('parts', [{}])[0].get('text', '')
        
        return jsonify({
            'status': 'success',
            'response': model_text
        })
        
    except requests.exceptions.RequestException as e:
        return jsonify({
            'status': 'error',
            'message': f"Gemini API request failed: {str(e)}"
        }), 502
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f"An unexpected error occurred: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Running locally on http://127.0.0.1:5050 to avoid port conflicts
    app.run(debug=True, host='127.0.0.1', port=5050)
