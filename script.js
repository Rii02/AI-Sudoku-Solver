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

// Ambil nilai dari grid dan ubah jadi array 2D
function getGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = cells[i * 9 + j].value;
      row.push(val === '' ? 0 : parseInt(val));
    }
    grid.push(row);
  }
  return grid;
}

// Tampilkan hasil ke input
function setGrid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = grid[i][j] === 0 ? '' : grid[i][j];
    }
  }
}

// Cek apakah angka valid di posisi (row, col)
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

// Algoritma backtracking untuk menyelesaikan sudoku
function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0; // backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Fungsi solve saat tombol diklik
function solveSudoku() {
  let grid = getGrid();
  if (solve(grid)) {
    setGrid(grid);
    alert("Berhasil diselesaikan oleh AI!");
  } else {
    alert("Puzzle ini tidak bisa diselesaikan");
  }
}

// Reset semua input
function resetGrid() {
  cells.forEach(cell => cell.value = '');
}