//ĐĂNG NHẬP
const USERS_KEY = 'hrm_users_v1';
const SESSION_KEY = 'hrm_session_v1';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}
function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// login / register
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const appSection = document.getElementById('app-section');

function showLogin() {
  loginBox.classList.remove('hidden');
  registerBox.classList.add('hidden');
  appSection.classList.add('hidden');
}
function showRegister() {
  loginBox.classList.add('hidden');
  registerBox.classList.remove('hidden');
}
function showApp() {
  loginBox.classList.add('hidden');
  registerBox.classList.add('hidden');
  appSection.classList.remove('hidden');
}

document.getElementById('show-register').onclick = showRegister;
document.getElementById('show-login').onclick = showLogin;

function hashPassword(pwd) {
  return btoa('hrm_' + pwd);
}

//  đăng ký
document.getElementById('btnRegister').onclick = () => {
  const u = document.getElementById('reg-username').value.trim();
  const p = document.getElementById('reg-password').value.trim();
  const c = document.getElementById('reg-confirm').value.trim();

  if (!u || !p || !c) return alert('Vui lòng nhập đủ thông tin!');
  if (p !== c) return alert('Mật khẩu xác nhận không khớp!');
  const users = getUsers();
  if (users.find(x => x.username === u)) return alert('Tên đăng nhập đã tồn tại!');

  users.push({ username: u, password: hashPassword(p) });
  saveUsers(users);
  alert('Đăng ký thành công! Hãy đăng nhập.');
  showLogin();
};

// đăng nhập
document.getElementById('btnLogin').onclick = () => {
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value.trim();
  const users = getUsers();
  const user = users.find(x => x.username === u && x.password === hashPassword(p));
  if (!user) return alert('Sai tên đăng nhập hoặc mật khẩu!');
  saveSession({ username: u });
  showApp();
  render();
};

// Đăng xuất
document.getElementById('btnLogout').onclick = () => {
  clearSession();
  showLogin();
};

// Kiểm tra session khi mở trang
(function checkLogin() {
  const s = getSession();
  if (s && s.username) showApp();
  else showLogin();
})();


// QUẢN LÝ NHÂN SỰ


const LS_KEY = 'hrm_simple_list_v1';
let list = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const salaryEl = document.getElementById('salary');
const receivedSalaryEl = document.getElementById('receivedSalary');
const btnAdd = document.getElementById('btnAdd');
const tbody = document.querySelector('#tbl tbody');

let editIndex = -1;

function save() {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function render() {
  if (!tbody) return;
  tbody.innerHTML = '';
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:12px;color:#666">Chưa có nhân viên</td></tr>';
    return;
  }
  list.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.email)}</td>
      <td>${Number(p.salary).toLocaleString('vi-VN')}</td>
      <td>${Number(p.receivedSalary).toLocaleString('vi-VN')}</td>
      <td><button class="small-ghost" onclick="edit(${i})">Sửa</button></td>
      <td><button class="small-ghost" onclick="del(${i})">Xóa</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function add() {
  const session = getSession();
  if (!session) {
    alert('Vui lòng đăng nhập trước!');
    return;
  }

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const salary = Number(salaryEl.value);
  const receivedSalary = Number(receivedSalaryEl.value);
  if (!name || !email || !salary || !receivedSalary) {
    alert('Nhập đầy đủ thông tin nhân viên!');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    if (!confirm('Email có vẻ không hợp lệ...!!!')) return;
  }
  if (editIndex > -1) {
  list.push({ name, email, salary, receivedSalary});
  } else {
    list[editIndex] = { name, email, salary, receivedSalary};
    editIndex = -1;
    btnAdd.textContent = 'Thêm';
  }
  save();
  render();
  
  nameEl.value = emailEl.value = salaryEl.value = receivedSalaryEl.value = '';
  nameEl.focus();
}
function edit(i) {
  const p = list[i];
  nameEl.value = p.name;
  emailEl.value = p.email;
  salaryEl.value = p.salary;
  receivedSalaryEl.value = p.receivedSalary;
  editIndex = i;
  btnAdd.textContent = 'Cập nhật';
}

function del(i) {
  const session = getSession();
  if (!session) {
    alert('Vui lòng đăng nhập trước!');
    return;
  }
  if (!confirm('Xóa nhân viên này?')) return;
  list.splice(i, 1);
  save();
  render();
}

window.del = del;
window.edit = edit;
if (btnAdd) btnAdd.addEventListener('click', add);
