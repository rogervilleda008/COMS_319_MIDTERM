$(document).ready(function() {
    // Fetch the JSON data
    $.getJSON('CommonCars.json', function(data) {
        var carCatalog = $('#car-catalog');
        
        // Iterate over each car in the JSON
        $.each(data, function(index, car) {
            // Create Bootstrap card for each car
            var carCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${car.Pic}" class="card-img-top" alt="${car.Make} ${car.Model}">
                    <div class="card-body">
                        <h5 class="card-title">${car.Make} ${car.Model}</h5>
                        <p class="card-text">Year: ${car.Year}</p>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#carDetailsModal" data-make="${car.Make}" data-model="${car.Model}" data-image="${car.Pic}" data-description="${car.description}">More Details</button>
                    </div>
                </div>
            </div>
            `;
            
            // Append each card to the catalog
            carCatalog.append(carCard);
        });

        // Event listener for when the modal is triggered
        $('#carDetailsModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var make = button.data('Make');
            var model = button.data('Model');
            var image = button.data('Pic');
            var description = button.data('description');
            
            // Update the modal's content
            var modal = $(this);
            modal.find('.modal-title').text(`${Make} ${Model}`);
            modal.find('#carModalImage').attr('src', Pic);
            modal.find('#carModalTitle').text(`${Make} ${Model}`);
            modal.find('#carModalDescription').text(description);
        });
    });
});
