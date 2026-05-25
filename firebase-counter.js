import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getDatabase, ref, runTransaction } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyClZpIPRn5ADVNHeosThfjWusTi6vhemJw",
    authDomain: "recyberseg.firebaseapp.com",
    databaseURL: "https://recyberseg-default-rtdb.firebaseio.com",
    projectId: "recyberseg",
    storageBucket: "recyberseg.appspot.com",
    messagingSenderId: "426720276050",
    appId: "1:426720276050:web:e48319ef893e06d41b398b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const visitsRef = ref(db, 'page_visits');
const visitorCountElement = document.getElementById('visitor-count');

try {
    const result = await runTransaction(visitsRef, (currentValue) => {
        return (currentValue || 0) + 1;
    });
    if (result.committed && visitorCountElement) {
        visitorCountElement.innerText = result.snapshot.val().toLocaleString();
    }
} catch (error) {
    console.error('La transacción de Firebase falló: ', error);
    if (visitorCountElement) {
        visitorCountElement.innerText = 'Error';
    }
}
