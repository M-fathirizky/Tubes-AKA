function fibonacciIterative(n, criteria) {
    let a = 0, b = 1, temp;
    for (let i = 1; i < n; i++) {
        temp = a + b;
        a = b;
        b = temp;

        // Simulasi operasi tambahan berdasarkan kriteria
        if (criteria === 'price') {
            // Simulasi delay untuk harga termurah
            for (let j = 0; j < 1e6; j++) {} // Operasi dummy
        } else if (criteria === 'time') {
            // Simulasi operasi lebih sederhana untuk efisiensi waktu
            for (let j = 0; j < 1e5; j++) {} // Operasi dummy
        } else if (criteria === 'comfort') {
            // Simulasi operasi tambahan untuk kualitas kenyamanan
            for (let j = 0; j < 5e5; j++) {} // Operasi dummy
        }
    }
    return b;
}

document.getElementById('searchButton').addEventListener('click', function() {
    const startTime = performance.now();

    const departure = document.getElementById('departure').value;
    const criteria = document.getElementById('criteria').value;
    const passengers = document.getElementById('passengers').value;
    const fibInput = parseInt(document.getElementById('fibInput').value);

    if (!departure || !passengers || isNaN(fibInput)) {
        alert('Harap lengkapi semua bidang.');
        return;
    }

    let criteriaDescription;
    switch (criteria) {
        case 'price':
            criteriaDescription = 'Prioritas diberikan pada travel dengan harga paling terjangkau.';
            break;
        case 'time':
            criteriaDescription = 'Prioritas diberikan pada travel dengan waktu perjalanan tercepat.';
            break;
        case 'comfort':
            criteriaDescription = 'Prioritas diberikan pada travel dengan kenyamanan tertinggi.';
            break;
    }

    const iterativeStart = performance.now();
    const fibIterative = fibonacciIterative(fibInput);
    const iterativeEnd = performance.now();
    const iterativeTime = (iterativeEnd - iterativeStart).toFixed(2);

    const recursiveStart = performance.now();
    const fibRecursive = fibonacciRecursive(fibInput);
    const recursiveEnd = performance.now();
    const recursiveTime = (recursiveEnd - recursiveStart).toFixed(2);

    const endTime = performance.now();
    const runningTime = (endTime - startTime).toFixed(2);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Hasil Pencarian:</h3>
        <p><strong>Tanggal Keberangkatan:</strong> ${departure}</p>
        <p><strong>Kriteria:</strong> ${criteria === 'price' ? 'Harga Termurah' : criteria === 'time' ? 'Efisiensi Waktu' : 'Kualitas Kenyamanan'}</p>
        <p>${criteriaDescription}</p>
        <p><strong>Jumlah Penumpang:</strong> ${passengers}</p>
        <p>Travel terbaik berdasarkan kriteria Anda telah ditemukan.</p>
        <p><strong>Waktu Pencarian:</strong> ${runningTime} ms</p>
        <h4>Perbandingan Iteratif dan Rekursif:</h4>
        <p><strong>Fibonacci Iteratif (n=${fibInput}):</strong> ${fibIterative} (Waktu: ${iterativeTime} ms)</p>
        <p><strong>Fibonacci Rekursif (n=${fibInput}):</strong> ${fibRecursive} (Waktu: ${recursiveTime} ms)</p>
    `;
});
