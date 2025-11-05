import { EmployeeDb } from './employeeDbModule.js';

export const AddEmployee = {
  renderForm(container) {
    container.innerHTML = `
      <h3>Thêm Nhân viên</h3>
      <input id="empName" placeholder="Tên">
      <input id="empEmail" placeholder="Email">
      <button id="btnAddEmp">Thêm</button>
    `;

    document.getElementById('btnAddEmp').addEventListener('click', () => {
      const name = document.getElementById('empName').value.trim();
      const email = document.getElementById('empEmail').value.trim();

      if (!name || !email) {
        alert('Nhập đầy đủ thông tin!');
        return;
      }

      EmployeeDb.add({ name, email });
      alert('Đã thêm nhân viên!');
      location.reload();
    });
  }
};
