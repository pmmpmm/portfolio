'use strict';

// 스크롤 이동 함수
function scrollIntoView(location) {
  window.scrollTo({
    top: location,
    behavior: 'smooth',
  });
}

// 헤더 스크롤 효과
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

// nav 메뉴 클릭 : 해당 컨텐츠로 스크롤링, 메뉴 이벤트
const sectionPadding = 180;
const navBar = document.querySelector('.navbar--manu');
const navItem = document.querySelectorAll('.navbar--manu .navbar--manu--item');

navBar.addEventListener('click', (event) => {
  const target = event.target;
  //   console.log(target.dataset.link);

  if (target.tagName === 'LI') {
    const targetLink = target.dataset.link;
    const targetCont = document.querySelector(`#${targetLink}`);
    const targetContLocation = targetCont.offsetTop;

    scrollIntoView(targetContLocation - sectionPadding);

    // 메뉴 클릭 시 클래스 'active'
    navItem.forEach(function (item) {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
});

// go to top 버튼
const topBtn = document.querySelector('.top--btn');
topBtn.addEventListener('click', () => {
  scrollIntoView(0);
});

// home "contact me" 버튼 클릭 : 해당 컨텐츠로 스크롤링
const contactBtn = document.querySelector('.contact--btn');
contactBtn.addEventListener('click', () => {
  const location = document.querySelector('#contact').offsetTop;
  scrollIntoView(location);
});

// 스크롤 시 home "contact me" 버튼 fade out
window.addEventListener('scroll', () => {
  if (scrollY > 100) {
    contactBtn.classList.add('fadeOut');
  } else {
    contactBtn.classList.remove('fadeOut');
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
});
