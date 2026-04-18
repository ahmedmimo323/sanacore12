document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // أزرار التبديل بين واجهة الدخول والتسجيل
    registerBtn.onclick = () => container.classList.add("active");
    loginBtn.onclick = () => container.classList.remove("active");

    // --- الجزء الأول: حفظ البيانات (Sign Up فقط) ---
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.onsubmit = (e) => {
        e.preventDefault();
        
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        const name = document.getElementById('reg-name').value;

        // الحفظ في ذاكرة المتصفح
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_pass', pass);
        localStorage.setItem('user_name', name);

        alert("تم حفظ حسابك بنجاح! يمكنك الآن الذهاب لتسجيل الدخول.");
        container.classList.remove("active"); // نقله لواجهة تسجيل الدخول
    };

    // --- الجزء الثاني: التحقق فقط (Sign In) ---
    const signInForm = document.getElementById('signInForm');
    signInForm.onsubmit = (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('login-email').value;
        const passInput = document.getElementById('login-pass').value;

        // جلب البيانات التي تم حفظها في الـ Sign Up
        const savedEmail = localStorage.getItem('user_email');
        const savedPass = localStorage.getItem('user_pass');

        // المقارنة
        if (emailInput === savedEmail && passInput === savedPass) {
            alert("بيانات صحيحة! جاري التحويل...");
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        } else {
            alert("خطأ! البيانات غير مطابقة أو لم تقم بإنشاء حساب بعد.");
        }
    };

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
