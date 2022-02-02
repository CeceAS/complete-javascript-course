'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('nav');

// Tabbed Components:
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Btn Scrolling:

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation

// note: using event delegation:

// 1. Add event listener to common parent element:
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  // note: Jonas' matching strategy:
  // if (e.target.classList.contains('nav__link')) {
  //   const id = e.target.getAttribute('href');
  //   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  // }

  // note: my alternate matching strategy :
  const id = e.target.getAttribute('href');
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
});

//  add event listener to tab buttons:
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause: basically an if statement that will return early (exit the whole fxn) if a condition isn't matched.
  if (!clicked) return;

  // remove the "active" class from the btns and content, before adding it to the clicked btn and tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //  active tab and content area (add active class to clicked content and button):
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Adding sticky navigation:

// window.addEventListener('scroll', function (e) {
//   // console.log(window.scrollY);

//   // note: for sticky nav as soon as scrolled:
//   // if (window.scrollY > 5) nav.classList.add('sticky');
//   // if (window.scrollY === 0) nav.classList.remove('sticky');

//   // note: for sticky nav at specific section:

//   const initialCoord = section1.getBoundingClientRect();
//   const absoluteCoord = initialCoord.top + window.scrollY;

//   if (window.scrollY > absoluteCoord) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// UNIT: Intersection Observer:

// subunit: implementing sticky scrolling:
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting === false && nav.classList.add('sticky');
  entry.isIntersecting && nav.classList.remove('sticky');
  // console.log(entry);
};

const headerobserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerobserver.observe(header);

// subunit: revealing sections on scroll:
// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.2,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

// subunit: implementing lazy loading:

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // replace src attribute with data-src:
  entry.target.src = entry.target.dataset.src;
  // remove lazy-img class when image is loaded:
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// subunit: creating a slider:
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide:
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
//
//
//
// NOTES BEGIN BELOW
//
//
//

// UNIT: Selecting, Creating & Deleting Elements

// console.log(document.documentElement);

// const header = document.querySelector('.header');

// console.log(document.querySelectorAll('.section'));
// const allSections = document.querySelectorAll('.section');

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');

// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// subunit: creating & inserting elements:
// insertAdjacentHTLM

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality & analytics.';
message.innerHTML =
  'We use cookies for improved functionality & analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
document.body.append(message.cloneNode(true));

// header.before(message);
header.after(message.cloneNode);

// delet elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// UNIT: Styles, attributes and classes

// subunit: Styles
message.style.backgroundColor = '#37383d';
message.style.width = '80%';

console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// subunit: attributes:

const logo = document.querySelector('.nav__logo');

console.log(logo.id);
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// non standard attributes:

console.log(logo.getAttribute('designer'));

// setting attributes:

logo.alt = 'Beautiful minimalist logo'; // stnd attributes
logo.setAttribute('company', 'sanclementeDesignCo'); //custom attributes

console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// subunit: data attributes
// console.log(logo.dataset.versionNumber);
// console.log(logo.dataset.designerName);

// subunit: classes

logo.classList.add('j', 'a');
logo.classList.remove('j', 'a');
logo.classList.toggle('j', 'a');
logo.classList.contains('j', 'a');

// don't use:
// logo.className = 'jonas';

// UNIT: Implementing smooth scrolling:

// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const section1Coords = section1.getBoundingClientRect();
//   console.log(section1Coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);

//   // window.scrollTo(section1Coords.left, section1Coords.top + window.pageYOffset);

//   // window.scrollTo({
//   //   left: section1Coords.left + window.pageXOffset,
//   //   top: section1Coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// UNIT: Types of events and event

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   // alert('addEventLisener: Great!');
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// subunit: another way to add event listeners:

// h1.onmouseenter = function (e) {
//   // alert('addEventLisener: Great!');
//   console.log(e);
// };

// note: not great; addEventListener should be used instead. event listeners can also be added in HTML inline but also not preferred.

// UNIT: Event Propagation and Bubbling in Practice:

// rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // stop propagation:
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('link!');
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('nav', e.target, e.currentTarget);
//   },
//   true
// );

// UNIT: DOM Traversing

const h1 = document.querySelector('h1');

// subunit: going downwards: selecting child elements

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

console.log(h1.textContent);
console.log(h1.innerHTML);

console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'white';

// subunit: going upwards: selecting parent elements:

console.log(h1.parentNode);
console.log(h1.parentElement);

console.log(h1.closest('.header'));
console.log(h1.closest('div'));

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// subunit: going sideways; selecting siblings:

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.childNodes);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale()';
});

// UNIT: Lifecycle DOM Events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
