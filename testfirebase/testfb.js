import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsCMHY8h-ABDlHSU5LcD7KMFt7k16MD1g",
    authDomain: "final-project-18552.firebaseapp.com",
    projectId: "final-project-18552",
    storageBucket: "final-project-18552.firebasestorage.app",
    messagingSenderId: "993960292227",
    appId: "1:993960292227:web:2d8a324cef176d938390b6",
    measurementId: "G-WNYC74GG21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function loadBreedData() {
    const docRef = doc(db, "breed", "basenji");

    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("about").innerText = data.about || "N/A";
            document.getElementById("color").innerText = data.color || "N/A";
            document.getElementById("size").innerText = data.size || "N/A";
            document.getElementById("weight").innerText = data.weight || "N/A";
            document.getElementById("height").innerText = data.height || "N/A";
            document.getElementById("history").innerText = data.history || "N/A";
        } else {
            console.log("No such document!");
        }
    });
}

loadBreedData();