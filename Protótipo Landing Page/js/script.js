   (function () {
    "use strict";
  
    /* Ano atual no rodapé */
    const anoEl = document.getElementById("anoAtual");
    if (anoEl) anoEl.textContent = new Date().getFullYear();
  
    /* Header muda de aparência ao rolar a página */
    const header = document.getElementById("header");
    function updateHeaderState() {
      header.classList.toggle("scrolled", window.scrollY > 12);
    }
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  
    /* Menu mobile (abre/fecha) */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
  
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  
    // Fecha o menu ao clicar em qualquer link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  
    /* Scroll reveal — elementos com [data-reveal] aparecem suave
       conforme entram na tela (usando IntersectionObserver) */
    const revealEls = document.querySelectorAll("[data-reveal]");
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
  
      revealEls.forEach((el) => observer.observe(el));
    } else {
      // Navegadores muito antigos: mostra tudo direto, sem animação
      revealEls.forEach((el) => el.classList.add("in-view"));
    }
  
    /*
       Formulário de contato
       Este protótipo apenas simula o envio (mostra uma mensagem de
       sucesso). Para funcionar de verdade em produção, é necessário
       conectar a um serviço de envio de formulário, por exemplo:
         - Formspree (https://formspree.io)
         - EmailJS (https://www.emailjs.com)
         - Um back-end próprio (endpoint que envia e-mail)
       Basta substituir a função handleSubmit abaixo pela chamada real. */
    const form = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
  
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // TODO: trocar por uma chamada real (fetch para Formspree/EmailJS/back-end)
        formNote.textContent =
          "Mensagem enviada! (modo demonstração — conecte um serviço de e-mail real antes de publicar)";
  
        form.reset();
      });
    }
  })();