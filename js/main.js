'use strict';

// 클릭 시 : 스크롤 이동 함수
function scrollIntoView(location) {
  window.scrollTo({
    top: location,
    behavior: 'smooth',
  });
}
// 스트롤 다운 시: 효과
function scrollDownEffect(obj, scrollPosition, effect) {
  if (window.scrollY > scrollPosition) {
    obj.classList.add(effect);
  } else {
    obj.classList.remove(effect);
  }
}

// 헤더: scroll style
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
scrollDownEffect(header, headerHeight, 'scroll');
window.addEventListener('scroll', () => {
  scrollDownEffect(header, headerHeight, 'scroll');
});

// nav 메뉴 클릭 시 : 해당 컨텐츠로 스크롤
// nav 메뉴 클릭 시 : 버튼 style
const sectionPadding = 180;
const navBar = document.querySelector('.navbar--manu');
const navItem = document.querySelectorAll('.navbar--manu .navbar--manu--item .tx');

navBar.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'SPAN') {
    const targetLink = target.dataset.link;
    const targetCont = document.querySelector(`#${targetLink}`);
    const targetContLocation = targetCont.offsetTop;

    scrollIntoView(targetContLocation - sectionPadding);

    // 메뉴 클릭 시 : 클래스 'active'
    navItem.forEach(function (item) {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
});

// go to top 버튼 클릭 시 : 페이지 상단으로 스크롤
const topBtn = document.querySelector('.top--btn');
topBtn.addEventListener('click', () => {
  scrollIntoView(0);
});
// go to top 버튼: fade out
scrollDownEffect(topBtn, 100, 'fadeIn');
window.addEventListener('scroll', () => {
  scrollDownEffect(topBtn, 100, 'fadeIn');
});

// home "contact me" 버튼 클릭 시 : 해당 컨텐츠로 스크롤링
const contactBtn = document.querySelector('.contact--btn');
contactBtn.addEventListener('click', () => {
  const location = document.querySelector('#contact').offsetTop;
  scrollIntoView(location);
});
// home "contact me" 버튼: fade out
scrollDownEffect(contactBtn, 100, 'fadeOut');
window.addEventListener('scroll', () => {
  scrollDownEffect(contactBtn, 100, 'fadeOut');
});

// 모바일 메뉴 버튼 클릭 시 :
const navBtn = document.querySelector('.open--btn');
navBtn.addEventListener('click', () => {
  header.classList.toggle('open');
});
function navbarShowHide() {
  header.classList.remove('open');
}
window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    navbarShowHide();
  }
});

// work
const workCategoriesBtn = document.querySelector('.work--categories');
const projectsContainer = document.querySelector('.work--projects');
const projects = document.querySelectorAll('.work--projects .project');

workCategoriesBtn.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  projectsContainer.classList.add('anim--out');

  setTimeout(() => {
    projects.forEach((item) => {
      if (filter === 'all' || filter === item.dataset.type) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }
    });

    projectsContainer.classList.remove('anim--out');
  }, 300);
});

window.addEventListener('scroll', () => {
  // 화면 스크롤 시 해당 섹션 영역 확인
  // 화면 스크롤 위치 가져오기
  // 각 섹션 위치 확인
  //   let scrollY = this.scrollY;
  //   const homeScrollY = scrollY + document.querySelector('#home').getBoundingClientRect().top - sectionPadding;
  //   const aboutScrollY = scrollY + document.querySelector('#about').getBoundingClientRect().top - sectionPadding;
  //   const skillsScrollY = scrollY + document.querySelector('#skills').getBoundingClientRect().top - sectionPadding;
  //   const myWorkScrollY = scrollY + document.querySelector('#work').getBoundingClientRect().top - sectionPadding;
  //   const contactScrollY = scrollY + document.querySelector('#contact').getBoundingClientRect().top - sectionPadding;
  //   //   let menu;
  //   function menrScrollEvent(maneName) {
  //     navItem.forEach(function (item) {
  //       item.classList.remove('active');
  //     });
  //     let menu = document.querySelector(`[data-link="${maneName}"]`);
  //     menu.classList.add('active');
  //   }
});
