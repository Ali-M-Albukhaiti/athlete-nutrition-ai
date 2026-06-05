## MY AI NutritionSystem

1- Project Overview

This project is an AI-powered system that predicts an athlete’s daily calorie needs.

The model uses personal data and training information such as:

Age
Weight
Height
Sport type
Training intensity
Training duration
Fitness goal

The system helps athletes understand how many calories they need per day based on their activity level and goals.

2- Tech Stack
Frontend: React (TypeScript)
Backend: FastAPI (Python)
Machine Learning: PyTorch Lightning (Neural Network Regressor)
Data Processing: Pandas, NumPy, Scikit-learn
Visualization (EDA): Matplotlib, Seaborn
Model Storage: Joblib + PyTorch state_dict


3- Machine Learning Model

The model is a Neural Network Regressor built using PyTorch Lightning.

3.1 Features used:
Sport
Weight
Height
Age
Goal (fat_loss, maintenance, muscle_gain, endurance_performance)
Previous Day 2 (intensity + duration)
Previous Day 1 (intensity + duration)
Current Day (intensity + duration)
-->Target:
Daily calorie needs

3.2 ML Pipeline
Load dataset (1500 samples)
Data cleaning (no missing values or duplicates)
Exploratory Data Analysis (EDA)
One-hot encoding for categorical features
Train/validation/test split
Feature scaling (StandardScaler)
Train Neural Network using PyTorch Lightning
Early stopping to prevent overfitting
Model evaluation (MAE, RMSE, R²)

3.3 Model Performance
MAE: ~43.9
RMSE: ~60.6
R² Score: ~0.988
Accuracy: ~98.8%

The model shows strong performance in predicting calorie needs.

4- Backend (FastAPI)

The backend provides a prediction API.

Endpoint:
POST /predict
Input:

Athlete profile including:

Sport
Weight
Height
Age
Goal
Intensity & duration values
Output:
{
  "predicted_calories": 3200.45
}

The model loads:

trained PyTorch model (nutrition_model.pth)
scaler (y_scaler.pkl)


5- Frontend (React)

The frontend is a form-based UI where users can:

Enter personal profile (age, height, weight)
Select sport and goal
Choose training intensity
Add training duration
Submit data to backend
Receive predicted calories
Features:
Saved user profile (local storage)
Interactive explanations for intensity and goals
Clean modern UI
Real-time prediction request




📁 Project Structure
athlete-nutrition-ai/
│
├── backend/        # FastAPI backend (API + model inference)
├── frontend/       # React frontend (UI)
├── ml/             # Training notebook + neural network model
├── dataset/        # Excel dataset (1500 samples)
├── README.md       # Project documentation
└── .gitignore




6- Project Goal

To build an intelligent system that helps athletes estimate their daily calorie needs using a neural network trained on real training and body data.

 Future Improvements
Add macro nutrient prediction (protein, carbs, fats)- (done)
Deploy backend + frontend (cloud)
Add real athlete dataset
Improve model with time-series tracking
Add user history dashboard