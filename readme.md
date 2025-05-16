# Edunest - Learning Management System (LMS)

## Description

Edunest is a modern Learning Management System (LMS) designed to facilitate online education and course management. It consists of a React-based frontend and a Django-powered REST API backend. This README provides setup instructions to get both parts running locally.

## Prerequisites

* Node.js (v14 or later) and npm
* Python (v3.8 or later)
* Git
* (Optional) Virtual environment tool for Python

## Project Structure

```
LMS/
├── lms_frontend/    # React frontend
└── lms_api/         # Django REST API backend
```

---

## Frontend Setup

1. **Clone the repository**

  
   git clone https://github.com/klaudiaczarnota/LMS

2. **Navigate to the frontend directory**


   cd LMS/lms_frontend

3. **Install dependencies**


   npm install

4. **Start the development server**


   npm run start

5. **Access the app**
   Open your browser at:  `http://localhost:3000`

---

## Backend Setup

1. **Open a new terminal and navigate to the API folder**


   cd LMS/lms_api

2. **Create and activate a virtual environment**

 
   python -m venv venv
   .\venv\Scripts\Activate.ps1   # Windows PowerShell
   # or
   source venv/bin/activate       # macOS/Linux

3. **Install Python dependencies**


   pip install -r requirements.txt

4. **Apply database migrations**


   python manage.py migrate

5. **Create a superuser (admin account)**


   python manage.py createsuperuser
   # Enter email and password when prompted

6. **Start the Django development server**


   python manage.py runserver
  
7. **Access the API**
   Backend will be running at:  `http://127.0.0.1:8000/`

---

## Admin Panel

After setting up the backend and creating a superuser, you can access the Django admin panel:

```
http://127.0.0.1:8000/admin
```

Log in with the superuser email and password you provided during `createsuperuser`.

---

## Usage

* Use the React frontend to browse courses, enroll, and interact with content.
* The backend API serves endpoints for authentication, course management, and user data.
* Admin users can manage courses, users, and other models via the Django admin interface.
