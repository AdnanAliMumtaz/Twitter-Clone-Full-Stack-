# Twitter Clone

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
- **Manual Testing with Postman**: For testing API endpoints to ensure proper functionality and response handling.

## Overview of the Project
You can view this project live [here](https://twitter-clone-aeux.onrender.com). Please note that this deployment uses the free version of Render, so the server may occasionally go down, temporarily affecting access to the application.

### See Screenshots for an Overview of Its Features
<div align="center">
   <img src="https://github.com/user-attachments/assets/f73ae1c5-4ecd-4546-a548-77302a375d81" alt="SignUp Page" width="750">
   <img src="https://github.com/user-attachments/assets/ad22a4dd-7cdb-4349-9b77-4a5bc906ef71" alt="Login Page" width="750">
   <img src="https://github.com/user-attachments/assets/3efd2954-b41a-4d13-a244-225582382f59" alt="Home Page" width="750">
   <img src="https://github.com/user-attachments/assets/0beca9a5-05e2-49d5-a8c7-4daa18f63de3" alt="Following Posts" width="750">
   <img src="https://github.com/user-attachments/assets/cf426866-0c87-4347-89c3-65cb821a8e01" alt="Notification Page" width="750">
   <img src="https://github.com/user-attachments/assets/277c0114-6512-4ccb-81ef-8fd2806c98b7" alt="Personal Posts Page" width="750">
   <img src="https://github.com/user-attachments/assets/c2339575-a222-4932-9fbe-6232efb3ac00" alt="Liked Posts Page" width="750">
   <img src="https://github.com/user-attachments/assets/efbdddfc-843a-484e-a8c3-4c0df8549507" alt="Edit Personal Details Page" width="750">
</div>

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

##
