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
    const recursiveResult = recursiveBubbleSort([...travels], travels.length);
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

// Recursive sorting (Bubble Sort)
function recursiveBubbleSort(travels, n) {
    if (n === 1) return travels; // Base case

    for (let i = 0; i < n - 1; i++) {
        if (travels[i].efficiency > travels[i + 1].efficiency) {
            [travels[i], travels[i + 1]] = [travels[i + 1], travels[i]];
        }
    }

    return recursiveBubbleSort(travels, n - 1); // Recursive call
}

// Format travels for display
function formatTravels(travels) {
    return travels
        .map(t => `Travel ${t.id}: Efisiensi ${t.efficiency}`)
        .join("<br>");
}
