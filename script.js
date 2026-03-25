// =============================================
//   SEEMA YADAV — Digital Marketing Portfolio
//   JavaScript: Animations, Chatbot, Utilities
// =============================================

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// ---- COUNTER ANIMATION ----
const counters = document.querySelectorAll('.stat-num');
let counterStarted = false;

function startCounters() {
  if (counterStarted) return;
  counterStarted = true;
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 30);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startCounters();
  });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ---- PROGRESS BAR ANIMATION ----
const bars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = getComputedStyle(entry.target).getPropertyValue('--w');
      entry.target.style.width = width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => barObserver.observe(bar));

// ---- CHAT BUBBLES ANIMATION ----
const bubbles = document.querySelectorAll('.bubble');
const convoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      bubbles.forEach((bubble, i) => {
        const delay = parseInt(bubble.dataset.delay) || i * 600;
        setTimeout(() => {
          bubble.classList.add('show');
        }, delay);
      });
      convoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const convoSection = document.getElementById('convo');
if (convoSection) convoObserver.observe(convoSection);

// ---- 3D CARD TILT ON MOUSE MOVE ----
const heroCard = document.querySelector('.profile-3d-card');
if (heroCard) {
  document.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / 25;
    const deltaY = (e.clientY - centerY) / 25;
    const inner = heroCard.querySelector('.profile-inner');
    if (inner) {
      inner.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    }
  });

  heroCard.addEventListener('mouseleave', () => {
    const inner = heroCard.querySelector('.profile-inner');
    if (inner) {
      inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  });
}

// ---- SMOOTH PARALLAX HERO SHAPES ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shape1 = document.querySelector('.shape-1');
  const shape2 = document.querySelector('.shape-2');
  if (shape1) shape1.style.transform = `translateY(${scrollY * 0.2}px)`;
  if (shape2) shape2.style.transform = `translateY(${-scrollY * 0.1}px)`;
});

// ---- CONTACT FORM ----
function handleForm(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.classList.add('show');
  }
}

// ---- CHATBOT ----
let chatOpen = false;
const chatbot = document.getElementById('chatbotBox');
const chatToggle = document.getElementById('chatToggle');
const notify = document.querySelector('.chat-notify');

function toggleChat() {
  chatOpen = !chatOpen;
  if (chatbot) {
    chatbot.classList.toggle('open', chatOpen);
  }
  if (notify) notify.style.display = 'none';
  if (chatToggle) {
    const icon = chatToggle.querySelector('i');
    if (icon) {
      icon.className = chatOpen ? 'fas fa-times' : 'fas fa-comments';
    }
  }
}

function quickReply(topic) {
  appendUserMsg(topic);
  setTimeout(() => {
    const responses = {
      'Services': "I offer Social Media Growth, SEO, Paid Ads (Google & Meta), Lead Generation, Content Strategy, and Digital Marketing Training. Which service interests you most? 😊",
      'Pricing': "Pricing depends on your goals and package. Services start from ₹8,000/month. Book a FREE 30-min consultation call to get a custom quote! 📞",
      'Contact': "You can reach Seema at:\n📞 +91 7\n✉️ seema@seemasmarketing.com\n💬 WhatsApp: wa.me/919876543210",
      'Training': "Seema runs online digital marketing training programs for beginners, freelancers, and business owners. New batch starting soon! Visit YouTube for free content. 🎓"
    };
    appendBotMsg(responses[topic] || "Thanks for your message! Seema will get back to you shortly.");
  }, 600);
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  const msg = input.value.trim();
  input.value = '';
  appendUserMsg(msg);
  setTimeout(() => {
    const reply = getBotReply(msg.toLowerCase());
    appendBotMsg(reply);
  }, 800);
}

function checkEnter(e) {
  if (e.key === 'Enter') sendMessage();
}

function appendUserMsg(text) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user-msg';
  div.innerHTML = `<p>${text}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function appendBotMsg(text) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot-msg';
  div.innerHTML = `<p>${text}</p>`;
  div.style.opacity = '0';
  div.style.transform = 'translateY(8px)';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  // Typing indicator effect
  setTimeout(() => {
    div.style.transition = 'all 0.3s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  }, 100);
}

function getBotReply(msg) {
  if (msg.includes('service') || msg.includes('kya karte')) {
    return "I offer Social Media Growth, SEO, Google & Meta Ads, Lead Generation, Content Strategy, and Digital Marketing Training! 🚀";
  } else if (msg.includes('price') || msg.includes('cost') || msg.includes('kitne') || msg.includes('rate')) {
    return "Packages start from ₹8,000/month. Book a free consultation call to get a custom quote tailored to your needs! 💰";
  } else if (msg.includes('contact') || msg.includes('phone') || msg.includes('number') || msg.includes('call')) {
    return "📞 Call/WhatsApp: +91 98765 43210\n✉️ Email: seema@seemasmarketing.com";
  } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('helo') || msg.includes('hii')) {
    return "Hey there! 👋 Welcome to Seema Yadav's portfolio. How can I help you today?";
  } else if (msg.includes('result') || msg.includes('portfolio') || msg.includes('work')) {
    return "Seema has helped 150+ clients achieve 340%+ ROI, grown brands from 0 to 100K followers, and generated ₹2Cr+ in revenue for clients! 📈";
  } else if (msg.includes('training') || msg.includes('course') || msg.includes('learn') || msg.includes('sikha')) {
    return "Seema runs digital marketing training programs online. New batches start regularly. Check the Training section or WhatsApp for details! 🎓";
  } else if (msg.includes('seo')) {
    return "Seema's SEO service covers on-page, off-page, and technical SEO to get your website to Google Page 1. 🔍";
  } else if (msg.includes('ads') || msg.includes('google') || msg.includes('meta') || msg.includes('facebook')) {
    return "Paid Ads (Google & Meta) is one of the most popular services! Average ROI for clients is 840%+. Want to know more? 💰";
  } else if (msg.includes('instagram') || msg.includes('social media')) {
    return "Social Media Growth is Seema's specialty! She has helped brands grow from 0 to 85K+ followers organically. Want a free strategy call? 📱";
  } else if (msg.includes('delhi') || msg.includes('location') || msg.includes('where')) {
    return "Seema is based in New Delhi, India — but she works with clients all across India and internationally! 🌍";
  } else {
    return "Thanks for reaching out! 😊 For detailed answers, please WhatsApp Seema directly at +91 98765 43210 or scroll to the Contact section. She'll respond within 24 hours!";
  }
}

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ---- SERVICE CARD STAGGER ----
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      serviceCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 100);
      });
      serviceObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const servicesSection = document.getElementById('services');
if (servicesSection) serviceObserver.observe(servicesSection);

// ---- CURSOR GLOW EFFECT ----
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(232,121,160,0.6), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, opacity 0.3s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ---- PAGE LOAD ANIMATION ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
    // Trigger first visible elements
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 150);
    });
  }, 100);
});

// ---- TYPING ANIMATION FOR HERO ----
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.innerHTML;
  tagline.style.opacity = '1';
}
