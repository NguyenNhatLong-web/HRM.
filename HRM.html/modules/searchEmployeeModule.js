import { EmployeeDb } from './employeeDbModule.js';

export const SearchEmployee = {
  renderSearch(container) {
    container.innerHTML += `
      <input id="searchBox" placeholder="Tìm nhân viên...">
      <button id="btnSearch">Tìm</button>
      <div id="searchResult"></div>
    `;
    document.getElementById('btnSearch').onclick = () => {
      const q = searchBox.value.toLowerCase();
      const list = EmployeeDb.getAll().filter(e =>
        e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
      );
      document.getElementById('searchResult').innerHTML =
        list.map(e => `<p>${e.name} - ${e.email}</p>`).join('') || '<p>Không tìm thấy.</p>';
    };
  }
};
