function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const button = document.querySelector('.btn-primary');
button.addEventListener('click', createEmployee);

// TODO
// Add event listener to delete button
document.getElementById('dataTable').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const id = event.target.closest('tr').querySelector('td:first-child').textContent;
    deleteEmployee(id);
  }
});



function createEmployee() {
  //event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  const data = { id, name };
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      console.log(data);
      throw new Error('Failed to create employee');
    }
  })
  .then(data => {
    // Handle successful response data if needed
    console.log(data);
    fetchEmployees(); // Call fetchEmployees
  })
  .catch(error => {
    console.error(error);
  });
}

// TODO
function deleteEmployee(id) {
  // Send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  // Call fetchEmployees
  .then(fetchEmployees)
  .catch(error => console.error(error));
}

fetchEmployees();
