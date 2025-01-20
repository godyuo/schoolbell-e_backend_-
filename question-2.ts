// 주어진 그림에서 Island의 개수를 찾는 스크립트를 작성해 주세요.
// 그림에서 가로, 세로, 대각선으로 연결되어 있는 Land들을 모두 같은 하나의 Island로 간주합니다.
// 먼저 주어진 그림을 기반으로 데이터를 적절한 자료 구조로 변환한 뒤, 해당 데이터를 활용해 문제를 해결해 주시면 됩니다.

// 그림은 편의상 2차원 배열의 자료구조로 표현한다

const grid = [
    ['Land', 'Sea', 'Land', 'Sea', 'Sea'],
    ['Land', 'Sea', 'Sea', 'Sea', 'Sea'],
    ['Land', 'Sea', 'Land', 'Sea', 'Land'],
    ['Land', 'Sea', 'Sea', 'Land', 'Sea'],
];

function solution(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    const area = Array.from(Array(rows), () => Array(cols).fill(false));
    const direction = [
        [-1, -1], //좌상
        [-1, 0], //상
        [-1, 1], //우상
        [0, -1], //좌
        [0, 1], //우
        [1, -1], //좌하
        [1, 0], //하
        [1, 1], //우하
    ];

    function findArea(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols) return;
        if (area[row][col] || grid[row][col] === 'Sea') return;

        area[row][col] = true;

        // 모든방향 연결되있는 Land 찾기
        for (const [x, y] of direction) {
            findArea(row + x, col + y);
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!area[i][j] && grid[i][j] === 'Land') {
                findArea(i, j);
                islandCount++;
            }
        }
    }
    return islandCount;
}

const result = solution(grid);
console.log(`result: ${result}`);
