'use strict';

// 함수 > 클릭 시 : 원하는 위치로 스크롤 이동
function scrollIntoView(location) {
  window.scrollTo({
    top: location,
    behavior: 'smooth',
  });
}
// 스트롤 다운 시: 효과 함수
function scrollDownEffect(obj, scrollPosition, effect) {
  if (window.scrollY > scrollPosition) {
    obj.classList.add(effect);
  } else {
    obj.classList.remove(effect);
  }
}

const mobileDevice = 767;

let sectionPaddingTop;
function responsivePadding() {
  if (window.innerWidth > mobileDevice) {
    sectionPaddingTop = 180;
  } else {
    sectionPaddingTop = 100;
  }
}
responsivePadding();
window.addEventListener('resize', () => {
  responsivePadding();
});

// 헤더: scroll style
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
scrollDownEffect(header, headerHeight, 'scroll');
window.addEventListener('scroll', () => {
  scrollDownEffect(header, headerHeight, 'scroll');
});

// nav 메뉴 클릭 시 : 해당 컨텐츠로 스크롤
// nav 메뉴 클릭 시 : 버튼 style
const navBar = document.querySelector('.navbar--manu');
const navItem = document.querySelectorAll('.navbar--manu .navbar--manu--item .tx');

navBar.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'SPAN') {
    const targetLink = target.dataset.link;
    const targetCont = document.querySelector(`#${targetLink}`);
    const targetContLocation = targetCont.offsetTop;

    scrollIntoView(targetContLocation - sectionPaddingTop);

    // 모바일 디바이스 : 메뉴 클릭 시 메뉴 가리기
    header.classList.remove('open');

    // 메뉴 클릭 시 : 버튼 클래스 'active'
    navItem.forEach(function (item) {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
});
// 모바일 디바이스 : 모바일 메뉴 버튼 클릭 이벤트
const navBtn = document.querySelector('.open--btn');
navBtn.addEventListener('click', () => {
  header.classList.toggle('open');
});
window.addEventListener('resize', () => {
  if (window.innerWidth > mobileDevice) {
    header.classList.remove('open');
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
const contactBtn = document.querySelector('.contact');
contactBtn.addEventListener('click', () => {
  const location = document.querySelector('#contact').offsetTop;
  scrollIntoView(location);
});
// home "contact me" 버튼: fade out
scrollDownEffect(contactBtn, 100, 'fadeOut');
window.addEventListener('scroll', () => {
  scrollDownEffect(contactBtn, 100, 'fadeOut');
});

// work project 리스트 필터
const workCategories = document.querySelector('.work--categories');
const projectsContainer = document.querySelector('.work--projects');
const projects = document.querySelectorAll('.work--projects .project');

workCategories.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // work category 클릭 시: active
  const activeBtn = document.querySelector('.category.active');
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  activeBtn.classList.remove('active');
  target.classList.add('active');

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
// work category count 읽고 작성하기
const categoryAllCount = document.querySelector('.category[data-filter="all"] .count');
const categoryPublCount = document.querySelector('.category[data-filter="publishing"] .count');
const categoryDesignCount = document.querySelector('.category[data-filter="design"] .count');
categoryAllCount.innerHTML = projects.length;
categoryPublCount.innerHTML = document.querySelectorAll('.project[data-type="publishing"]').length;
categoryDesignCount.innerHTML = document.querySelectorAll('.project[data-type="design"]').length;

// 컨텐츠 위치와 메뉴 active 매칭
const contents = document.querySelectorAll('.content');
const contentIds = [];
contents.forEach((item) => {
  contentIds.push(`${item.id}`);
});

const sections = contentIds.map((id) => document.querySelector(`#${id}`));
const navItems = contentIds.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

let selectedNavIndex = 0;
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = contentIds.indexOf(entry.target.id);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      selectNavItem(navItems[selectedNavIndex]);
    }
  });
};
const option = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
};
const contentObserver = new IntersectionObserver(callback, option);
sections.forEach((content) => {
  contentObserver.observe(content);
});

window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
