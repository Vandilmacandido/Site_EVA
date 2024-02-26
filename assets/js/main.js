
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 30
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()


 /**
   * Contact
   */

document.getElementById("email-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Exibir o elemento de "loading"
  var loadingElement = document.querySelector('.loading');
  loadingElement.style.display = 'block';

  // Pegar os valores dos inputs
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let checkbox = document.getElementById('receber_email').value;
  let empresa = document.getElementById('empresa').value;
  // E assim por diante para outros inputs...

  // Criar objeto com os dados do formulário
  var formData = {
      name: name,
      email: email,
      $empresa: empresa,
      $receber_email: checkbox,
      honeypot: '', // Se algum valor for recebido neste campo, a submissão do formulário será ignorada.
      accessKey: '3420cf37-5861-4204-ae15-817287048317' // Obtenha sua chave de acesso em https://www.staticforms.xyz
  };

  // Enviar os dados do formulário para a API (por meio de fetch, ajax, etc.)
  enviarParaAPI(formData);
});

function enviarParaAPI(formData) {
  // Aqui você faria a lógica para enviar os dados do formulário para a API
  // Por exemplo, usando fetch, axios, XMLHttpRequest, etc.
  console.log('Dados do formulário:', formData);
  // Exemplo de uso do fetch:
  fetch('https://api.staticforms.xyz/submit', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  console.log('Resposta da API:', data);
  // Ocultar o elemento de "loading"
  var loadingElement = document.querySelector('.loading');
  loadingElement.style.display = 'none';

  if (data.success) {
      // Exibir mensagem de sucesso
      var successMessage = document.querySelector('.sent-message');
      successMessage.style.display = 'block';
  } else {
      // Exibir mensagem de erro genérica
      var errorMessage = document.querySelector('.error-message');
      errorMessage.textContent = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
      errorMessage.style.display = 'block';
  }
})
.catch(error => {
  console.error('Erro ao enviar para a API:', error);
  // Ocultar o elemento de "loading" em caso de erro
  var loadingElement = document.querySelector('.loading');
  loadingElement.style.display = 'none';

  // Exibir mensagem de erro genérica
  var errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
  errorMessage.style.display = 'block';
});

}

