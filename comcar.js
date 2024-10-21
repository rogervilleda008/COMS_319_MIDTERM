$(document).ready(function() {
    let allCars = []; // To store all cars for filtering later

    // Fetch the JSON data
    $.getJSON('CommonCars.json', function(data) {
        allCars = data; // Store the car data in the global array
        populateFilters(data);
        displayCars(data); // Display all cars initially
    });

    // Populate the filter dropdowns dynamically based on the car data
    function populateFilters(cars) {
        const makeFilter = $('#makeFilter');
        const modelFilter = $('#modelFilter');
        const yearFilter = $('#yearFilter');
        
        let makes = new Set();
        let models = new Set();
        let years = new Set();

        // Collect unique makes, models, and years
        cars.forEach(car => {
            makes.add(car.Make);
            models.add(car.Model);
            years.add(car.Year);
        });

        // Add options to the make filter dropdown
        makes.forEach(make => {
            makeFilter.append(new Option(make, make));
        });

        // Add options to the model filter dropdown
        models.forEach(model => {
            modelFilter.append(new Option(model, model));
        });

        // Add options to the year filter dropdown
        years.forEach(year => {
            yearFilter.append(new Option(year, year));
        });
    }

    // Display cars dynamically
    function displayCars(cars) {
        var carCatalog = $('#car-catalog');
        carCatalog.empty(); // Clear the current list of cars
        
        cars.forEach(car => {
            var carCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${car.Pic}" class="card-img-top" alt="${car.Make} ${car.Model}">
                    <div class="card-body">
                        <h5 class="card-title">${car.Make} ${car.Model}</h5>
                        <p class="card-text">Year: ${car.Year}</p>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#carDetailsModal" 
                                data-make="${car.Make}" data-model="${car.Model}" data-pic="${car.Pic}" 
                                data-desc="${car.Desc}">
                            More Details
                        </button>
                    </div>
                </div>
            </div>
            `;
            
            carCatalog.append(carCard);
        });
    }

    // Event listener for dropdown change
    $('#makeFilter, #modelFilter, #yearFilter').on('change', function() {
        let selectedMake = $('#makeFilter').val();
        let selectedModel = $('#modelFilter').val();
        let selectedYear = $('#yearFilter').val();

        // Filter cars based on the selected dropdown values
        let filteredCars = allCars.filter(car => {
            return (selectedMake === "" || car.Make === selectedMake) &&
                   (selectedModel === "" || car.Model === selectedModel) &&
                   (selectedYear === "" || car.Year === selectedYear);
        });

        displayCars(filteredCars); // Display the filtered cars
    });

    // Event listener for modal details
    $('#carDetailsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var make = button.data('make');
        var model = button.data('model');
        var pic = button.data('pic');
        var desc = button.data('desc');
        
        // Update the modal's content
        var modal = $(this);
        modal.find('.modal-title').text(`${make} ${model}`);
        modal.find('#carModalImage').attr('src', pic);
        modal.find('#carModalTitle').text(`${make} ${model}`);
        modal.find('#carModalDescription').text(desc);
    });
});
