type puzzleSide = 'in' | 'out' | 'flat';

const puzzleSideArr = ['in', 'out', 'flat'];

type puzzlePiece = {
  up: puzzleSide,
  down: puzzleSide,
  left: puzzleSide,
  right: puzzleSide,
  pos: coordinate,
};

type puzzleGrid = puzzlePiece[][];

type coordinate = {
  x: number,
  y: number,
};

const counterSide = {
  'in': 'out',
  'out': 'in',
  'flat': 'flat',
};

let grid: puzzleGrid;

const queue: coordinate[] = [];

const generatePuzzle = (end: coordinate) => {
  grid = new Array(end.x).fill(undefined).map(() => new Array(end.y).fill(undefined));

  grid[0][0] = {
    up: 'flat',
    left: 'flat',
    down: puzzleSideArr[Math.floor(Math.random() * puzzleSideArr.length)] as puzzleSide,
    right: puzzleSideArr[Math.floor(Math.random() * puzzleSideArr.length)] as puzzleSide,
    pos: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    } as coordinate,
  }

  queue.push({x: 1, y: 0});
  queue.push({x: 0, y: 1});

  while (queue.length > 0) {
    const current = queue.shift();
    if (current && current.x + 1 <= end.x && current.y + 1 <= end.y) {
      bfs(current, end);
    }
  }

  return grid;
}
const bfs = (current: coordinate, end: coordinate) => {
  if (current.x < 0 || current.y < 0 || current.x > end.x || current.y > end.y) {
    return;
  }

  let up, down, left, right;
  if (current.x === 0) {
    up = 'flat' as puzzleSide;
  } else {
    up = counterSide[grid[current.x - 1][current.y].down]
  }
  if (current.y === 0) {
    left = 'flat' as puzzleSide;
  } else {
    left = counterSide[grid[current.x][current.y - 1].right]
  }

  if (current.x === end.x) {
    down = 'flat' as puzzleSide;
  } else {
    down = puzzleSideArr[Math.floor(Math.random() * puzzleSideArr.length)];
  }

  if (current.y === end.y) {
    right = 'flat' as puzzleSide;
  } else {
    right = puzzleSideArr[Math.floor(Math.random() * puzzleSideArr.length)];
  }
  
  const newPiece = {
    up,
    down,
    left,
    right,
    pos: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    } as coordinate,
  } as puzzlePiece;

  grid[current.x][current.y] = newPiece;
  queue.push({x: current.x + 1, y: current.y});
  queue.push({x: current.x, y: current.y + 1});
}

export default generatePuzzle;
