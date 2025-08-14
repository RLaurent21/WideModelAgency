// Wide Model Agency - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
 // Navigation mobile
 initMobileNav();
 
 // Smooth scroll pour les liens d'ancrage
 initSmoothScroll();
 
 // Animations au scroll
 initScrollAnimations();
 
 // Formulaire de contact
 initContactForm();
 
 // Galerie de mannequins
 initModelGallery();
});

// Navigation mobile
function initMobileNav() {
 const navToggle = document.querySelector('.nav-toggle');
 const navMenu = document.querySelector('.nav-menu');
 
 if (navToggle && navMenu) {
     navToggle.addEventListener('click', function() {
         navMenu.classList.toggle('active');
         
         // Animation de l'icône hamburger
         const icon = navToggle.querySelector('i') || navToggle;
         if (navMenu.classList.contains('active')) {
             icon.innerHTML = '✕';
         } else {
             icon.innerHTML = '☰';
         }
     });
     
     // Fermer le menu mobile lors du clic sur un lien
     const navLinks = navMenu.querySelectorAll('a');
     navLinks.forEach(link => {
         link.addEventListener('click', function() {
             navMenu.classList.remove('active');
             const icon = navToggle.querySelector('i') || navToggle;
             icon.innerHTML = '☰';
         });
     });
 }
}

// Smooth scroll
function initSmoothScroll() {
 const links = document.querySelectorAll('a[href^="#"]');
 
 links.forEach(link => {
     link.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         
         if (targetElement) {
             const headerHeight = document.querySelector('.header').offsetHeight;
             const targetPosition = targetElement.offsetTop - headerHeight;
             
             window.scrollTo({
                 top: targetPosition,
                 behavior: 'smooth'
             });
         }
     });
 });
}

// Animations au scroll
function initScrollAnimations() {
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };
 
 const observer = new IntersectionObserver(function(entries) {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = '1';
             entry.target.style.transform = 'translateY(0)';
         }
     });
 }, observerOptions);
 
 // Sélectionner les éléments à animer
 const animatedElements = document.querySelectorAll('.model-card, .article-card, .section-title');
 
 animatedElements.forEach(el => {
     el.style.opacity = '0';
     el.style.transform = 'translateY(30px)';
     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
     observer.observe(el);
 });
}

// Formulaire de contact
function initContactForm() {
 const contactForm = document.querySelector('#contact-form');
 
 if (contactForm) {
     contactForm.addEventListener('submit', function(e) {
         e.preventDefault();
         
         // Validation basique
         const nom = document.querySelector('#nom').value.trim();
         const prenom = document.querySelector('#prenom').value.trim();
         const email = document.querySelector('#email').value.trim();
         const message = document.querySelector('#message').value.trim();
         
         // Réinitialiser les erreurs
         clearFormErrors();
         
         let hasErrors = false;
         
         // Validation
         if (!nom) {
             showFieldError('nom', 'Le nom est requis');
             hasErrors = true;
         }
         
         if (!prenom) {
             showFieldError('prenom', 'Le prénom est requis');
             hasErrors = true;
         }
         
         if (!email || !isValidEmail(email)) {
             showFieldError('email', 'Email valide requis');
             hasErrors = true;
         }
         
         if (!message) {
             showFieldError('message', 'Le message est requis');
             hasErrors = true;
         }
         
         if (!hasErrors) {
             // Simuler l'envoi du formulaire
             showSuccessMessage('Votre message a été envoyé avec succès!');
             contactForm.reset();
         }
     });
 }
}

// Validation email
function isValidEmail(email) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
}

// Afficher erreur de champ
function showFieldError(fieldId, message) {
 const field = document.querySelector(`#${fieldId}`);
 if (field) {
     field.style.borderColor = '#e74c3c';
     
     // Créer ou mettre à jour le message d'erreur
     let errorElement = field.parentNode.querySelector('.error-message');
     if (!errorElement) {
         errorElement = document.createElement('div');
         errorElement.className = 'error-message';
         errorElement.style.color = '#e74c3c';
         errorElement.style.fontSize = '0.9rem';
         errorElement.style.marginTop = '5px';
         field.parentNode.appendChild(errorElement);
     }
     errorElement.textContent = message;
 }
}

