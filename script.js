// 1. جعل الدالة عالمية عشان تشتغل مع جوجل وفيسبوك بدون مشاكل
function showToast(message, callback) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
            if (callback) callback();
        }, 500);
    }, 2000);
}

// 2. دالة جوجل (خارج النطاق)
function handleCredentialResponse(response) {
    const payload = JSON.parse(window.atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    localStorage.setItem('user_name', payload.name);
    
    showToast("مرحباً بك! تم الدخول بواسطة Google", () => {
        // التحويل لنفس المجلد الحالي لضمان اشتغال الرابط
        window.location.href = "index.html"; 
    });
}

// 3. دالة فيسبوك (خارج النطاق)
function fbLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name'}, function(userData) {
                localStorage.setItem('user_name', userData.name);
                showToast("تم الدخول بواسطة Facebook", () => {
                    window.location.href = "index.html";
                });
            });
        }
    }, {scope: 'public_profile,email'});
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if(registerBtn) registerBtn.onclick = () => container.classList.add("active");
    if(loginBtn) loginBtn.onclick = () => container.classList.remove("active");

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
                    window.location.href = "index.html";
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
});

function githubLogin() {
    const CLIENT_ID = "Ov23liDgL358vg1eGya4"; 
    const redirectUri = window.location.href.split('?')[0]; 
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
}
