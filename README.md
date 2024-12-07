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
    - TensorFlow and related libraries.
2. Frontend:
    - Node.js and npm (Node Package Manager).

## How to Run

- Backend Setup
    - cd backend
    - pip install flask flask-cors tensorflow tensorflow-hub pillow
    - Run the Flask server:
        - python app.py
        - The backend will start on http://127.0.0.1:5000.
- Fronted Setup
    - cd frontend
    - npm install
    - npm run dev
        - The frontend will start on http://localhost:5173.



