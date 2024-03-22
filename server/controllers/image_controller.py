import openai
import sys
import json
import os

def analyze_image_with_openai(image_data):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": "What's in this image?",
                    "images": [image_data]  # This part may need adjustment based on exact API specs
                }
            ]
        )
        return response.choices[0].text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    image_data = sys.argv[1]  # Assuming base64 image data is passed as an argument
    result = analyze_image_with_openai(image_data)
    print(json.dumps(result))
