const navItems = document.querySelectorAll('[data-view]');
const views = document.querySelectorAll('.view');
const toast = document.querySelector('.toast');
const sidebar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-button');

function openView(viewName) {
  views.forEach((view) => view.classList.toggle('active', view.id === viewName));
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  sidebar?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach((item) => item.addEventListener('click', () => openView(item.dataset.view)));
menuButton?.addEventListener('click', () => sidebar?.classList.toggle('open'));

// Toast helper
function showToast(message, duration = 3000) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

document.querySelectorAll('.approve').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Reviewed';
    button.style.background = '#e7faf4';
    button.style.color = '#168e7d';
    button.disabled = true;
    showToast('Demo only — approval actions will be secured in Phase 5.');
  });
});

document.querySelectorAll('.disabled').forEach((button) => button.addEventListener('click', () => {
  showToast('This secure module will be built after this preview is approved.');
}));

// Add Employee Modal & Form logic
const employeeModal = document.querySelector('#employee-modal');
const openEmployeeModal = () => employeeModal?.classList.add('show');
const closeEmployeeModal = () => employeeModal?.classList.remove('show');

document.querySelector('#open-add-employee')?.addEventListener('click', openEmployeeModal);
document.querySelector('.close-modal')?.addEventListener('click', closeEmployeeModal);
document.querySelector('.cancel-button')?.addEventListener('click', closeEmployeeModal);
employeeModal?.addEventListener('click', (event) => { if (event.target === employeeModal) closeEmployeeModal(); });

const employeeForm = document.querySelector('#employee-form');
employeeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = employeeForm.querySelectorAll('input, select');
  const firstName = inputs[0]?.value || 'New';
  const lastName = inputs[1]?.value || 'Employee';
  const email = inputs[2]?.value || 'employee@dayflow.co';
  const dept = inputs[3]?.value || 'Engineering';
  
  const initials = (firstName[0] + (lastName[0] || '')).toUpperCase();
  const tableBody = document.querySelector('#employee-table-body');
  
  if (tableBody) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" aria-label="Select ${firstName} ${lastName}" /></td>
      <td><div class="employee-cell"><span class="avatar avatar-emma">${initials}</span><span><strong>${firstName} ${lastName}</strong><small>${email}</small></span></div></td>
      <td><span class="department-pill eng-pill">${dept}</span></td>
      <td>Today</td>
      <td><span class="status success">● Active</span></td>
      <td><button class="row-menu">•••</button></td>
    `;
    tableBody.prepend(tr);
  }
  
  employeeForm.reset();
  closeEmployeeModal();
  showToast(`Added ${firstName} ${lastName} as demo employee.`);
});

// Employee directory search
document.querySelector('#employee-search')?.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('#employee-table-body tr').forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

// Topbar search input redirect/search
const topbarSearch = document.querySelector('.topbar input[type="search"]');
topbarSearch?.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  if (query.trim().length > 0) {
    openView('employees');
    const empSearch = document.querySelector('#employee-search');
    if (empSearch) {
      empSearch.value = query;
      empSearch.dispatchEvent(new Event('input'));
    }
  }
});

// Attendance Check In / Check Out action
const attAction = document.querySelector('#attendance-action');
if (attAction) {
  let isCheckedIn = true;
  attAction.addEventListener('click', () => {
    isCheckedIn = !isCheckedIn;
    if (isCheckedIn) {
      attAction.textContent = 'Check out →';
      attAction.style.opacity = '1';
      showToast('Checked in successfully!');
    } else {
      attAction.textContent = 'Checked out ✓';
      attAction.style.opacity = '.75';
      showToast('Checked out for the day.');
    }
  });
}

// Leave Modal & Form logic
const leaveModal = document.querySelector('#leave-modal');
const openLeaveModal = () => leaveModal?.classList.add('show');
const closeLeaveModal = () => leaveModal?.classList.remove('show');

document.querySelector('#open-leave-modal')?.addEventListener('click', openLeaveModal);
document.querySelector('.close-leave-modal')?.addEventListener('click', closeLeaveModal);
document.querySelector('.cancel-leave-button')?.addEventListener('click', closeLeaveModal);
leaveModal?.addEventListener('click', (event) => { if (event.target === leaveModal) closeLeaveModal(); });

const leaveForm = document.querySelector('#leave-form');
leaveForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const select = leaveForm.querySelector('select');
  const inputs = leaveForm.querySelectorAll('input');
  const leaveType = select?.value || 'Paid time off';
  const startDate = inputs[0]?.value || 'Today';
  const endDate = inputs[1]?.value || 'Today';
  
  const leaveTableBody = document.querySelector('.leave-table tbody');
  if (leaveTableBody) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="employee-cell"><span class="avatar avatar-maya">MA</span><span><strong>Maya Allen</strong><small>People Operations</small></span></div></td>
      <td><span class="type-pill type-paid">${leaveType}</span></td>
      <td>${startDate} — ${endDate}</td>
      <td>1 day</td>
      <td><span class="status pending">● Pending</span></td>
      <td><button class="review-leave">Review</button></td>
    `;
    leaveTableBody.prepend(tr);
    
    tr.querySelector('.review-leave')?.addEventListener('click', (e) => {
      e.target.textContent = 'Reviewed';
      e.target.disabled = true;
      showToast('Leave request marked as reviewed.');
    });
  }
  
  leaveForm.reset();
  closeLeaveModal();
  showToast('Demo leave request submitted successfully!');
});

document.querySelectorAll('.review-leave').forEach((button) => button.addEventListener('click', () => {
  button.textContent = 'Reviewed';
  button.disabled = true;
  showToast('Demo review recorded locally.');
}));

document.querySelector('#run-payroll')?.addEventListener('click', () => {
  showToast('Demo only — payroll processing simulation complete.');
});

document.querySelector('#create-report')?.addEventListener('click', () => {
  showToast('Demo report generation triggered.');
});

document.querySelectorAll('.download-report').forEach((button) => button.addEventListener('click', () => {
  showToast('Downloading demo report...');
}));

document.querySelectorAll('.switch').forEach((switchButton) => switchButton.addEventListener('click', () => {
  switchButton.classList.toggle('on');
}));

document.querySelector('#save-settings')?.addEventListener('click', () => {
  showToast('Workspace settings saved locally!');
});

document.querySelector('#change-password')?.addEventListener('click', () => {
  showToast('Password change dialog simulated.');
});

document.querySelector('#enable-2fa')?.addEventListener('click', () => {
  showToast('Two-factor authentication setup simulated.');
});
