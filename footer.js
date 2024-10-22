function loadFooter() {
    fetch('footer.html')
        .then(response => response.text()) // Get the response as text
        .then(data => {
            document.getElementById('footer-container').innerHTML = data; // Insert footer into the container
        })
        .catch(error => console.error('Error loading footer:', error));
}
// Initialize the footer when the page is fully loaded
window.addEventListener('DOMContentLoaded', loadFooter);
