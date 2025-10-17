export const EmployeeDb = {
  key: 'employees_v1',
  getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },
  saveAll(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  },
  renderList(container) {
    const list = this.getAll();
    if (list.length === 0) {
      container.innerHTML = '<p>Chưa có nhân viên nào.</p>';
      return;
    }
    container.innerHTML = `
      <table border="1" style="margin:auto;">
        <tr><th>Tên</th><th>Email</th></tr>
        ${list.map(e => `<tr><td>${e.name}</td><td>${e.email}</td></tr>`).join('')}
      </table>
    `;
  },
  add(emp) {
    const list = this.getAll();
    list.push(emp);
    this.saveAll(list);
  }
};
