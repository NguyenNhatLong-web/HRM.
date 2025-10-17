import { EmployeeDb } from './employeeDbModule.js';

export const EditEmployee = {
  edit(index) {
    const list = EmployeeDb.getAll();
    const emp = list[index];
    const name = prompt('Tên mới:', emp.name);
    const email = prompt('Email mới:', emp.email);
    const dept = prompt('Phòng ban mới:', emp.dept);
    EmployeeDb.update(index, { name, email, dept });
    location.reload();
  }
};

window.editEmp = (i) => EditEmployee.edit(i);
