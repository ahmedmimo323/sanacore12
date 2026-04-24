// استيراد مكتبات Firebase اللازمة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// إعدادات Firebase الخاصة بمشروع (Sanad Platform)
const firebaseConfig = {
    apiKey: "AIzaSyCTAp16kn8Z27O2G7wK9H-a3bW9hiNKU9A", 
    authDomain: "sanad-platform-493800.firebaseapp.com",
    projectId: "sanad-platform-493800",
    storageBucket: "sanad-platform-493800.firebasestorage.app",
    messagingSenderId: "846999771353",
    appId: "1:846999771353:web:8dc1d15603ff2e2155c6c8",
    measurementId: "G-KNCPYKZ7KH"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * دالة لإظهار التنبيهات (Toast) 
 */
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

/**
 * معالجة أحداث الواجهة (DOM) عند تحميل الصفحة
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. تنظيف أي جلسة معلقة فور فتح الصفحة لضمان عمل الدخول في كل مرة
    if (typeof auth !== 'undefined') {
        auth.signOut().then(() => console.log("Session Cleaned"));
    }

    // 2. تعريف عناصر الأنيميشن
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && container) {
        registerBtn.addEventListener('click', () => container.classList.add("active"));
    }
    if (loginBtn && container) {
        loginBtn.addEventListener('click', () => container.classList.remove("active"));
    }

    // 3. كود إظهار/إخفاء كلمة المرور
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const inputId = this.getAttribute('data-target');
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // 4. ميزة تسجيل حساب جديد بالإيميل والباسورد
    const signUpForm = document.querySelector('.sign-up form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signUpForm.querySelector('input[type="email"]').value;
            const password = signUpForm.querySelector('input[type="password"]').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    showToast("تم إنشاء الحساب بنجاح! سجل دخولك الآن");
                    setTimeout(() => container.classList.remove("active"), 1500);
                })
                .catch((error) => {
                    console.error("Sign Up Error:", error.code);
                    if (error.code === 'auth/email-already-in-use') {
                        showToast("هذا الإيميل مستخدم بالفعل!");
                    } else {
                        showToast("خطأ في البيانات، حاول مرة أخرى");
                    }
                });
        });
    }

    // 5. ميزة تسجيل الدخول العادي بالإيميل والباسورد
    const signInForm = document.querySelector('.sign-in form');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signInForm.querySelector('input[type="email"]').value;
            const password = signInForm.querySelector('input[type="password"]').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    showToast("تم تسجيل الدخول بنجاح!");
                    localStorage.setItem('user_name', result.user.email.split('@')[0]);
                    setTimeout(() => window.location.href = "https://ahmedmimo323.github.io/sana/", 1500);
                })
                .catch(() => showToast("بيانات الدخول غير صحيحة"));
        });
    }
});

/**
 * معالجة الرد القادم من Google Identity Services
 */
window.handleCredentialResponse = (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    
    signInWithCredential(auth, credential)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('user_name', user.displayName);
            localStorage.setItem('user_email', user.email);
            
            showToast(`مرحباً ${user.displayName}! جاري توجيهك للمنصة...`);
            
            // الحل النهائي لمشكلة المرة الواحدة: تعطيل الاختيار التلقائي
            if (window.google && google.accounts && google.accounts.id) {
                google.accounts.id.disableAutoSelect();
            }

            setTimeout(() => {
                window.location.href = "https://ahmedmimo323.github.io/sana/";
            }, 1500);
        })
        .catch((error) => {
            console.error("Firebase Auth Error:", error);
            showToast("حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقاً.");
        });
};

// دوال أيقونات السوشيال ميديا الأخرى
window.fbLogin = () => showToast("خدمة فيسبوك ستتوفر قريباً");
window.githubLogin = () => showToast("خدمة جيت هاب ستتوفر قريباً");
