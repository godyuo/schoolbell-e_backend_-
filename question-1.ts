// 1, 3, 5, 7, 9 숫자를 각각 한 번씩만 사용하여 만들 수 있는 두개의 숫자(예: 13, 579) 중ㅔ서, 그 곱이 가장 큰 조합을 찾는 스크립트를 작성해 주세요

// 순열구하기
function getPermutations(arr) {
    if (arr.length === 1) return [arr];

    const result = [];

    return arr.reduce((result, current, index) => {
        const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
        const perms = getPermutations(remaining);

        const permutationsWithCurrent = perms.map((perm) => [current, ...perm]);
        return [...result, ...permutationsWithCurrent];
    }, []);
}

function findMaxProduct(numbers) {
    const permutations = getPermutations(numbers);
    let maxProduct = 0;
    let max = { firstNumber: 0, secondNumber: 0 };
    for (const perm of permutations) {
        for (let i = 1; i < perm.length; i++) {
            const first = parseInt(perm.slice(0, i).join(''));
            const second = parseInt(perm.slice(i).join(''));
            const product = first * second;

            if (product > maxProduct) {
                maxProduct = product;
                max = { firstNumber: first, secondNumber: second };
            }
        }
    }

    return {
        firstNumber: max.firstNumber,
        secondNumber: max.secondNumber,
        product: maxProduct,
    };
}

const numbers = [1, 3, 5, 7, 9];
const result = findMaxProduct(numbers);

console.log(`result: ${result.firstNumber}, ${result.secondNumber}`);
