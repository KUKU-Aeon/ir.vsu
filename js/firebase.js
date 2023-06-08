
let firebaseConfig = {
    apiKey: "AIzaSyBVh-UEk-FHPnmTMgKGg8ZxEub35C3yT4M",
    authDomain: "ir-vsu.firebaseapp.com",
    projectId: "ir-vsu",
    storageBucket: "ir-vsu.appspot.com",
    messagingSenderId: "949835124450",
    databaseURL: "https://ir-vsu-default-rtdb.firebaseio.com",
    appId: "1:949835124450:web:ca656ecdc7a66f491d98bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
const database = firebase.database();
const storage = firebase.storage();

