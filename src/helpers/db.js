import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDaHlci1xbHED_whUcUdkN8fWsZ_Oto6iw",
    authDomain: "qr-attendance-799.firebaseapp.com",
    projectId: "qr-attendance-799",
    storageBucket: "qr-attendance-799.appspot.com",
    messagingSenderId: "630211121792",
    appId: "1:630211121792:web:c00f638bcc1a67dc7a4c65",
    databaseURL: "https://qr-attendance-799-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;