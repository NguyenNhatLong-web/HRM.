// modules/employeeDbModule.js
const EmployeeDbModule = (() => {
  const LS_KEY = 'hrm_simple_list_v1';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  function addEmployee(name, email) {
    const list = getAll();
    const employee = { id: Date.now(), name, email, createdAt: new Date().toISOString() };
    list.push(employee);
    save(list);
    return employee;
  }

  function deleteEmployee(index) {
    const list = getAll();
    list.splice(index, 1);
    save(list);
  }

  return { getAll, addEmployee, deleteEmployee };
})();
