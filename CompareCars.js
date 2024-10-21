// Function to read and display image
function readImage(input, imageElementId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(imageElementId).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Compare cars and display both results
function compareCars() {
    const car1Make = document.getElementById('car1-make').value;
    const car1Model = document.getElementById('car1-model').value;
    const car1Year = document.getElementById('car1-year').value;
    const car1Image = document.getElementById('car1-image').files[0];

    const car2Make = document.getElementById('car2-make').value;
    const car2Model = document.getElementById('car2-model').value;
    const car2Year = document.getElementById('car2-year').value;
    const car2Image = document.getElementById('car2-image').files[0];

    let result = '';

    if (car1Make && car1Model && car1Year && car1Image && car2Make && car2Model && car2Year && car2Image) {
        // Display both cars
        result += '<h4 class="text-center">Comparison Results</h4>';
        result += `
            <div class="card shadow-sm car-card centered">
                <img id="car1-image-display" class="card-img-top" alt="Car 1 image"></img>
                <div class="card-body">
                    <p class="card-text"><strong>${car1Make}</strong>, ${car1Model}, ${car1Year}</p>
                </div>
            </div>
            <div class="card shadow-sm car-card centered">
                <img id="car2-image-display" class="card-img-top" alt="Car 2 image"></img>
                <div class="card-body">
                    <p class="card-text"><strong>${car2Make}</strong>, ${car2Model}, ${car2Year}</p>
                </div>
            </div>
        `;

        document.getElementById('comparison-result').innerHTML = result;

        // Display both car images
        readImage({ files: [car1Image] }, 'car1-image-display');
        readImage({ files: [car2Image] }, 'car2-image-display');

        // Show the "Show BEST ONE" button
        document.getElementById('best-one-button').style.display = 'block';
    } else {
        result += '<p class="text-danger text-center">Please ensure all fields are filled for both cars, including images.</p>';
        document.getElementById('comparison-result').innerHTML = result;
    }
}

// Function to display the best one based on year
function showBestOne() {
    const car1Year = parseInt(document.getElementById('car1-year').value);
    const car2Year = parseInt(document.getElementById('car2-year').value);
    let bestCarMake, bestCarModel, bestCarYear, bestCarImage;

    if (car1Year > car2Year) {
        bestCarMake = document.getElementById('car1-make').value;
        bestCarModel = document.getElementById('car1-model').value;
        bestCarYear = document.getElementById('car1-year').value;
        bestCarImage = document.getElementById('car1-image').files[0];
    } else {
        bestCarMake = document.getElementById('car2-make').value;
        bestCarModel = document.getElementById('car2-model').value;
        bestCarYear = document.getElementById('car2-year').value;
        bestCarImage = document.getElementById('car2-image').files[0];
    }

    let bestOneResult = `
        <h3 class="text-center">BEST ONE</h3>
        <div class="card shadow-sm car-card centered">
            <img id="best-car-image" class="card-img-top" alt="Best Car Image"></img>
            <div class="card-body">
                <p class="card-text"><strong>${bestCarMake}</strong>, ${bestCarModel}, ${bestCarYear}</p>
            </div>
        </div>
    `;

    // Display the best car image
    document.getElementById('best-one-result').innerHTML = bestOneResult;
    readImage({ files: [bestCarImage] }, 'best-car-image');
}
