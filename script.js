/* ===========================
   AI 기출문제은행 발표 - Navigation Script
=========================== */

const wrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.scroll-section');
const dots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;
let isScrolling = false;

// ── Nav Dot Highlights ──────────────────────────
function updateDots(index) {
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentIndex = index;
}

// ── Intersection Observer (dot highlight + anim) ─
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(slides).indexOf(entry.target);
        if (idx !== -1) updateDots(idx);

        // 슬라이드 진입 시 애니메이션 트리거
        entry.target.querySelectorAll('.anim-fade-up').forEach((el) => {
          el.style.animationPlayState = 'running';
        });
      }
    });
  },
  { threshold: 0.3, root: wrapper }
);

slides.forEach((s) => observer.observe(s));

// ── Dot Click Navigation ─────────────────────────
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => scrollToSlide(i));
});

function scrollToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Keyboard: PageUp/PageDown만 슬라이드 단위 이동 ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'PageDown') {
    e.preventDefault();
    scrollToSlide(currentIndex + 1);
  } else if (e.key === 'PageUp') {
    e.preventDefault();
    scrollToSlide(currentIndex - 1);
  } else if (e.key === 'Home') {
    e.preventDefault();
    scrollToSlide(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    scrollToSlide(slides.length - 1);
  }
});

// ── 자유 스크롤: wheel 이벤트 가로채기 없음 ──────────
// 브라우저 기본 스크롤 동작 그대로 허용

// ── Initial animations reset ──────────────────────
// Pause all animations, let observer re-play them on visibility
document.querySelectorAll('.anim-fade-up').forEach((el) => {
  el.style.animationPlayState = 'paused';
});

// Trigger first slide immediately
if (slides.length > 0) {
  slides[0].querySelectorAll('.anim-fade-up').forEach((el) => {
    el.style.animationPlayState = 'running';
  });
}

updateDots(0);
