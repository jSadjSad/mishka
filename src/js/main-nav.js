'use strict';

let pageHeader = document.querySelector('.page-header');
let pageHeaderToggle = document.querySelector('.page-header__toggle');

pageHeader.classList.remove('no--js');

pageHeaderToggle.addEventListener('click', function() {
  if (pageHeader.classList.contains('page-header--closed')) {
     pageHeader.classList.remove('page-header--closed');
     pageHeader.classList.add('page-header--opened');
     pageHeaderToggle.classList.remove('page-header__toggle--open');
     pageHeaderToggle.classList.add('page-header__toggle--close');
  } else {
    pageHeader.classList.remove('page-header--opened');
    pageHeader.classList.add('page-header--closed');
    pageHeaderToggle.classList.remove('page-header__toggle--close');
    pageHeaderToggle.classList.add('page-header__toggle--open');
  }
});
