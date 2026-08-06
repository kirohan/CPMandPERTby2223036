(() => {
  'use strict';

  const PDF_PATH = 'assets/CPM_and_PERT_Polished_Digital_Note.pdf';
  const TOTAL_PAGES = 15;
  const viewer = document.getElementById('pdfViewer');
  const pageInput = document.getElementById('pageNumber');
  const previousButton = document.getElementById('previousPage');
  const nextButton = document.getElementById('nextPage');
  const chapterLinks = [...document.querySelectorAll('.chapter-link')];
  const pageOpeners = [...document.querySelectorAll('[data-open-page]')];
  const navPanel = document.querySelector('.chapter-panel');
  const openNavButton = document.getElementById('openNav');
  const closeNavButton = document.getElementById('closeNav');
  const themeToggle = document.getElementById('themeToggle');

  let currentPage = 1;

  function clampPage(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return currentPage;
    return Math.min(TOTAL_PAGES, Math.max(1, parsed));
  }

  function updateActiveChapter(page) {
    let active = chapterLinks[0];
    for (const link of chapterLinks) {
      const chapterPage = Number(link.dataset.page);
      if (chapterPage <= page) active = link;
    }
    chapterLinks.forEach((link) => link.classList.toggle('is-active', link === active));
  }

  function openPage(page, { scrollToReader = false } = {}) {
    currentPage = clampPage(page);
    pageInput.value = String(currentPage);
    viewer.data = `${PDF_PATH}#page=${currentPage}&view=FitH`;
    updateActiveChapter(currentPage);

    previousButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= TOTAL_PAGES;

    if (scrollToReader) {
      document.querySelector('.workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  previousButton.addEventListener('click', () => openPage(currentPage - 1));
  nextButton.addEventListener('click', () => openPage(currentPage + 1));

  pageInput.addEventListener('change', () => openPage(pageInput.value));
  pageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      openPage(pageInput.value);
      pageInput.blur();
    }
  });

  chapterLinks.forEach((link) => {
    link.addEventListener('click', () => {
      openPage(link.dataset.page, { scrollToReader: true });
      navPanel.classList.remove('is-open');
    });
  });

  pageOpeners.forEach((button) => {
    button.addEventListener('click', () => openPage(button.dataset.openPage, { scrollToReader: true }));
  });

  openNavButton?.addEventListener('click', () => navPanel.classList.add('is-open'));
  closeNavButton?.addEventListener('click', () => navPanel.classList.remove('is-open'));

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('cpm-pert-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  const savedTheme = localStorage.getItem('cpm-pert-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(savedTheme || preferredTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  openPage(1);
})();
