$(document).ready(function() {
    let allCars = []; // Global array to store all car data

    // Fetch car data from JSON file
    $.getJSON('ReliableCars.json', function(data) {
        allCars = data; // Store the car data in the global array
        populateFilters(data);
        displayCars(data); // Display all cars initially
    });

    // Function to display cars
    function displayCars(cars) {
        const carCatalog = $('#car-catalog');
        carCatalog.empty(); // Clear the current list

        cars.forEach(car => {
            const carCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${car.Pic}" class="card-img-top" alt="${car.Make} ${car.Model}">
                    <div class="card-body">
                        <h5 class="card-title">${car.Make} ${car.Model}</h5>
                        <p class="card-text">Year: ${car.Year}</p>
                        <p class="card-text">Score: ${car.score}</p>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#carDetailsModal" 
                                data-make="${car.Make}" data-model="${car.Model}" data-pic="${car.Pic}" 
                                data-desc="${car.Desc}" data-score="${car.score}">
                            More Details
                        </button>
                    </div>
                </div>
            </div>
            `;
            carCatalog.append(carCard); // Append car card to catalog
        });
    }

    // Populate filter options
    function populateFilters(cars) {
        const makeFilter = $('#makeFilter');
        const modelFilter = $('#modelFilter');
        const yearFilter = $('#yearFilter');

        // Get unique makes, models, and years
        const makes = [...new Set(cars.map(car => car.Make))];
        const models = [...new Set(cars.map(car => car.Model))];
        const years = [...new Set(cars.map(car => car.Year))];

        // Populate Make filter
        makes.forEach(make => {
            makeFilter.append(`<option value="${make}">${make}</option>`);
        });

        // Populate Model filter
        models.forEach(model => {
            modelFilter.append(`<option value="${model}">${model}</option>`);
        });

        // Populate Year filter
        years.forEach(year => {
            yearFilter.append(`<option value="${year}">${year}</option>`);
        });
    }

    // Filter cars based on selected options
    function filterCars() {
        const selectedMake = $('#makeFilter').val();
        const selectedModel = $('#modelFilter').val();
        const selectedYear = $('#yearFilter').val();

        const filteredCars = allCars.filter(car => {
            return (selectedMake ? car.Make === selectedMake : true) &&
                   (selectedModel ? car.Model === selectedModel : true) &&
                   (selectedYear ? car.Year === selectedYear : true);
        });

        displayCars(filteredCars); // Display filtered cars
    }

    // Event listeners for filter changes
    $('#makeFilter, #modelFilter, #yearFilter').on('change', filterCars);

    // Event listener for modal details
    $('#carDetailsModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const make = button.data('make');
        const model = button.data('model');
        const pic = button.data('pic');
        const desc = button.data('desc');
        const score = button.data('score');
        
        // Update the modal's content
        const modal = $(this);
        modal.find('.modal-title').text(`${make} ${model}`);
        modal.find('#carModalImage').attr('src', pic);
        modal.find('#carModalTitle').text(`${make} ${model}`);
        modal.find('#carModalDescription').text(desc);
        modal.find('#carModalScore').text(`Score: ${score}`);
    });
});
