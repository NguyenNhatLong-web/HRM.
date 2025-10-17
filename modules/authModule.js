export const Auth = {
  async checkLogin() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  },

  async renderLoginForm() {
    return `
      <div class="form-box">
        <input id="loginUser" placeholder="Tên đăng nhập"><br>
        <input id="loginPass" type="password" placeholder="Mật khẩu"><br>
        <button id="btnLogin">Đăng nhập</button>
      </div>
    `;
  },

  async login(username, password) {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    alert('Sai thông tin đăng nhập!');
    return false;
  },

  logout() {
    localStorage.removeItem('user');
  }
};
