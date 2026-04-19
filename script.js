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

        // تختفي الرسالة بعد 2 ثانية ويتم تنفيذ الأكشن بعدها
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

    // --- التحقق (Sign In) ---
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

    // استقبال عودة GitHub
    const urlParams = new URLSearchParams(window.location.search);
    const githubCode = urlParams.get('code');
    if (githubCode) {
        window.history.replaceState({}, document.title, window.location.pathname);
        showToast("تم تسجيل الدخول عبر GitHub!", () => {
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        });
    }
});

// وظيفة دخول جوجل (خارج النطاق لتكون عالمية)
function handleCredentialResponse(response) {
    const payload = JSON.parse(window.atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    localStorage.setItem('user_name', payload.name);
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = "مرحباً بك! تم الدخول بواسطة Google";
    document.body.appendChild(toast);

    setTimeout(() => {
        window.location.href = "https://ahmedmimo323.github.io/sana/";
    }, 2000);
}

// وظيفة فيسبوك
function fbLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name'}, function(userData) {
                localStorage.setItem('user_name', userData.name);
                const toast = document.createElement('div');
                toast.className = 'custom-toast';
                toast.innerText = "تم الدخول بواسطة Facebook";
                document.body.appendChild(toast);
                setTimeout(() => {
                    window.location.href = "https://ahmedmimo323.github.io/sana/";
                }, 2000);
            });
        }
    }, {scope: 'public_profile,email'});
}

function githubLogin() {
    const CLIENT_ID = "Ov23liDgL358vg1eGya4"; 
    const redirectUri = window.location.href.split('?')[0]; 
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
}
