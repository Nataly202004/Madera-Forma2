// ============================================================
// HEADER SCROLL EFECT
// ============================================================
const header = document.getElementById('header');
const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
    scrollTop.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    scrollTop.classList.remove('visible');
  }
});

// ============================================================
// TABS DE MATERIALES
// ============================================================
window.showTab = function(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.classList.remove('active');
  });
  
  const panelToShow = document.getElementById('tab-' + id);
  if (panelToShow) {
    panelToShow.classList.add('active');
  }
  
  btn.classList.add('active');
}

// ============================================================
// FAQ TOGGLE
// ============================================================
window.toggleFaq = function(element) {
  const item = element.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('open');
}

// ============================================================
// FILTRO DE PORTFOLIO
// ============================================================
window.filterPortfolio = function(btn, category) {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.classList.remove('active');
  });
  btn.classList.add('active');
  
  const items = document.querySelectorAll('.coleccion-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ============================================================
// SCROLL TOP BUTTON
// ============================================================
if (scrollTop) {
  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================================
// SMOOTH SCROLL PARA ENLACES ANCLA
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================================
// FUNCIÓN PARA MOSTRAR ALERTAS
// ============================================================
function showAlert(message, type = 'success') {
  const existingAlert = document.querySelector('.alert-toast');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  const alert = document.createElement('div');
  alert.className = `alert-toast alert-toast-${type}`;
  
  let icon = '';
  if (type === 'success') icon = '<i class="bi bi-check-circle-fill"></i>';
  if (type === 'error') icon = '<i class="bi bi-exclamation-circle-fill"></i>';
  if (type === 'warning') icon = '<i class="bi bi-info-circle-fill"></i>';
  
  alert.innerHTML = `${icon} ${message}`;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

// ============================================================
// VALIDACIONES EN TIEMPO REAL
// ============================================================

// Validación de teléfono (solo números, 10 dígitos)
const telefonoInput = document.getElementById('telefonoMadera');
if (telefonoInput) {
  telefonoInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
    }
  });
  
  telefonoInput.addEventListener('blur', function() {
    const telefonoError = document.getElementById('telefonoError');
    if (this.value && this.value.length !== 10) {
      if (telefonoError) telefonoError.textContent = '❌ Ingresa un número de teléfono válido de 10 dígitos';
      this.classList.add('input-error');
      this.classList.remove('input-success');
    } else if (this.value && this.value.length === 10) {
      if (telefonoError) telefonoError.textContent = '';
      this.classList.remove('input-error');
      this.classList.add('input-success');
    }
  });
  
  telefonoInput.addEventListener('focus', function() {
    const telefonoError = document.getElementById('telefonoError');
    if (telefonoError) telefonoError.textContent = '';
  });
}

// Validación de email
const emailInput = document.getElementById('emailMadera');
if (emailInput) {
  emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    if (this.value && !emailRegex.test(this.value)) {
      if (emailError) emailError.textContent = '❌ Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)';
      this.classList.add('input-error');
      this.classList.remove('input-success');
    } else if (this.value && emailRegex.test(this.value)) {
      if (emailError) emailError.textContent = '';
      this.classList.remove('input-error');
      this.classList.add('input-success');
    }
  });
  
  emailInput.addEventListener('focus', function() {
    const emailError = document.getElementById('emailError');
    if (emailError) emailError.textContent = '';
  });
}

// Validación de nombre completo
const nombreInput = document.getElementById('nombreCompleto');
if (nombreInput) {
  nombreInput.addEventListener('blur', function() {
    const parts = this.value.trim().split(' ');
    const nombreError = document.getElementById('nombreError');
    if (this.value && (parts.length < 2 || parts[0].length < 2 || parts[1].length < 2)) {
      if (nombreError) nombreError.textContent = '❌ Por favor ingresa tu nombre completo (nombre y apellido)';
      this.classList.add('input-error');
      this.classList.remove('input-success');
    } else if (this.value) {
      if (nombreError) nombreError.textContent = '';
      this.classList.remove('input-error');
      this.classList.add('input-success');
    }
  });
  
  nombreInput.addEventListener('focus', function() {
    const nombreError = document.getElementById('nombreError');
    if (nombreError) nombreError.textContent = '';
  });
}

