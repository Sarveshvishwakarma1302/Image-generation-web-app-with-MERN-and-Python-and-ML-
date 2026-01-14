Image Generation Web App with MERN, Python, and ML
Project Overview

This is a full-stack web application that allows users to generate images using AI and Machine Learning models. It is built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrates Python-based ML models to generate high-quality images dynamically.

The app also includes email-based OTP verification to ensure secure user authentication. Users must verify their email before accessing the image generation features.

Features

User Authentication with Email OTP

Users register with their email.

An OTP is sent to the registered email for verification.

Only after verifying the OTP, users can access the app features.

AI-Based Image Generation

Users can enter text prompts to generate images.

Python ML models (like TensorFlow or PyTorch) process the input and generate images.

Generated images are displayed in real-time on the frontend.

User Dashboard & History

Stores user data, generated images, and prompt history in MongoDB.

Users can view their previous generated images.

Responsive UI

Tech Stack

Frontend: React.js, HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB (for user data and image history)

AI/ML: Python, TensorFlow / PyTorch

Email Service: NodeMailer (for OTP email verification)

Integration: REST APIs connecting Node.js backend with Python ML scripts

How OTP Verification Works

User enters their email during registration.

Backend generates a random OTP.

The OTP is sent to the user’s email using NodeMailer.

User enters the OTP on the frontend.

Backend verifies the OTP:

If correct → user is registered and redirected to the dashboard

If incorrect → user gets an error and can request a new OTP

This ensures that only valid users can access the app and prevents spam or fake accounts.

Frontend built with React.js

Mobile-friendly and interactive design
