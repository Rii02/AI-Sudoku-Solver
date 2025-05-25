const gridContainer = document.getElementById('sudokuGrid');
const cells = [];

// Buat grid input 9x9
for (let i = 0; i < 81; i++) {
  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'cell';
  input.min = 1;
  input.max = 9;
  input.value = '';
  cells.push(input);
  gridContainer.appendChild(input);
}

