'use strict';

// 헤더 스크롤 이벤트
const header = document.querySelector('.header');
let scrollY = window.scrollY;
let heightH = header.offsetHeight;

window.addEventListener('scroll', () => {
  if (scrollY > heightH) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});
