document.addEventListener("DOMContentLoaded", () => {
  // Initialize Firebase (compat-style)
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
    
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const tourTime = document.getElementById("tourTime").value;
    
      try {
        const docRef = await db.collection("signups").add({
          name,
          email,
          tourTime,
          checkedIn: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    
        const signupId = docRef.id;
        const checkInUrl = `https://wyst-7fe74.web.app/checkin.html?id=${signupId}`;
    
        QRCode.toDataURL(checkInUrl, (err, qrDataUrl) => {
          if (err) {
            console.error("QR code generation failed:", err);
            return;
          }
    
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
    
          doc.setFontSize(18);
          doc.text("Tour Check-In Ticket", 20, 20);
    
          doc.setFontSize(12);
          doc.text(`Name: ${name}`, 20, 40);
          doc.text(`Tour Time: ${tourTime}`, 20, 50);
    
          doc.addImage(qrDataUrl, "PNG", 20, 60, 100, 100);
    
          doc.save(`${name}-tour-ticket.pdf`);
        });
    
        alert("Signed up successfully!");
      } catch (err) {
        console.error("Signup failed:", err);
        alert("Error signing up.");
      }
    });
});