const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// التبديل بين الواجهات
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// --- 1. منطق تسجيل حساب جديد (Sign Up) ---
const signUpForm = document.querySelector('.sign-up form');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = document.getElementById('reg-pass').value;

    // حفظ البيانات في ذاكرة المتصفح
    const userData = { name, email, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
    container.classList.remove("active"); // إعادته لصفحة تسجيل الدخول
});

// --- 2. منطق تسجيل الدخول (Sign In) ---
const signInForm = document.querySelector('.sign-in form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signInForm.querySelector('input[type="email"]').value;
    const password = document.getElementById('login-pass').value;

    // جلب البيانات المحفوظة للتأكد منها
    const storedData = localStorage.getItem(email);

    if (storedData) {
        const user = JSON.parse(storedData);
        
        // التأكد من صحة كلمة المرور
        if (user.password === password) {
            alert(`أهلاً بك يا ${user.name}، جاري تحويلك إلى منصة Sana...`);
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        } else {
            alert("كلمة المرور غير صحيحة!");
        }
    } else {
        alert("هذا الحساب غير موجود، يرجى إنشاء حساب أولاً.");
    }
});

// ميزة إظهار وإخفاء كلمة المرور
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
