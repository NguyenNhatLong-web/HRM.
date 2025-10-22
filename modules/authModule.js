const AuthModule = (() => {
  const USER_KEY = "hrm_users";
  const SESSION_KEY = "hrm_session";

  // Hàm hash password đơn giản
  function hashPassword(password) {
    const salt = "hrm_salt_123";
    return btoa(password + salt);
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem(USER_KEY) || "[]");
  }

  function saveUsers(users) {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }

  // Đăng ký
  function register(username, password, confirm) {
    if (!username.trim() || password.length < 6 || password.includes(" "))
      return alert("Tên hoặc mật khẩu không hợp lệ!");
    if (password !== confirm) return alert("Mật khẩu xác nhận không khớp!");
    const users = getUsers();
    if (users.find(u => u.username === username)) return alert("Username đã tồn tại!");
    users.push({ username, password: hashPassword(password) });
    saveUsers(users);
    alert("Đăng ký thành công!");
  }

  // Đăng nhập
  async function login(username, password) {
    const users = getUsers();
    await new Promise(res => setTimeout(res, 1000)); // Giả lập delay
    const user = users.find(u => u.username === username && u.password === hashPassword(password));
    if (!user) return alert("Sai tên hoặc mật khẩu!");

    const token = { username, expiry: Date.now() + 3600000 };
    localStorage.setItem(SESSION_KEY, JSON.stringify(token));
    location.reload();
  }

  // Kiểm tra session
  function checkSession() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!session || Date.now() > session.expiry) return null;
    return session;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    location.reload();
  }

  // Giao diện login/register
  function renderLogin(container) {
    container.innerHTML = `
      <h2>Đăng nhập hệ thống</h2>
      <input id="loginUser" placeholder="Tên đăng nhập"><br>
      <input id="loginPass" type="password" placeholder="Mật khẩu"><br>
      <button id="btnLogin">Đăng nhập</button>
      <hr>
      <h3>Chưa có tài khoản?</h3>
      <input id="regUser" placeholder="Tên đăng nhập"><br>
      <input id="regPass" type="password" placeholder="Mật khẩu"><br>
      <input id="regConfirm" type="password" placeholder="Xác nhận mật khẩu"><br>
      <button id="btnRegister">Đăng ký</button>
    `;
    document.getElementById("btnLogin").onclick = () =>
      login(document.getElementById("loginUser").value, document.getElementById("loginPass").value);
    document.getElementById("btnRegister").onclick = () =>
      register(
        document.getElementById("regUser").value,
        document.getElementById("regPass").value,
        document.getElementById("regConfirm").value
      );
  }

  return { checkSession, logout, renderLogin };
})();
