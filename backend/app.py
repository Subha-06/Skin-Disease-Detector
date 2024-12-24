from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image
import torch
import torchvision.transforms as transforms
from torch import nn, optim
from torchvision import datasets
from torchvision import models

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

class CustomModel(nn.Module):
    def __init__(self, num_classes=7):
        super(CustomModel, self).__init__()

        # Load the pre-trained Xception model
        self.base_model = models.convnext_small(weights='IMAGENET1K_V1', pretrained=True)  # PyTorch does not have Xception; EfficientNetB7 is a close alternative

        # Freeze the base model layers
        for param in self.base_model.parameters():
            param.requires_grad = False

        # Replace the classifier with a custom head
        self.base_model.classifier = nn.Identity()  # Remove the default classifier

        self.global_pooling = nn.AdaptiveAvgPool2d(1)  # Global Average Pooling
        self.fc1 = nn.Linear(768, 256)  # EfficientNetB7 has 2560 output features
        self.bn1 = nn.BatchNorm1d(256)
        self.dropout1 = nn.Dropout(0.3)

        self.fc2 = nn.Linear(256, 128)
        self.bn2 = nn.BatchNorm1d(128)
        self.dropout2 = nn.Dropout(0.3)

        self.fc3 = nn.Linear(128, num_classes)
        self.softmax = nn.Softmax(dim=1)

    def forward(self, x):
        x = self.base_model.features(x)  # Extract features from the base model
        x = self.global_pooling(x)
        x = torch.flatten(x, 1)  # Flatten for the fully connected layers

        x = self.fc1(x)
        x = self.bn1(x)
        x = nn.ReLU()(x)
        x = self.dropout1(x)

        x = self.fc2(x)
        x = self.bn2(x)
        x = nn.ReLU()(x)
        x = self.dropout2(x)

        x = self.fc3(x)
        x = self.softmax(x)

        return x
    
# model = CustomModel()

model = torch.load('mekha_7.0.pt', map_location=torch.device('cpu'))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Adjust size as per your model
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


class_mapping = {
    0: "Acne",
    1: "Carcinoma",
    2: "Eczema",
    3: "Keratosis",
    4: "Milia",
    5: "None",
    6: "Rosacea"
}

@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file is in the request
    if 'image' not in request.files:
        
        return jsonify({'error': 'No file uploaded'}), 400

    image_file = request.files['image']

    try:
        # Open the image file
        image = Image.open(image_file.stream).convert('RGB')
        
        # Preprocess the image
        input_tensor = transform(image).unsqueeze(0)  # Add batch dimension
        # Perform inference
        with torch.no_grad():
            output = model(input_tensor)
            _, predicted = torch.max(output, 1)  # Get the class index
        # Map the predicted index to the class name
        predicted_class_name = class_mapping.get(int(predicted), "Unknown class")
        # print(predicted_class_name)
        return jsonify({'predicted_class': predicted_class_name})
    except Exception as e:
        # print(e)
        return jsonify({'error': str(e)}), 500


# @app.route('/upload', methods=['POST'])
# def upload_image():
#     try:
#         if 'image' not in request.files:
#             return jsonify({'error': 'No image file uploaded'}), 400

#         # Load the image
#         image_file = request.files['image']
#         img = Image.open(image_file.stream).convert('RGB')
        
#         # Preprocess the image
#         processed_image = preprocess_image(img)

#         # Perform inference
#         predictions = model(processed_image)
#         predicted_label_idx = np.argmax(predictions.numpy())
#         predicted_label = labels[predicted_label_idx]

#         return jsonify({'label': predicted_label})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
