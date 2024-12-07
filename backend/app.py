from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Load the MobileNet V2 model from TensorFlow Hub
MODEL_URL = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4"
model = hub.load(MODEL_URL)

# Load ImageNet labels
with open("imagenet_classes.txt", "r") as f:
    labels = [line.strip() for line in f.readlines()]

def preprocess_image(image):
    """Resize and normalize the image for MobileNet."""
    image = image.resize((224, 224))  # Resize to 224x224
    image = np.array(image) / 255.0  # Normalize to [0, 1]
    image = tf.convert_to_tensor(image, dtype=tf.float32)  # Ensure dtype is tf.float32
    image = tf.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file uploaded'}), 400

        # Load the image
        image_file = request.files['image']
        img = Image.open(image_file.stream).convert('RGB')
        
        # Preprocess the image
        processed_image = preprocess_image(img)

        # Perform inference
        predictions = model(processed_image)
        predicted_label_idx = np.argmax(predictions.numpy())
        predicted_label = labels[predicted_label_idx]

        return jsonify({'label': predicted_label})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
