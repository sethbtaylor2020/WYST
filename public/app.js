// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWtMp3_vfkI99bNoIM2eAJTla-0ZB35NY",
  authDomain: "wyst-7fe74.firebaseapp.com",
  projectId: "wyst-7fe74",
  storageBucket: "wyst-7fe74.firebasestorage.app",
  messagingSenderId: "2082907574",
  appId: "1:2082907574:web:f7a7c32905e246e3388d17",
  measurementId: "G-YQ1CYW36WM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form handler
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const tourTime = document.getElementById("tourTime").value;

  // Include it in your Firestore document
  


  try {
    const docRef = await db.collection("signups").add({
    name,
    email,
    tourTime,
    checkedIn: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Generate the QR code for the check-in URL
  const signupId = docRef.id;
  const checkInUrl = `https://wyst-7fe74.web.app/checkin.html?id=${signupId}`;

  QRCode.toDataURL(checkInUrl, async (err, qrDataUrl) => {
    if (err) {
      console.error('QR generation failed:', err);
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Tour Check-In Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Tour Time: ${tourTime}`, 20, 50);

    // Add QR code
    doc.addImage(qrDataUrl, 'PNG', 20, 60, 100, 100);

    // Trigger download
    doc.save(`${name}-tour-ticket.pdf`);
  });

    alert("Signed up!");
  } catch (err) {
    console.error(err);
    alert("Error signing up.");
  }

});

