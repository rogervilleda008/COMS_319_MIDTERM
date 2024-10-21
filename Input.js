let carsData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('./CommonCars.json')
        .then(response => response.json())
        .then(data => {
            carsData = data;
            populateMakeOptions();
        })
        .catch(err => console.log('Error: ' + err));
});

function populateMakeOptions() {
    const makes = [...new Set(carsData.map(car => car.Make))];
    const car1MakeSelect = document.getElementById('car1-make');
    const car2MakeSelect = document.getElementById('car2-make');
    
    makes.forEach(make => {
        const option1 = document.createElement('option');
        option1.value = make;
        option1.text = make;
        car1MakeSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = make;
        option2.text = make;
        car2MakeSelect.appendChild(option2);
    });
}

function loadCarDetails(carNumber) {
    const makeSelect = document.getElementById(`car${carNumber}-make`);
    const modelSelect = document.getElementById(`car${carNumber}-model`);
    const yearSelect = document.getElementById(`car${carNumber}-year`);

    const selectedMake = makeSelect.value;

    const models = [...new Set(carsData.filter(car => car.Make === selectedMake).map(car => car.Model))];
    modelSelect.innerHTML = '';

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.text = model;
        modelSelect.appendChild(option);
    });

    modelSelect.addEventListener('change', function() {
        const selectedModel = modelSelect.value;
        const years = [...new Set(carsData.filter(car => car.Make === selectedMake && car.Model === selectedModel).map(car => car.Year))];
        yearSelect.innerHTML = '';

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            yearSelect.appendChild(option);
        });
    });

    // Trigger change event to load years for the first model in the list
    modelSelect.dispatchEvent(new Event('change'));
}

function compareCars() {
    const car1Make = document.getElementById('car1-make').value;
    const car1Model = document.getElementById('car1-model').value;
    const car1Year = document.getElementById('car1-year').value;

    const car2Make = document.getElementById('car2-make').value;
    const car2Model = document.getElementById('car2-model').value;
    const car2Year = document.getElementById('car2-year').value;

    const car1Details = carsData.find(car => car.Make === car1Make && car.Model === car1Model && car.Year == car1Year);
    const car2Details = carsData.find(car => car.Make === car2Make && car.Model === car2Model && car.Year == car2Year);

    let result = '<h3>Comparison Result</h3>';
    result += '<div class="comparison-container">';

    if (car1Details) {
        result += '<div class="card">';
        result += `<img src="${car1Details.Pic}" class="card-img-top" alt="Car 1 image">`;
        result += '<div class="card-body">';
        result += '<h5 class="card-title">Car 1</h5>';
        result += `<p>Make: ${car1Details.Make}</p>`;
        result += `<p>Model: ${car1Details.Model}</p>`;
        result += `<p>Year: ${car1Details.Year}</p>`;
        result += '</div></div>';
    }

    if (car2Details) {
        result += '<div class="card">';
        result += `<img src="${car2Details.Pic}" class="card-img-top" alt="Car 2 image">`;
        result += '<div class="card-body">';
        result += '<h5 class="card-title">Car 2</h5>';
        result += `<p>Make: ${car2Details.Make}</p>`;
        result += `<p>Model: ${car2Details.Model}</p>`;
        result += `<p>Year: ${car2Details.Year}</p>`;
        result += '</div></div>';
    }

    result += '</div>';

    document.getElementById('comparison-result').innerHTML = result;

    if (car1Details && car2Details) {
        const bestCar = determineBestCar(car1Details, car2Details);
        document.getElementById('best-car-result').innerHTML = `<h3>Best Car</h3><p>${bestCar.Make} ${bestCar.Model} (${bestCar.Year})</p>`;
    }
}

function determineBestCar(car1, car2) {
    if (car1.Year > car2.Year) {
        return car1;
    } else if (car1.Year < car2.Year) {
        return car2;
    } else {
        const brandRanking = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen'];
        if (brandRanking.indexOf(car1.Make) < brandRanking.indexOf(car2.Make)) {
            return car1;
        } else {
            return car2;
        }
    }
}