// Effacer les erreurs du formulaire
function clearFormErrors() {
 const errorMessages = document.querySelectorAll('.error-message');
 errorMessages.forEach(error => error.remove());
 
 const inputs = document.querySelectorAll('.form-input');
 inputs.forEach(input => {
     input.style.borderColor = '#ddd';
 });
}

// Afficher message de succès
function showSuccessMessage(message) {
 // Créer une notification
 const notification = document.createElement('div');
 notification.className = 'success-notification';
 notification.textContent = message;
 notification.style.cssText = `
     position: fixed;
     top: 20px;
     right: 20px;
     background-color: #27ae60;
     color: white;
     padding: 15px 20px;
     border-radius: 5px;
     z-index: 9999;
     animation: slideIn 0.3s ease;
 `;
 
 document.body.appendChild(notification);
 
 // Supprimer après 3 secondes
 setTimeout(() => {
     notification.style.animation = 'slideOut 0.3s ease';
     setTimeout(() => {
         notification.remove();
     }, 300);
 }, 3000);
}

// Galerie de mannequins avec filtrage
function initModelGallery() {
 const filterButtons = document.querySelectorAll('.filter-btn');
 const modelCards = document.querySelectorAll('.model-card');
 
 if (filterButtons.length > 0 && modelCards.length > 0) {
     filterButtons.forEach(button => {
         button.addEventListener('click', function() {
             const filter = this.getAttribute('data-filter');
             
             // Mise à jour des boutons actifs
             filterButtons.forEach(btn => btn.classList.remove('active'));
             this.classList.add('active');
             
             // Filtrage des cartes
             modelCards.forEach(card => {
                 const category = card.getAttribute('data-category');
                 
                 if (filter === 'all' || category === filter) {
                     card.style.display = 'block';
                     card.style.animation = 'fadeIn 0.5s ease';
                 } else {
                     card.style.display = 'none';
                 }
             });
         });
     });
 }
}

// Lightbox pour les images de mannequins
function initLightbox() {
 const modelImages = document.querySelectorAll('.model-image img');
 
 modelImages.forEach(img => {
     img.addEventListener('click', function() {
         createLightbox(this.src, this.alt);
     });
 });
}

function createLightbox(src, alt) {
 const lightbox = document.createElement('div');
 lightbox.className = 'lightbox';
 lightbox.style.cssText = `
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.9);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 9999;
     cursor: pointer;
 `;
 
 const img = document.createElement('img');
 img.src = src;
 img.alt = alt;
 img.style.cssText = `
     max-width: 90%;
     max-height: 90%;
     object-fit: contain;
 `;
 
 lightbox.appendChild(img);
 document.body.appendChild(lightbox);
 
 // Fermer au clic
 lightbox.addEventListener('click', function() {
     this.remove();
 });
 
 // Fermer avec Escape
 document.addEventListener('keydown', function(e) {
     if (e.key === 'Escape') {
         lightbox.remove();
     }
 });
}

// Animations CSS additionnelles
const style = document.createElement('style');
style.textContent = `
 @keyframes slideIn {
     from { transform: translateX(100%); opacity: 0; }
     to { transform: translateX(0); opacity: 1; }
 }
 
 @keyframes slideOut {
     from { transform: translateX(0); opacity: 1; }
     to { transform: translateX(100%); opacity: 0; }
 }
 
 @keyframes fadeIn {
     from { opacity: 0; transform: scale(0.9); }
     to { opacity: 1; transform: scale(1); }
 }
 
 .lightbox {
     animation: fadeIn 0.3s ease;
 }
`;
document.head.appendChild(style);

// Lazy loading pour les images
function initLazyLoading() {
 const images = document.querySelectorAll('img[data-src]');
 
 const imageObserver = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const img = entry.target;
             img.src = img.dataset.src;
             img.classList.remove('lazy');
             imageObserver.unobserve(img);
         }
     });
 });
 
 images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading si présent
if (document.querySelectorAll('img[data-src]').length > 0) {
 initLazyLoading();
}



