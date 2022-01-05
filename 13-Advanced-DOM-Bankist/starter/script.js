'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// UNIT: Selecting, Creating & Deleting Elements

console.log(document.documentElement);

const header = document.querySelector('.header');

console.log(document.querySelectorAll('.section'));
const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// subunit: creating & inserting elements:
// insertAdjacentHTLM

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality & analytics.';
message.innerHTML =
  'We use cookies for improved functionality & analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
document.body.append(message.cloneNode(true));

header.before(message);
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

document.documentElement.style.setProperty('--color-primary', 'orangered');

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
console.log(logo.dataset.versionNumber);
console.log(logo.dataset.designerName);

// subunit: classes

logo.classList.add('j', 'a');
logo.classList.remove('j', 'a');
logo.classList.toggle('j', 'a');
logo.classList.contains('j', 'a');

// don't use:
// logo.className = 'jonas';

// UNIT: Implementing smooth scrolling:

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);

  // window.scrollTo(section1Coords.left, section1Coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// UNIT: Types of events and event

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  // alert('addEventLisener: Great!');
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// subunit: another way to add event listeners:

// h1.onmouseenter = function (e) {
//   // alert('addEventLisener: Great!');
//   console.log(e);
// };

// note: not great; addEventListener should be used instead. event listeners can also be added in HTML inline but also not preferred.

// UNIT: Event Propagation and Bubbling in Practice:

// rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rbg(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());
