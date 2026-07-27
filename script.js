// ===== GALERIA DE PRODUTOS ===== 
document.addEventListener('DOMContentLoaded', function () {
  // Galeria principal
  const thumbs = document.querySelectorAll('.thumb');
  const main = document.getElementById('mainProductImage');
  
  if (thumbs && main) {
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        const large = t.dataset.large || t.src;
        main.src = large;
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
    if (thumbs[0]) thumbs[0].classList.add('active');
  }

  // ===== FAQ ACCORDION =====
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      faqItem.classList.toggle('active');
    });
  });

  // ===== BUSCA DE PRODUTOS =====
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput && searchBtn) {
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const products = document.querySelectorAll('.product-card');
      
      products.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
          product.classList.remove('hidden');
        } else {
          product.classList.add('hidden');
        }
      });
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', performSearch);
  }

  // ===== FILTRO DE CATEGORIAS =====
  const filtros = document.querySelectorAll('.filtro-btn');
  const products = document.querySelectorAll('.product-card');
  
  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove classe active de todos
      filtros.forEach(b => b.classList.remove('active'));
      // Adiciona active ao clicado
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      products.forEach(product => {
        const category = product.getAttribute('data-category');
        
        if (filter === 'todos' || category === filter) {
          product.classList.remove('hidden');
        } else {
          product.classList.add('hidden');
        }
      });
    });
  });

  // ===== BOTÕES DE COMPRA WHATSAPP =====
  const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
  const whatsappNumber = '5511984942888';
  
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product');
      const message = `Olá! Gostaria de comprar: ${productName}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
  });

  // ===== BOTÃO VOLTAR AO TOPO =====
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== CATEGORIAS CLICÁVEIS =====
  const categoriasCards = document.querySelectorAll('.categoria-card');
  
  categoriasCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      const filterBtn = document.querySelector(`[data-filter="${category}"]`);
      
      if (filterBtn) {
        filterBtn.click();
      }
      
      // Scroll para seção de produtos
      document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== ANIMAÇÃO AO ROLAR A PÁGINA =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar cards de produtos
  products.forEach(product => {
    product.style.opacity = '0';
    observer.observe(product);
  });

  // Observar cards de benefícios
  const beneficioCards = document.querySelectorAll('.beneficio-card');
  beneficioCards.forEach(card => {
    observer.observe(card);
  });

  // ===== PREVENÇÃO DE MÚLTIPLOS CLIQUES =====
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-whatsapp')) {
      e.target.disabled = true;
      setTimeout(() => {
        e.target.disabled = false;
      }, 1000);
    }
  });

  // ===== CARREGAMENTO SUAVE =====
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
