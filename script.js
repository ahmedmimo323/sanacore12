import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCTAp16kn8Z27O2G7wK9H-a3bW9hiNKU9A", 
    authDomain: "sanad-platform-493800.firebaseapp.com",
    projectId: "sanad-platform-493800",
    storageBucket: "sanad-platform-493800.firebasestorage.app",
    messagingSenderId: "846999771353",
    appId: "1:846999771353:web:8dc1d15603ff2e2155c6c8",
    measurementId: "G-KNCPYKZ7KH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof auth !== 'undefined') {
        auth.signOut().then(() => console.log("Session Cleaned"));
    }

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && container) {
        registerBtn.addEventListener('click', () => container.classList.add("active"));
    }
    if (loginBtn && container) {
        loginBtn.addEventListener('click', () => container.classList.remove("active"));
    }

    // --- نظام قوة كلمة المرور ---
    const regPassInput = document.getElementById('reg-pass');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const strengthMeter = document.querySelector('.strength-meter');

    if (regPassInput) {
        regPassInput.addEventListener('input', () => {
            const val = regPassInput.value;
            strengthMeter.style.display = val.length > 0 ? 'block' : 'none';
            strengthText.style.display = val.length > 0 ? 'block' : 'none';
            
            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            strengthBar.className = 'strength-bar';
            if (score <= 2) {
                strengthBar.classList.add('weak');
                strengthText.innerText = "weakاً ❌";
                strengthText.style.color = "#ff4d4d";
            } else if (score === 3) {
                strengthBar.classList.add('medium');
                strengthText.innerText = "medium.. ADD symbols ⚠️";
                strengthText.style.color = "#cca300";
            } else {
                strengthBar.classList.add('strong');
                strengthText.innerText = "strong ✅";
                strengthText.style.color = "#2eb82e";
            }
        });
    }

    // --- باقي الوظائف (إظهار الباسورد، التسجيل، الدخول) ---
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const inputId = this.getAttribute('data-target');
            const input = document.getElementById(inputId);
            input.type = input.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    });

    const signUpForm = document.querySelector('.sign-up form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signUpForm.querySelector('input[type="email"]').value;
            const password = regPassInput.value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    showToast("تم إنشاء الحساب بنجاح!");
                    setTimeout(() => container.classList.remove("active"), 1500);
                })
                .catch((error) => {
                    showToast(error.code === 'auth/email-already-in-use' ? "الإيميل مستخدم!" : "خطأ في البيانات");
                });
        });
    }

    const signInForm = document.querySelector('.sign-in form');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signInForm.querySelector('input[type="email"]').value;
            const password = signInForm.querySelector('input[id="login-pass"]').value;
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    showToast("تم تسجيل الدخول!");
                    localStorage.setItem('user_name', result.user.email.split('@')[0]);
                    setTimeout(() => window.location.href = "https://ahmedmimo323.github.io/sana/", 1500);
                })
                .catch(() => showToast("بيانات الدخول خاطئة"));
        });
    }
});

window.handleCredentialResponse = (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    signInWithCredential(auth, credential)
        .then((result) => {
            localStorage.setItem('user_name', result.user.displayName);
            showToast(`مرحباً ${result.user.displayName}`);
            setTimeout(() => window.location.assign("https://ahmedmimo323.github.io/sana/"), 1000);
        })
        .catch(() => showToast("خطأ في جوجل"));
};
