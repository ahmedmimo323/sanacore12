document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // تفعيل أزرار التبديل بين الواجهتين
    if(registerBtn) registerBtn.onclick = () => container.classList.add("active");
    if(loginBtn) loginBtn.onclick = () => container.classList.remove("active");

    // --- منطق التسجيل (Sign Up) ---
    const signUpForm = document.querySelector('.sign-up form');
    signUpForm.onsubmit = (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-pass').value;

        // حفظ في LocalStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPass', password);
        localStorage.setItem('userName', name);

        alert("تم حفظ بياناتك بنجاح! جرب تسجيل الدخول الآن.");
        container.classList.remove("active"); // نقله لصفحة الدخول
    };

    // --- منطق الدخول (Sign In) ---
    const signInForm = document.querySelector('.sign-in form');
    signInForm.onsubmit = (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('login-email').value;
        const passInput = document.getElementById('login-pass').value;

        // جلب البيانات المخزنة
        const savedEmail = localStorage.getItem('userEmail');
        const savedPass = localStorage.getItem('userPass');
        const savedName = localStorage.getItem('userName');

        if (emailInput === savedEmail && passInput === savedPass) {
            alert(`مرحباً ${savedName}! يتم الآن نقلك إلى Sana...`);
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        } else {
            alert("خطأ! الإيميل أو الباسورد غير متطابقين مع ما سجلته.");
        }
    };

    // ميزة العين (إظهار الباسورد)
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.onclick = function() {
            const input = document.getElementById(this.getAttribute('data-target'));
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        };
    });
});
