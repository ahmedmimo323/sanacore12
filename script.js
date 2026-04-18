const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// التبديل بين الـ Sign In والـ Sign Up (الكود القديم)
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// --- الجزء الجديد: ربط صفحة تسجيل الدخول بموقع Sana ---

// أولاً: الوصول للفورم الخاص بـ Sign In
const signInForm = document.querySelector('.sign-in form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع الصفحة من التحميل الافتراضي

    // هنا تقدر تضيف شروط لو حابب تتأكد من الإيميل والباسورد
    // حالياً بمجرد الضغط هيحولك للموقع:
    window.location.href = "https://ahmedmimo323.github.io/sana/";
});

// ثانياً: الوصول للفورم الخاص بـ Sign Up (لو حابب يحول لمكان تاني أو نفس المكان)
const signUpForm = document.querySelector('.sign-up form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = "https://ahmedmimo323.github.io/sana/";
});

// كود أيقونة العين (إظهار الباسورد) اللي ضفناه سابقاً
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
