const travels = Array.from({ length: 50 }, (_, i) => ({
    brand: `Kendaraan ${i + 1}`,
    type: i % 2 === 0 ? 'Minibus' : 'Bus',
    capacity: 10 + (i % 10) * 5,
    speed: 50 + (i % 5) * 10,
    driver: `Pak Sopir ${i + 1}`
}));

const routes = {
    'Bandung-Cikarang': 110,
    'Bandung-Jakarta': 150,
    'Jakarta-Cikarang': 40,
    'Bandung-Tangerang': 180,
    'Surabaya-Malang': 100,
    'Yogyakarta-Semarang': 120,
    'Solo-Surabaya': 260,
    'Jakarta-Bogor': 60,
    'Bandung-Semarang': 430,
    'Surabaya-Yogyakarta': 330,
    'Malang-Bandung': 820
};

function displayTravels() {
    const tableBody = document.getElementById('travelTableBody');
    tableBody.innerHTML = '';
    travels.forEach((travel, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${travel.brand}</td>
                <td>${travel.type}</td>
                <td>${travel.capacity}</td>
                <td>${travel.speed} km/jam</td>
                <td>${travel.driver}</td>
            </tr>
        `;
    });
}

function findFastestTravelIterative(route, passengers) {
    const distance = routes[route];
    let fastest = null;
    const steps = [];

    for (let travel of travels) {
        if (travel.capacity >= passengers) {
            const time = distance / travel.speed;
            steps.push(`Cek kendaraan ${travel.brand}: Waktu tempuh = ${time.toFixed(2)} jam`);
            if (!fastest || time < fastest.time) {
                fastest = { travel, time };
                steps.push(`-> Kendaraan ${travel.brand} menjadi tercepat sementara.`);
            }
        }
    }
    return { fastest, distance, steps };
}

async function displayStepsIterative(steps) {
    const iterativeStepsDiv = document.getElementById('steps-iterative');
    iterativeStepsDiv.innerHTML = '<h3>Langkah Iteratif</h3>';
    for (const step of steps) {
        const stepElement = document.createElement('p');
        stepElement.textContent = step;
        iterativeStepsDiv.appendChild(stepElement);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

async function displayStepsRecursive(steps) {
    const recursiveStepsDiv = document.getElementById('steps-recursive');
    recursiveStepsDiv.innerHTML = '<h3>Langkah Rekursif</h3>';
    for (const step of steps) {
        const stepElement = document.createElement('p');
        stepElement.textContent = step;
        recursiveStepsDiv.appendChild(stepElement);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

function findFastestTravelRecursive(route, passengers, index = 0, fastest = null, steps = []) {
    if (index >= travels.length) return { fastest, steps };

    const travel = travels[index];
    const distance = routes[route];

    if (travel.capacity >= passengers) {
        const time = distance / travel.speed;
        steps.push(`Cek kendaraan ${travel.brand}: Waktu tempuh = ${time.toFixed(2)} jam`);
        if (!fastest || time < fastest.time) {
            fastest = { travel, time };
            steps.push(`-> Kendaraan ${travel.brand} menjadi tercepat sementara.`);
        }
    }

    return findFastestTravelRecursive(route, passengers, index + 1, fastest, steps);
}

function formatTime(time) {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    const seconds = Math.floor((((time - hours) * 60) - minutes) * 60);

    if (hours > 0) {
        return `${hours} jam ${minutes} menit ${seconds} detik`;
    } else if (minutes > 0) {
        return `${minutes} menit ${seconds} detik`;
    } else {
        return `${seconds} detik`;
    }
}

async function searchTravel() {
    const route = document.getElementById('route').value;
    const passengers = parseInt(document.getElementById('passengers').value);

    const startIterative = performance.now();
    const { fastest: resultIterative, distance, steps: stepsIterative } = findFastestTravelIterative(route, passengers);
    const endIterative = performance.now();

    if (!resultIterative) {
        alert(`Tidak ada kendaraan yang tersedia untuk ${passengers} penumpang.`);
        return;
    }

    const startRecursive = performance.now();
    const { fastest: resultRecursive, steps: stepsRecursive } = findFastestTravelRecursive(route, passengers);
    const endRecursive = performance.now();

    document.getElementById('result').innerHTML = `
        <h3>Hasil Pencarian</h3>
        <p><strong>Metode Iteratif:</strong></p>
        <p>Kendaraan: ${resultIterative.travel.brand} (${resultIterative.travel.type})</p>
        <p>Kapasitas: ${resultIterative.travel.capacity} penumpang</p>
        <p>Nama Sopir: ${resultIterative.travel.driver}</p>
        <p>Jarak Tempuh: ${distance} km</p>
        <p>Waktu Tempuh: ${formatTime(resultIterative.time)}</p>
        <p>Waktu Proses: ${(endIterative - startIterative).toFixed(4)} ms</p>
        <p><strong>Metode Rekursif:</strong></p>
        <p>Kendaraan: ${resultRecursive.travel.brand} (${resultRecursive.travel.type})</p>
        <p>Kapasitas: ${resultRecursive.travel.capacity} penumpang</p>
        <p>Nama Sopir: ${resultRecursive.travel.driver}</p>
        <p>Jarak Tempuh: ${routes[route]} km</p>
        <p>Waktu Tempuh: ${formatTime(resultRecursive.time)}</p>
        <p>Waktu Proses: ${(endRecursive - startRecursive).toFixed(4)} ms</p>
    `;

    await displayStepsIterative(stepsIterative);
    await displayStepsRecursive(stepsRecursive);
}

window.onload = () => {
    displayTravels();
};
