document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // تبديل الواجهة
    registerBtn.addEventListener('click', () => container.classList.add("active"));
    loginBtn.addEventListener('click', () => container.classList.remove("active"));

    // منطق التسجيل (حفظ البيانات)
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        // تخزين البيانات في ذاكرة المتصفح
        localStorage.setItem('db_email', email);
        localStorage.setItem('db_pass', pass);
        localStorage.setItem('db_name', name);

        alert("تم إنشاء الحساب! سجل دخولك الآن بنفس البيانات.");
        container.classList.remove("active");
    });

    // منطق الدخول (التحقق من البيانات)
    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = document.getElementById('login-email').value;
        const passVal = document.getElementById('login-pass').value;

        const savedEmail = localStorage.getItem('db_email');
        const savedPass = localStorage.getItem('db_pass');
        const savedName = localStorage.getItem('db_name');

        if (emailVal === savedEmail && passVal === savedPass) {
            alert(`مرحباً ${savedName}! يتم توجيهك الآن...`);
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        } else {
            alert("خطأ! الحساب غير موجود أو البيانات غير صحيحة.");
        }
    });

    // ميزة العين لإظهار كلمة المرور
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
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
