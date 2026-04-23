document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // أزرار التبديل بين واجهة الدخول والتسجيل
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

    // --- الجزء الأول: حفظ البيانات (Sign Up) ---
    // --- حفظ البيانات (Sign Up) ---
    const signUpForm = document.getElementById('signUpForm');
    if(signUpForm) {
        signUpForm.onsubmit = (e) => {
            e.preventDefault();
            localStorage.setItem('user_email', document.getElementById('reg-email').value);
            localStorage.setItem('user_pass', document.getElementById('reg-pass').value);
            localStorage.setItem('user_name', document.getElementById('reg-name').value);
            alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
            container.classList.remove("active");
            
            showToast("تم إنشاء الحساب بنجاح!", () => {
                container.classList.remove("active");
            });
        };
    }

    // --- الجزء الثاني: التحقق فقط (Sign In) ---
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
                alert("بيانات صحيحة! جاري التحويل...");
                window.location.href = "https://ahmedmimo323.github.io/sana/";
                showToast("بيانات صحيحة! جاري التحويل...", () => {
                    window.location.href = "https://ahmedmimo323.github.io/sana/";
                });
            } else {
                alert("خطأ! البيانات غير مطابقة أو لم تقم بإنشاء حساب بعد.");
                showToast("خطأ! البيانات غير مطابقة.");
            }
        };
    }
@@ -54,61 +73,52 @@
        };
    });

    // --- منطق استقبال العودة من GitHub ---
    // استقبال عودة GitHub
    const urlParams = new URLSearchParams(window.location.search);
    const githubCode = urlParams.get('code');

    if (githubCode) {
        // تنظيف الرابط للحفاظ على المظهر الاحترافي
        window.history.replaceState({}, document.title, window.location.pathname);
        console.log("GitHub Auth Code Received:", githubCode);
        
        localStorage.setItem('isLoggedIn', 'true');
        alert("أهلاً بك! تم تسجيل الدخول عبر GitHub بنجاح.");
        window.location.href = "https://ahmedmimo323.github.io/sana/";
        showToast("تم تسجيل الدخول عبر GitHub!", () => {
            window.location.href = "https://ahmedmimo323.github.io/sana/";
        });
    }
});

/** وظيفة دخول جوجل **/
// وظيفة دخول جوجل (خارج النطاق لتكون عالمية)
function handleCredentialResponse(response) {
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    const payload = JSON.parse(window.atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    localStorage.setItem('user_name', payload.name);
    localStorage.setItem('isLoggedIn', 'true');
    alert("أهلاً بك يا " + payload.name + "! تم الدخول بواسطة Google.");
    window.location.href = "https://ahmedmimo323.github.io/sana/";
}
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = "مرحباً بك! تم الدخول بواسطة Google";
    document.body.appendChild(toast);

/** وظيفة دخول فيسبوك **/
window.fbAsyncInit = function() {
    FB.init({
        appId      : '976294014925847', 
        cookie     : true,
        xfbml      : true,
        version    : 'v18.0'
    });
};
    setTimeout(() => {
        window.location.href = "https://ahmedmimo323.github.io/sana/";
    }, 2000);
}

// وظيفة فيسبوك
function fbLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name,email'}, function(userData) {
            FB.api('/me', {fields: 'name'}, function(userData) {
                localStorage.setItem('user_name', userData.name);
                localStorage.setItem('isLoggedIn', 'true');
                alert("أهلاً بك يا " + userData.name + "! تم الدخول بواسطة Facebook.");
                window.location.href = "https://ahmedmimo323.github.io/sana/";
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

/** وظيفة دخول GitHub (جديدة) **/
function githubLogin() {
    const CLIENT_ID = "Ov23liDgL358vg1eGya4"; 
    // الرابط الذي سيعود إليه المستخدم (نفس صفحة الدخول الحالية)
    const redirectUri = window.location.href.split('?')[0]; 
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubUrl;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
}
