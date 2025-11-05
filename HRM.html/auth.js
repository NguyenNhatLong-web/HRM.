const LS_USERS = 'hrm_users';
const LS_CURRENT_USER = 'hrm_current_user';

let users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
let currentUser = localStorage.getItem(LS_CURRENT_USER);

// Các phần tử DOM
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');

// Nút và input
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnLogout = document.getElementById('btnLogout');

// Chuyển qua lại giữa login/register
document.getElementById('show-register').onclick = () => {
  loginBox.classList.add('hidden');
  registerBox.classList.remove('hidden');
};
document.getElementById('show-login').onclick = () => {
  registerBox.classList.add('hidden');
  loginBox.classList.remove('hidden');
};

// Đăng ký
btnRegister.onclick = () => {
  const u = document.getElementById('reg-username').value.trim();
  const p = document.getElementById('reg-password').value;
  const c = document.getElementById('reg-confirm').value;

  if (!u || !p || !c) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }
  if (p !== c) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }
  if (users.find(x => x.username === u)) {
    alert('Tên đăng nhập đã tồn tại!');
    return;
  }

  users.push({ username: u, password: p });
  localStorage.setItem(LS_USERS, JSON.stringify(users));
  alert('Đăng ký thành công! Hãy đăng nhập.');
  document.getElementById('reg-username').value =
    document.getElementById('reg-password').value =
    document.getElementById('reg-confirm').value = '';
  registerBox.classList.add('hidden');
  loginBox.classList.remove('hidden');
};

// Đăng nhập
btnLogin.onclick = () => {
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value;
  const found = users.find(x => x.username === u && x.password === p);
  if (!found) {
    alert('Sai tên đăng nhập hoặc mật khẩu!');
    return;
  }

  localStorage.setItem(LS_CURRENT_USER, u);
  location.reload();
};

// Đăng xuất
btnLogout.onclick = () => {
  localStorage.removeItem(LS_CURRENT_USER);
  location.reload();
};

// Hiển thị giao diện phù hợp
if (currentUser) {
  authSection.classList.add('hidden');
  appSection.classList.remove('hidden');
} else {
  authSection.classList.remove('hidden');
  appSection.classList.add('hidden');
}
