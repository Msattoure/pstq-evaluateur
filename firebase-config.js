// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBT-TrkG0X-1rNM4AeN6mO4OFjscauxnYw",
    authDomain: "pstq-simulator.firebaseapp.com",
    projectId: "pstq-simulator",
    storageBucket: "pstq-simulator.firebasestorage.app",
    messagingSenderId: "317639853680",
    appId: "1:317639853680:web:b93e4033f021ce9ef996b5",
    measurementId: "G-434N1R5XPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Make analytics available globally
window.firebaseAnalytics = analytics;
window.logFirebaseEvent = logEvent; 