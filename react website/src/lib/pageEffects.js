// The live site's per-page scripts, run after each route change.

export function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export function scheduleFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.schedule-item');
  const groups = document.querySelectorAll('.schedule-mobile-group');
  const onClick = (event) => {
    const button = event.currentTarget;
    buttons.forEach((b) => {
      b.classList.remove('bg-brand-dark', 'text-white');
      b.classList.add('bg-white', 'text-gray-600');
    });
    button.classList.remove('bg-white', 'text-gray-600');
    button.classList.add('bg-brand-dark', 'text-white');
    const filter = button.getAttribute('data-filter');
    items.forEach((item) => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; }, 50);
      } else {
        item.style.display = 'none';
      }
    });
    groups.forEach((group) => {
      group.style.display = group.querySelectorAll('.schedule-item:not([style*="display: none"])').length > 0 ? 'block' : 'none';
    });
  };
  buttons.forEach((b) => b.addEventListener('click', onClick));
  return () => buttons.forEach((b) => b.removeEventListener('click', onClick));
}
