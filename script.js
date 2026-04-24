import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
    getAuth, GoogleAuthProvider, signInWithCredential, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn) registerBtn.addEventListener('click', () => container.classList.add("active"));
    if (loginBtn) loginBtn.addEventListener('click', () => container.classList.remove("active"));

    // 1. منطق قوة كلمة المرور
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
                strengthText.innerText = "ضعيفة جداً ❌"; strengthText.style.color = "#ff4d4d";
            } else if (score === 3) {
                strengthBar.classList.add('medium');
                strengthText.innerText = "متوسطة.. ⚠️"; strengthText.style.color = "#cca300";
            } else {
                strengthBar.classList.add('strong');
                strengthText.innerText = "قوية! ✅"; strengthText.style.color = "#2eb82e";
            }
        });
    }

    // 2. منطق استعادة كلمة المرور
    const forgotLink = document.getElementById('forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            if (!email) {
                showToast("اكتب بريدك أولاً في خانة الدخول");
                return;
            }
            sendPasswordResetEmail(auth, email)
                .then(() => showToast("تم إرسال رابط الاستعادة لبريدك!"))
                .catch(() => showToast("خطأ: البريد غير صحيح أو غير مسجل"));
        });
    }

    // 3. التبديل بين إظهار وإخفاء الباسورد
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = document.getElementById(this.getAttribute('data-target'));
            input.type = input.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // 4. تسجيل الدخول والتسجيل العادي
    const signUpForm = document.querySelector('.sign-up form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = regPassInput.value;
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    showToast("حساب جديد جاهز!");
                    container.classList.remove("active");
                })
                .catch((err) => showToast(err.code === 'auth/email-already-in-use' ? "الإيميل مسجل مسبقاً" : "بيانات غير صالحة"));
        });
    }

    const signInForm = document.querySelector('.sign-in form');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    showToast("تم الدخول!");
                    localStorage.setItem('user_name', res.user.email.split('@')[0]);
                    setTimeout(() => window.location.href = "https://ahmedmimo323.github.io/sana/", 1000);
                })
                .catch(() => showToast("خطأ في الإيميل أو الباسورد"));
        });
    }
});

// 5. تسجيل جوجل
window.handleCredentialResponse = (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    signInWithCredential(auth, credential)
        .then((res) => {
            localStorage.setItem('user_name', res.user.displayName);
            showToast(`أهلاً ${res.user.displayName}`);
            setTimeout(() => window.location.assign("https://ahmedmimo323.github.io/sana/"), 1000);
        })
        .catch(() => showToast("حدث خطأ في جوجل"));
};
