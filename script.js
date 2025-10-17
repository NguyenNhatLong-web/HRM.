const LS_KEY = 'hrm_simple_list_v1';
let list = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const btnAdd = document.getElementById('btnAdd');
const tbody = document.querySelector('#tbl tbody');

function save(){
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function render(){
  if(!tbody) return;
  tbody.innerHTML = '';
  if(list.length === 0){
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:12px;color:#666">Chưa có nhân viên</td></tr>';
    return;
  }
  list.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.email)}</td>
      <td><button class="small-ghost" onclick="del(${i})">Xóa</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){
  return String(s||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

function add(){
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  if(!name || !email){
    alert('Nhập cả tên và email nhé!');
    return;
  }
  if(!/^\S+@\S+\.\S+$/.test(email)){
    if(!confirm('Email có vẻ không hợp lệ. Vẫn tiếp tục?')) return;
  }
  list.push({ name, email, createdAt: new Date().toISOString() });
  save();
  render();
  nameEl.value = emailEl.value = '';
  nameEl.focus();
}

function del(i){
  if(!confirm('Xóa nhân viên này?')) return;
  list.splice(i,1);
  save();
  render();
}

window.del = del;
btnAdd.addEventListener('click', add);
render();

emailEl.addEventListener('keyup', e => { if(e.key === 'Enter') add(); });
nameEl.addEventListener('keyup', e => { if(e.key === 'Enter') emailEl.focus(); });
