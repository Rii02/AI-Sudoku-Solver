const gridContainer = document.getElementById('sudokuGrid');
const cells = [];

// Buat grid input 9x9
for (let i = 0; i < 81; i++) {
  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'cell';

  const row = Math.floor(i / 9);
  const col = i % 9;

  if ((col + 1) % 3 === 0 && col !== 8) {
    input.classList.add('right-bold');
  }

  if ((row + 1) % 3 === 0 && row !== 8) {
    input.classList.add('bottom-bold');
  }

  input.min = 1;
  input.max = 9;
  input.value = '';
  cells.push(input);
  gridContainer.appendChild(input);
}

function getGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = cells[i * 9 + j].value;
      row.push(val === '' ? 0 : parseInt(val, 10));
    }
    grid.push(row);
  }
  return grid;
}

function setGrid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = grid[i][j] === 0 ? '' : grid[i][j];
    }
  }
}

function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  let startRow = row - row % 3;
  let startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function validateGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== 0) {
        grid[row][col] = 0;
        if (!isValid(grid, row, col, num)) {
          grid[row][col] = num;
          return false;
        }
        grid[row][col] = num;
      }
    }
  }
  return true;
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  let grid = getGrid();

  if (!validateGrid(grid)) {
    alert("Input invalid: ada angka duplikat di baris/kolom/box 🎲❌");
    return;
  }

  try {
    if (solve(grid)) {
      setGrid(grid);
      alert("Berhasil diselesaikan oleh AI! ✅");
    } else {
      alert("Puzzle ini tidak bisa diselesaikan 😢");
    }
  } catch (e) {
    console.error(e);
    alert("Ups, terjadi error saat menyelesaikan puzzle. Cek input dan coba lagi.");
  }
}

function resetGrid() {
  cells.forEach(cell => cell.value = '');
}
