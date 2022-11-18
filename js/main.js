'use strict';

// 헤더 스크롤 이벤트
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  let scrollY = this.scrollY;

  if (scrollY > headerHeight) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});

// nav 메뉴 클릭 시 스크롤링, 메뉴 이벤트
const sectionPadding = 180;
const navBar = document.querySelector('.navbar__manu');
const navItem = document.querySelectorAll('.navbar__manu .navbar__manu__item');

navBar.addEventListener('click', (event) => {
  const target = event.target;
  console.log(target.dataset.link);

  if (target.tagName === 'LI') {
    const targetLink = target.dataset.link;
    const targetCont = document.querySelector(`#${targetLink}`);
    const targetContLocation = targetCont.offsetTop;
    window.scrollTo({
      top: targetContLocation - sectionPadding,
      behavior: 'smooth',
    });

    navItem.forEach(function (item) {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
});

window.addEventListener('scroll', () => {
  // 화면 스크롤 시 해당 섹션 영역 확인
  // 화면 스크롤 위치 가져오기
  // 각 섹션 위치 확인
  let scrollY = this.scrollY;

  const homeScrollY = scrollY + document.querySelector('#home').getBoundingClientRect().top - sectionPadding;
  const aboutScrollY = scrollY + document.querySelector('#about').getBoundingClientRect().top - sectionPadding;
  const skillsScrollY = scrollY + document.querySelector('#skills').getBoundingClientRect().top - sectionPadding;
  const myWorkScrollY = scrollY + document.querySelector('#work').getBoundingClientRect().top - sectionPadding;
  const contactScrollY = scrollY + document.querySelector('#contact').getBoundingClientRect().top - sectionPadding;

  //   let menu;
  function menrScrollEvent(maneName) {
    navItem.forEach(function (item) {
      item.classList.remove('active');
    });

    let menu = document.querySelector(`[data-link="${maneName}"]`);
    menu.classList.add('active');
  }

  //   if (scrollY + 80 >= homeScrollY && scrollY < aboutScrollY) {
  //     menrScrollEvent('home');
  //   } else if (scrollY >= aboutScrollY && scrollY < skillsScrollY) {
  //     menrScrollEvent('about');
  //   } else if (scrollY >= skillsScrollY && scrollY < myWorkScrollY) {
  //     menrScrollEvent('skills');
  //   } else if (scrollY >= myWorkScrollY && scrollY < contactScrollY) {
  //     menrScrollEvent('work');
  //   } else if (scrollY >= contactScrollY) {
  //     menrScrollEvent('contact');
  //   }
});
