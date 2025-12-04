
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }

  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popupMessage');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch('php/contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        popup.textContent = data;
        popup.style.display = "block";

        form.reset();

        setTimeout(() => {
          popup.style.display = "none";
        }, 2500);
      })
      .catch(() => {
        popup.textContent = "Error sending message.";
        popup.style.display = "block";

        setTimeout(() => {
          popup.style.display = "none";
        }, 2500);
      });
    });
  }
});

const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

menuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});
