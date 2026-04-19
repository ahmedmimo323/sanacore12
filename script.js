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
        // إضافة منطق الحفظ الذي كان ينقص الكود
        localStorage.setItem('user_email', document.getElementById('reg-email').value);
        localStorage.setItem('user_pass', document.getElementById('reg-pass').value);
        localStorage.setItem('user_name', document.getElementById('reg-name').value);
        alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
        container.classList.remove("active");
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

/** * إضافة وظيفة دخول جوجل (توضع خارج نطاق DOMContentLoaded لتكون عالمية)
 * هذه الوظيفة يتم استدعاؤها بواسطة Google Identity Services عند نجاح الدخول
 */
function handleCredentialResponse(response) {
    // فك تشفير البيانات القادمة من جوجل (JWT)
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    console.log("تم تسجيل الدخول عبر جوجل بنجاح");
    
    // حفظ اسم المستخدم القادم من جوجل للترحيب به
    localStorage.setItem('user_name', payload.name);
    localStorage.setItem('isLoggedIn', 'true');

    alert("أهلاً بك يا " + payload.name + "! تم الدخول بواسطة Google.");
    
    // التحويل إلى الصفحة المطلوبة
    window.location.href = "https://ahmedmimo323.github.io/sana/";
}
