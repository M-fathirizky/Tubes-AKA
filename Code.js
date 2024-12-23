function searchTravel() {
    const travelCount = parseInt(document.getElementById("travelCount").value);
    const resultDiv = document.getElementById("result");
    if (isNaN(travelCount) || travelCount <= 0) {
        resultDiv.innerHTML = "<p>Masukkan jumlah travel yang valid.</p>";
        return;
    }

    const travels = [];
    for (let i = 0; i < travelCount; i++) {
        travels.push({
            id: i + 1,
            efficiency: Math.floor(Math.random() * 100) + 1, // Random efficiency score
        });
    }

    resultDiv.innerHTML = "<h2>Travel yang ditemukan:</h2>";

    // Iterative sorting
    const iterativeStart = performance.now();
    const iterativeResult = iterativeSort([...travels]);
    const iterativeEnd = performance.now();

    // Recursive sorting
    const recursiveStart = performance.now();
    const recursiveResult = recursiveSort([...travels]);
    const recursiveEnd = performance.now();

    // Display results
    resultDiv.innerHTML += `<h3>Iterative:</h3> ${formatTravels(iterativeResult)} <p>Waktu eksekusi: ${(iterativeEnd - iterativeStart).toFixed(4)} ms</p>`;
    resultDiv.innerHTML += `<h3>Recursive:</h3> ${formatTravels(recursiveResult)} <p>Waktu eksekusi: ${(recursiveEnd - recursiveStart).toFixed(4)} ms</p>`;
}

// Iterative sorting (Bubble Sort)
function iterativeSort(travels) {
    const len = travels.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (travels[j].efficiency > travels[j + 1].efficiency) {
                [travels[j], travels[j + 1]] = [travels[j + 1], travels[j]];
            }
        }
    }
    return travels;
}

// Recursive sorting (Merge Sort)
function recursiveSort(travels) {
    if (travels.length <= 1) return travels;

    const mid = Math.floor(travels.length / 2);
    const left = recursiveSort(travels.slice(0, mid));
    const right = recursiveSort(travels.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let l = 0, r = 0;

    while (l < left.length && r < right.length) {
        if (left[l].efficiency < right[r].efficiency) {
            result.push(left[l++]);
        } else {
            result.push(right[r++]);
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}

// Format travels for display
function formatTravels(travels) {
    return travels
        .map(t => `Travel ${t.id}: Efisiensi ${t.efficiency}`)
        .join("<br>");
}
