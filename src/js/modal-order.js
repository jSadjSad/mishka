'use strict';

let orderButton = document.querySelector('.feature__order-btn');
let modalOverlay = document.querySelector('.modal__overlay');
let modalOrder = document.querySelector('.modal--order');
let modalOrderCloseButton = modalOrder.querySelector('.modal__close');

let openPopUpOrder = function() {
  modalOverlay.classList.remove('hidden');
  modalOrder.classList.remove('hidden');

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      modalOverlay.classList.add('hidden');
      modalOrder.classList.add('hidden');
    }
  });
};

let closePopUpOrder = function() {
  modalOverlay.classList.add('hidden');
  modalOrder.classList.add('hidden');
};

orderButton.addEventListener('click', function() {
  event.preventDefault();
  openPopUpOrder();
});

orderButton.addEventListener('keydown', function(evt) {
  event.preventDefault();
  if (evt.keyCode === 13) {
  openPopUpOrder();
  }
});

modalOrderCloseButton.addEventListener ('click', function() {
  closePopUpOrder();
});

modalOrderCloseButton.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    closePopUpOrder();
  }
});
