// 1. استيراد مكتبات Firebase (نظام CDN Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 2. إعدادات Firebase الخاصة بك (مأخوذة من لقطة الشاشة التي أرسلتها)
const firebaseConfig = {
  apiKey: "AIzaSyCTAp16kn8Z2702G7wK9H-a3bW9hiNKU9A",
  authDomain: "sanad-platform-493800.firebaseapp.com",
  projectId: "sanad-platform-493800",
  storageBucket: "sanad-platform-493800.firebasestorage.app",
  messagingSenderId: "846999771353",
  appId: "1:846999771353:web:8dc1d15603ff2e2155c6c8",
  measurementId: "G-KNCPYKZ7KH"
};

// 3. تهيئة التطبيق وخدمة التحقق
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // دالة التنبيه المؤقت (Toast)
    function showToast(message, callback) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
                if (callback) callback();
            }, 500);
        }, 2000);
    }

    // أزرار التبديل
    if(registerBtn) registerBtn.onclick = () => container.classList.add("active");
    if(loginBtn) loginBtn.onclick = () => container.classList.remove("active");

    // --- حفظ البيانات (Sign Up) ---
    const signUpForm = document.getElementById('signUpForm');
    if(signUpForm) {
        signUpForm.onsubmit = (e) => {
            e.preventDefault();
            localStorage.setItem('user_email', document.getElementById('reg-email').value);
            localStorage.setItem('user_pass', document.getElementById('reg-pass').value);
            localStorage.setItem('user_name', document.getElementById('reg-name').value);
            
            showToast("تم إنشاء الحساب بنجاح!", () => {
                container.classList.remove("active");
            });
        };
    }

    // --- التحقق (Sign In) التقليدي ---
    const signInForm = document.getElementById('signInForm');
    if(signInForm) {
        signInForm.onsubmit = (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email').value;
            const passInput = document.getElementById('login-pass').value;
            const savedEmail = localStorage.getItem('user_email');
            const savedPass = localStorage.getItem('user_pass');

            if (emailInput === savedEmail && passInput === savedPass) {
                showToast("بيانات صحيحة! جاري التحويل...", () => {
                    window.location.href = "https://ahmedmimo323.github.io/sana/";
                });
            } else {
                showToast("خطأ! البيانات غير مطابقة.");
            }
        };
    }

    // ميزة إظهار كلمة المرور
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.onclick = function() {
            const target = document.getElementById(this.getAttribute('data-target'));
            if (target.type === 'password') {
                target.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                target.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        };
    });
});

// 4. دالة جوجل (تم جعلها عالمية لتعمل مع مكتبة جوجل الخارجية)
window.handleCredentialResponse = (response) => {
    // إنشاء بيانات الاعتماد (Credential) من الـ Token الذي أرسله جوجل
    const credential = GoogleAuthProvider.credential(response.credential);
    
    // تسجيل الدخول في Firebase لحفظ المستخدم في قاعدة البيانات
    signInWithCredential(auth, credential)
        .then((result) => {
            const user = result.user;
            
            // تخزين الاسم للعرض السريع في الموقع
            localStorage.setItem('user_name', user.displayName);
            
            // إنشاء تنبيه النجاح
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.innerText = `مرحباً ${user.displayName}! تم الحفظ بنجاح في Firebase`;
            document.body.appendChild(toast);

            // التحويل للموقع الرئيسي
            setTimeout(() => {
                window.location.href = "https://ahmedmimo323.github.io/sana/";
            }, 2000);
        })
        .catch((error) => {
    console.error("Firebase Details:", error); // سيظهر لك كود الخطأ بالتفصيل في الـ Console
    alert("خطأ: " + error.message); 
});
};
