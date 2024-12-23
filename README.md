# Skin Disease Detection Web Application

This project is a web-based application for detecting skin diseases using a machine learning model hosted on a Flask backend. The frontend is built with React and communicates with the backend to classify uploaded images.

## Project Structure

- Backend: Contains the Flask server and machine learning model logic.
- Frontend: Contains the React-based user interface for uploading images and displaying results.

## Setup Instructions
### Prerequisites

1. Backend:
    - Python 3.8+ installed on your system.
    - pip (Python package manager).
    - Pytorch and related libraries.
2. Frontend:
    - Node.js and npm (Node Package Manager).

## How to Run

- Backend Setup
    - cd backend
    - pip install flask flask-cors torch torchvision
    - Run the Flask server:
        - python app.py
        - The backend will start on http://127.0.0.1:5000.
- Fronted Setup
    - cd frontend
    - npm install
    - npm run dev
        - The frontend will start on http://localhost:5173.

## Model
- `models\Generate_SCIN.ipynb` - Pipeline for training and generating synthetic skin lesion images with SCIN dataset included
- `models\skin_disease_classification_no_SCIN.ipynb` - Pipeline for training and generating synthetic skin lesion images without SCIN dataset included
- `models\skin_disease_classification_model.ipynb`- Classification model for detecting skin disease. Includes, data preprocessing, model training and testing pipelines.

### How to Run Model
- Ensure paths to data folders are in the indicated locations
- Upload files unto google colab and run cells or run on local Juputer notebook kernel after istalling the requirement.txt `pip install -r requirements.txt`

## Datasets
- Classification Model Dataset with SCIN: https://drive.google.com/drive/folders/1Mewh-SD5Ty7m9Uc4zWd5StZUotM6_7WH?usp=sharing
- Classification Model Dataset without SCIN: https://drive.google.com/drive/folders/1HBCDNmdxbWfyo6LgkuR3J7L0fAcMmnpx?usp=drive_link
- Generative Model Training Dataset: https://drive.google.com/drive/folders/1RSJalSwP9RnZ52TT2aBgveA8Qj4gn7vM?usp=sharing
- Manual Curated Dataset for Testing:
    - Eczema: https://drive.google.com/drive/folders/17vRenYSLSo_LMTvA2xLP_xnB8TaFX1xp?usp=sharing
    - Acne: https://drive.google.com/drive/folders/1CL73ug4NW_QmRuR_F-Dvp65f3kWlX5Me?usp=sharing