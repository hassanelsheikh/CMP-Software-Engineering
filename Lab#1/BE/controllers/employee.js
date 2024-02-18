const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; //req.params to get the employee ID from the URL parameter
  // Find index of employee with given id
  const index = employee.findIndex(emp => emp.id === id);

  if (index !== -1) {
    // Remove employee from array
    employee.splice(index, 1);
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } else {
    // If employee not found
    res.status(404).json({ success: false, message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ success: false, message: 'Both ID and name are required' });
  }
  // Add new employee to array or database
  employee.push({ id, name }); // Assuming 'employee' is a global array
  res.status(201).json({ success: true, data: { id, name } });
};