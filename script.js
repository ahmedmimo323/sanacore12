document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // أزرار التبديل بين واجهة الدخول والتسجيل
    if(registerBtn) registerBtn.onclick = () => container.classList.add("active");
    if(loginBtn) loginBtn.onclick = () => container.classList.remove("active");

    // --- الجزء الأول: حفظ البيانات (Sign Up) ---
    const signUpForm = document.getElementById('signUpForm');
    if(signUpForm) {
        signUpForm.onsubmit = (e) => {
            e.preventDefault();
            localStorage.setItem('user_email', document.getElementById('reg-email').value);
            localStorage.setItem('user_pass', document.getElementById('reg-pass').value);
            localStorage.setItem('user_name', document.getElementById('reg-name').value);
            alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
            container.classList.remove("active");
        };
    }

    // --- الجزء الثاني: التحقق فقط (Sign In) ---
    const signInForm = document.getElementById('signInForm');
    if(signInForm) {
        signInForm.onsubmit = (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email').value;
            const passInput = document.getElementById('login-pass').value;

            const savedEmail = localStorage.getItem('user_email');
            const savedPass = localStorage.getItem('user_pass');

            if (emailInput === savedEmail && passInput === savedPass) {
                alert("بيانات صحيحة! جاري التحويل...");
                window.location.href = "https://ahmedmimo323.github.io/sana/";
            } else {
                alert("خطأ! البيانات غير مطابقة أو لم تقم بإنشاء حساب بعد.");
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

    // --- منطق استقبال العودة من GitHub ---
    const urlParams = new URLSearchParams(window.location.search);
    const githubCode = urlParams.get('code');

    if (githubCode) {
        // تنظيف الرابط للحفاظ على المظهر الاحترافي
        window.history.replaceState({}, document.title, window.location.pathname);
        console.log("GitHub Auth Code Received:", githubCode);
        
        localStorage.setItem('isLoggedIn', 'true');
        alert("أهلاً بك! تم تسجيل الدخول عبر GitHub بنجاح.");
        window.location.href = "https://ahmedmimo323.github.io/sana/";
    }
});

/** وظيفة دخول جوجل **/
function handleCredentialResponse(response) {
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    localStorage.setItem('user_name', payload.name);
    localStorage.setItem('isLoggedIn', 'true');
    alert("أهلاً بك يا " + payload.name + "! تم الدخول بواسطة Google.");
    window.location.href = "https://ahmedmimo323.github.io/sana/";
}

/** وظيفة دخول فيسبوك **/
window.fbAsyncInit = function() {
    FB.init({
        appId      : '976294014925847', 
        cookie     : true,
        xfbml      : true,
        version    : 'v18.0'
    });
};

function fbLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name,email'}, function(userData) {
                localStorage.setItem('user_name', userData.name);
                localStorage.setItem('isLoggedIn', 'true');
                alert("أهلاً بك يا " + userData.name + "! تم الدخول بواسطة Facebook.");
                window.location.href = "https://ahmedmimo323.github.io/sana/";
            });
        }
    }, {scope: 'public_profile,email'});
}

/** وظيفة دخول GitHub (جديدة) **/
function githubLogin() {
    const CLIENT_ID = "Ov23liDgL358vg1eGya4"; 
    // الرابط الذي سيعود إليه المستخدم (نفس صفحة الدخول الحالية)
    const redirectUri = window.location.href.split('?')[0]; 
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubUrl;
}
