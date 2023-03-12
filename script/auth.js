import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


const firebaseConfig = {
apiKey: "AIzaSyCI4YKWsLjK0EQsEqwDS168sRBSLOXdjA4",
  authDomain: "fir-bl-d924d.firebaseapp.com",
  projectId: "fir-bl-d924d",
  storageBucket: "fir-bl-d924d.appspot.com",
  messagingSenderId: "137235172497",
  appId: "1:137235172497:web:869e5ba6dfdc1db3fec330",
  measurementId: "G-5H219SF60E"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

//Login Action
login.addEventListener('click',(e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    const dt = new Date();
    console.log(email);
    update(ref(database, 'users/' + user.uid),{
    last_login: dt,
    })
    alert('User Loged In As ' + user.email);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("7EightSports: " + errorMessage)
    });
});

out.addEventListener('click', (e) => {
    auth.signOut().then(() => {
        alert('You Have Successfully Signed Out!');
      });
});

sighUp.addEventListener('click',(e) => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid),{
            Company: company,
            Name: name,
            Username: username,
            Email: email,
        })
            alert('User Created!');
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        // ..
    });
});

const user = auth.currentUser;
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  user.providerData.forEach((profile) => {
  });
  } else {
    setupUI();
  }
});

const setupUI = (user) => {
    if (user) {
      loggedInLinks.forEach(item => item.style.display = 'inline-block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
      
    } else {
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'inline-block');
    }
}
