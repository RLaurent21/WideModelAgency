// script2.js
document.addEventListener("DOMContentLoaded", function () {
 // Gestion du formulaire de candidature
 const form = document.getElementById("candidature-form");
 const messageDiv = document.getElementById("form-message");

 if (form) {
     form.addEventListener("submit", function (e) {
         e.preventDefault();
         const nom = document.getElementById("nom").value;

         messageDiv.innerHTML = `<p style="color: green;">Merci, ${nom} ! Votre candidature a été envoyée. Nous vous contacterons sous peu.</p>`;
         form.reset();
     });
 }

 // Animation légère au scroll
 const elements = document.querySelectorAll(".service-item, .casting-info, .pricing");
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = "1";
             entry.target.style.transform = "translateY(0)";
         }
     });
 }, { threshold: 0.1 });

 elements.forEach(el => {
     el.style.opacity = "0";
     el.style.transform = "translateY(20px)";
     el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
     observer.observe(el);
 });
});



// Script JS (Exemple simple pour ajouter une fonctionnalité interactive)
document.addEventListener("DOMContentLoaded", function () {
    // Exemple : Ajouter une animation lors du clic sur un service
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
        card.addEventListener("click", () => {
            alert("Vous avez cliqué sur ce service !");
        });
    });
});