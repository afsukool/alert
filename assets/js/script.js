document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const loadingMessage = document.querySelector(".loading");
  const errorMessage = document.querySelector(".error-message");
  const sentMessage = document.querySelector(".sent-message");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
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
    xhr.send(formData);
  });
});
