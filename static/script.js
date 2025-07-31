// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});
// Set theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
// Cursor grow on interactive elements
['a', 'button', '.btn', '.filter-btn', '.close-modal'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
  });
});

// Radar chart (Chart.js)
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('skillsRadar');
  if (ctx) {
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Git', 'Flask', 'Streamlit'],
        datasets: [{
          label: 'Proficiency',
          data: [95, 90, 88, 85, 85, 85, 80, 85],
          backgroundColor: 'rgba(56,189,248,0.2)',
          borderColor: '#38bdf8',
          pointBackgroundColor: '#6366f1',
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false } },
        scales: { r: { angleLines: { color: '#e0e7ef' }, grid: { color: '#e0e7ef' }, pointLabels: { color: '#2563eb', font: { size: 14 } }, min: 0, max: 100 } }
      }
    });
  }
});

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Project modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modal.classList.add('active');
    modalBody.innerHTML = card.innerHTML;
  });
});
closeModal.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

// AJAX contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Sending...';
    const formData = new FormData(contactForm);
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        formStatus.textContent = 'Message sent!';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Error: ' + (data.error || 'Could not send.');
      }
    } catch {
      formStatus.textContent = 'Network error.';
    }
  });
}

// GitHub feed
async function loadGitHubFeed() {
  const feed = document.getElementById('githubFeed');
  if (!feed) return;
  feed.innerHTML = 'Loading...';
  try {
    const res = await fetch('https://api.github.com/users/MohammedTanzil1323/events/public');
    const events = await res.json();
    feed.innerHTML = '';
    let count = 0;
    for (const event of events) {
      if (count >= 5) break;
      let type = event.type.replace('Event', '');
      let repo = event.repo.name;
      let time = new Date(event.created_at).toLocaleString();
      let icon = '<i class="fab fa-github"></i>';
      feed.innerHTML += `<div class="github-activity">${icon} <span><b>${type}</b> on <a href="https://github.com/${repo}" target="_blank">${repo}</a> <span style="color:#64748b;font-size:0.95em;">(${time})</span></span></div>`;
      count++;
    }
    if (count === 0) feed.innerHTML = 'No recent public activity.';
  } catch {
    feed.innerHTML = 'Could not load GitHub activity.';
  }
}
loadGitHubFeed();

// Typewriter effect for hero subtitle
const roles = [
  'Data Science & Machine Learning Engineer',
  'AI & Computer Vision Enthusiast',
  'Python & Deep Learning Developer',
  'NLP & Data Analytics Specialist'
];
let roleIndex = 0, charIndex = 0, typing = true;
const typedRole = document.getElementById('typed-role');
function typeRole() {
  if (!typedRole) return;
  if (typing) {
    if (charIndex < roles[roleIndex].length) {
      typedRole.textContent = roles[roleIndex].slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeRole, 60);
    } else {
      typing = false;
      setTimeout(typeRole, 1200);
    }
  } else {
    if (charIndex > 0) {
      typedRole.textContent = roles[roleIndex].slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeRole, 30);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
    }
  }
}
if (typedRole) typeRole();