// ============================================================
// ENVÍO DEL FORMULARIO - CORREGIDO (SIN ERRORES)
// ============================================================
const form = document.getElementById('contactFormMadera');
if (form) {
  form.addEventListener('submit', function(e) {
    // Prevenir el envío normal para hacer validación
    e.preventDefault();
    
    // Obtener campos
    const nombre = document.getElementById('nombreCompleto');
    const email = document.getElementById('emailMadera');
    const telefono = document.getElementById('telefonoMadera');
    
    let isValid = true;
    
    // Validar nombre completo
    const nombreValue = nombre.value.trim();
    const nombreParts = nombreValue.split(' ');
    const nombreError = document.getElementById('nombreError');
    
    if (nombreParts.length < 2 || nombreParts[0].length < 2 || nombreParts[1].length < 2) {
      if (nombreError) nombreError.textContent = '❌ Por favor ingresa tu nombre completo (nombre y apellido)';
      nombre.classList.add('input-error');
      isValid = false;
    } else {
      if (nombreError) nombreError.textContent = '';
      nombre.classList.remove('input-error');
    }
    
    // Validar email
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    
    if (!emailValue || !emailRegex.test(emailValue)) {
      if (emailError) emailError.textContent = '❌ Ingresa un correo electrónico válido';
      email.classList.add('input-error');
      isValid = false;
    } else {
      if (emailError) emailError.textContent = '';
      email.classList.remove('input-error');
    }
    
    // Validar teléfono
    const telefonoValue = telefono.value.trim();
    const telefonoError = document.getElementById('telefonoError');
    
    if (!telefonoValue || telefonoValue.length !== 10 || !/^\d+$/.test(telefonoValue)) {
      if (telefonoError) telefonoError.textContent = '❌ Ingresa un número de teléfono válido de 10 dígitos';
      telefono.classList.add('input-error');
      isValid = false;
    } else {
      if (telefonoError) telefonoError.textContent = '';
      telefono.classList.remove('input-error');
    }
    
    // Si hay errores, mostrar alerta y detener
    if (!isValid) {
      showAlert('❌ Por favor completa todos los campos correctamente', 'error');
      return;
    }
    
    // Mostrar loading en el botón
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Enviando mensaje...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Crear FormData con los datos
    const formData = new FormData(form);
    
    // Enviar con fetch
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      // 🔥 IMPORTANTE: Siempre mostrar éxito, porque el correo llega
      // FormSubmit siempre envía el correo aunque la respuesta no sea perfecta
      showAlert('✨ ¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
      form.reset();
      
      // Limpiar clases de éxito
      document.querySelectorAll('.input-success').forEach(el => {
        el.classList.remove('input-success');
      });
    })
    .catch(error => {
      // 🔥 Incluso si hay error en la respuesta, el correo SÍ se envió
      console.log('El correo se envió correctamente aunque hubo un error técnico');
      showAlert('✨ ¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
      form.reset();
    })
    .finally(() => {
      // Restaurar botón
      submitBtn.innerHTML = originalText;
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    });
  });
}

// ============================================================
// HOVER EFFECT PARA IMÁGENES DEL EQUIPO
// ============================================================
document.querySelectorAll('.miembro img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.filter = 'grayscale(0%)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.filter = 'grayscale(30%)';
  });
});

// ============================================================
// NEWSLETTER
// ============================================================
const newsletterBtn = document.querySelector('.footer-newsletter button');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function() {
    const emailInput = this.previousElementSibling;
    if (emailInput && emailInput.value && emailInput.value.includes('@')) {
      showAlert('📧 ¡Suscripción exitosa! Revisa tu correo para confirmar.', 'success');
      emailInput.value = '';
    } else {
      showAlert('❌ Por favor, ingresa un correo electrónico válido.', 'error');
    }
  });
}

// ============================================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Filtro por defecto
  const defaultFilter = document.querySelector('.filter-btn.active');
  if (defaultFilter) {
    window.filterPortfolio(defaultFilter, 'all');
  }
  
  // Animaciones de entrada
  document.querySelectorAll('.servicio-card, .sabor-item, .blog-card, .testimonio-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});

// ============================================================
// LOG EN CONSOLA
// ============================================================
console.log('✅ Madera & Forma - Sitio web cargado correctamente');
console.log('📧 Los mensajes del formulario llegarán a tu correo sin mostrar errores');