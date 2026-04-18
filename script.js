document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // 1. التبديل بين واجهة Sign In و Sign Up
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // 2. منطق تسجيل حساب جديد (Sign Up) - يحفظ البيانات في المتصفح
    const signUpForm = document.querySelector('.sign-up form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = signUpForm.querySelector('input[type="text"]').value;
            const email = signUpForm.querySelector('input[type="email"]').value;
            const password = signUpForm.querySelector('input[type="password"]').value;

            // تخزين البيانات (Database Simulation)
            localStorage.setItem('storedEmail', email);
            localStorage.setItem('storedPassword', password);
            localStorage.setItem('storedName', name);

            alert("تم إنشاء الحساب بنجاح يا " + name + "! يمكنك الآن تسجيل الدخول.");
            container.classList.remove("active"); // نقله تلقائياً لصفحة تسجيل الدخول
        });
    }

    // 3. منطق تسجيل الدخول (Sign In) - التحقق والتحويل لصفحة Sana
    const signInForm = document.querySelector('.sign-in form');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = signInForm.querySelector('input[type="email"]').value;
            const passInput = signInForm.querySelector('input[type="password"]').value;

            // جلب البيانات المسجلة سابقاً
            const savedEmail = localStorage.getItem('storedEmail');
            const savedPass = localStorage.getItem('storedPassword');

            // شرط التحقق: هل البيانات مطابقة لما تم تسجيله؟
            if (emailInput === savedEmail && passInput === savedPass) {
                alert("تم التحقق بنجاح! جاري تحويلك إلى منصة Sana...");
                window.location.href = "https://ahmedmimo323.github.io/sana/"; // الربط المطلوب
            } else {
                alert("خطأ: الإيميل أو كلمة المرور غير صحيحة، أو أنك لم تسجل حساباً بعد.");
            }
        });
    }

    // 4. ميزة إظهار وإخفاء كلمة المرور (Toggle Password)
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
});
