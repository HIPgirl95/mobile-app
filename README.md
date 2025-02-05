# React-Native and GiftedChat messaging app!

A real-time chat application built with React Native and Firebase. Users can anonymously sign in, set their username, choose a background color, and chat with others. The app supports sending text messages, images, and location sharing.

## Features

- Anonymous user authentication using Firebase.
- Real-time messaging with Firestore.
- Image upload and location sharing functionality.
- Customizable chat interface with different background colors.
- Offline message caching.

## Screenshots
![1](https://github.com/user-attachments/assets/72503bcf-dd00-43bb-b30f-ec3b27fd6ca0)
![1](https://github.com/user-attachments/assets/ac547348-d384-4504-b57f-771306dd6cac)

---

## Setting Up the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/HIPgirl95/mobile-app.git
cd mobile-app
```

### Step 2: Install Dependencies

Run the following commands to install all the required packages:

```bash
npm install
npm install -g expo-cli

```

### Step 3: Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Navigate to **Project Settings** and select the **General** tab.
3. Under the **Your apps** section, click **Add app** > **Web**.
4. Copy the Firebase configuration object and replace the existing configuration in the `App.js` file:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

### Step 4: Start the App

Run the following command to start the app:

```bash
npx expo start
```

You can scan the QR code with the Expo Go app on your phone to see the app in action, or use an emulator.

---

## Key Libraries Used

- **React Native**: Core framework for building the app.
- **Firebase**: Backend for authentication, Firestore database, and storage.
- **Expo**: Simplifies the React Native development workflow.
- **Gifted Chat**: Provides a prebuilt chat UI.
- **React Native Action Sheet**: Enables user-friendly option selection.
- **React Native Image Picker**: For selecting and uploading images.
- **React Native Maps**: For displaying user location on maps.
