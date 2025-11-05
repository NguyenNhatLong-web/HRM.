import { EmployeeDb } from './employeeDbModule.js';

export const DeleteEmployee = {
  del(index) {
    if (confirm('Xoá nhân viên này?')) {
      EmployeeDb.delete(index);
      location.reload();
    }
  }
};

window.delEmp = (i) => DeleteEmployee.del(i);
