# Twitter Clone

## Introduction
This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, designed to mimic the core functionalities of the popular social media platform, Twitter/X. This application allows users to create accounts, post tweets, follow other users, and engage with tweets through likes and comments. The aim of this project is to explore the process of building a dynamic, interactive social platform and to demonstrate the potential of the MERN stack for creating full-featured applications.

## What Does This Project Do? (Functionalities)
- **User Authentication**: Secure signup, login, and logout functionalities.
- **Profile Management**: Users can edit their profiles, change their details, and upload profile and cover images.
- **Suggested Users**: Users receive suggestions for accounts to follow, helping to expand their network.
- **Notifications**: Users are notified when someone follows them or likes their pictures, keeping them engaged with their activity.
- **Tweeting and Engagement**: Users can create, delete, like, and comment on posts.
- **Follow System**: Follow and unfollow users to customise a personal feed.

## Technologies
- **React.js**: For building responsive user interfaces.
- **MongoDB**: NoSQL database for flexible data storage.
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for Node.js, enabling efficient API creation.
- **Tailwind CSS**: Utility-first framework for rapid UI styling.
- **JWT Authentication**: Secure user authentication with stateless session management.
- **React Query**: Library for data fetching, caching, and synchronization.
- **RESTful APIs**: Standardised approach for client-server communication.

## Overview of the Project
You can view this project live [here](https://twitter-clone-aeux.onrender.com). Please note that this deployment uses the free version of Render, so the server may occasionally go down, temporarily affecting access to the application.

## See Screenshots for an Overview of Its Features
Screenshots will be added here.

## Installation & Usage

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AdnanAliMumtaz/Twitter-Clone-Full-Stack-.git
   cd Twitter-Clone-Full-Stack-

2. **Install Dependencies** Install all required packages for both the backend and frontend:
    ```bash
    npm install
    cd frontend
    npm install
    cd ..

3. **Setup Environment Variables** Create a `.env` file in the root directory and add the following variables: 
    ```bash 
    MONGO_URI=your_mongo_database_uri
    PORT=your_preferred_port
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. **Bulid the Application**
    ```bash
    npm run build

5. **Start the Application**
    ```bash
    npm run start

6. **Access the Application** Open your browser and navigate to `http://localhost:PORT`, replacing `PORT` with the value set in your `.env` file.
