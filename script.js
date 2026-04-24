// استيراد مكتبات Firebase اللازمة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// إعدادات Firebase الخاصة بمشروع (Sanad Platform)
// ملاحظة: تم التأكد من مفتاح الـ API وتصحيحه (حرف O بدلاً من الصفر)
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
 * تستخدم التنسيق الموجود في ملف الـ CSS الخاص بك (.custom-toast)
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // إخفاء التنبيه بعد 3 ثوانٍ وحذفه من الصفحة
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

    // 2. تعريف العناصر (يجب أن تكون داخل الدالة لضمان وجودها في الصفحة)
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // 3. منطق التبديل (الأنيميشن) بين Sign In و Sign Up
    if (registerBtn && container) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    }

    if (loginBtn && container) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // 4. كود إظهار/إخفاء كلمة المرور (ضعه هنا أيضاً لتضمن عمله)
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

}); // نهاية دالةDOMContentLoaded الصحيحة (تأكد أنها في آخر الملف بعد كل الأوامر)
/**
 * معالجة الرد القادم من Google Identity Services
 * يتم استدعاء هذه الدالة تلقائياً بواسطة مكتبة جوجل في الـ HTML
 */
window.handleCredentialResponse = (response) => {
    // تحويل الـ Token المستلم من جوجل إلى Credential يفهمه Firebase
    const credential = GoogleAuthProvider.credential(response.credential);
    
    // تسجيل الدخول في Firebase باستخدام بيانات جوجل
    signInWithCredential(auth, credential)
        .then((result) => {
            const user = result.user;
            
            // تخزين اسم المستخدم محلياً لاستخدامه في الصفحة التالية
            localStorage.setItem('user_name', user.displayName);
            
            // إظهار رسالة ترحيب
            showToast(`مرحباً ${user.displayName}! جاري توجيهك للمنصة...`);
            
            // التوجيه إلى الصفحة التالية (منصة سند) بعد ثانية ونصف
            setTimeout(() => {
               // استبدل السطر القديم بهذا
window.location.href = "https://ahmedmimo323.github.io/sana/";
            }, 1500);
        })
        .catch((error) => {
            console.error("Firebase Auth Error:", error);
            showToast("حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقاً.");
        });
};

// دوال تكميلية لأيقونات السوشيال ميديا الأخرى (يمكنك برمجتها لاحقاً)
window.fbLogin = () => showToast("خدمة فيسبوك ستتوفر قريباً");
window.githubLogin = () => showToast("خدمة جيت هاب ستتوفر قريباً");
// ميزة تسجيل حساب جديد بالإيميل والباسورد
// ميزة تسجيل حساب جديد بالإيميل والباسورد
const signUpForm = document.querySelector('.sign-up form');
if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = signUpForm.querySelector('input[type="text"]').value;
        const email = signUpForm.querySelector('input[type="email"]').value;
        const password = signUpForm.querySelector('input[type="password"]').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showToast("تم إنشاء الحساب بنجاح! سجل دخولك الآن");

                // بدلاً من الانتقال للمنصة، سنقوم بالتبديل لشاشة Sign In
                setTimeout(() => {
                    const container = document.getElementById('container');
                    container.classList.remove("active"); // هذا السطر سيعيد الأنيميشن لليسار (Sign In)
                }, 1500);
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
