window.addEventListener("DOMContentLoaded", async () => {
  // Kiểm tra xác thực
  const user = AuthModule.checkSession();
  const content = document.getElementById("content");

  if (!user) {
    AuthModule.renderLogin(content);
    return;
  }

  // Giao diện chính
  renderDashboard();

  function renderDashboard() {
    content.innerHTML = `
      <p>Xin chào, <b>${user.username}</b>!</p>
      <button id="logoutBtn">Đăng xuất</button>
      <h2>Chức năng</h2>
      <ul>
        <li><button id="btnAddEmp">Thêm nhân viên</button></li>
        <li><button id="btnSearchEmp">Tìm kiếm nhân viên</button></li>
        <li><button id="btnSalary">Xem bảng lương</button></li>
        <li><button id="btnDept">Phòng ban</button></li>
        <li><button id="btnPosition">Vị trí</button></li>
      </ul>
      <div id="moduleView"></div>
    `;

    document.getElementById("logoutBtn").onclick = AuthModule.logout;
    document.getElementById("btnAddEmp").onclick = () => AddEmployeeModule.render();
    document.getElementById("btnSearchEmp").onclick = () => SearchEmployeeModule.render();
    document.getElementById("btnSalary").onclick = () => SalaryModule.render();
    document.getElementById("btnDept").onclick = () => DepartmentModule.render();
    document.getElementById("btnPosition").onclick = () => PositionModule.render();
  }
});
