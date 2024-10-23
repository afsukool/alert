document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const loadingMessage = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Show loading message and hide other messages
        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";
        sentMessage.style.display = "none";

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        
        xhr.open("POST", form.action, true);
        xhr.setRequestHeader("Accept", "application/json");

        // Handle the response from the server
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                loadingMessage.style.display = "none";
                if (xhr.status === 200) {
                    sentMessage.style.display = "block";
                    form.reset();
                } else {
                    errorMessage.style.display = "block";
                    errorMessage.textContent = "There was a problem submitting your form. Please try again.";
                }
            }
        };

        // Send form data
        xhr.send(formData);
    };

    // Attach the submit event listener to the form
    form.addEventListener("submit", handleSubmit);
});
