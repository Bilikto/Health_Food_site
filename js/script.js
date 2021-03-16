import tab from './modules/tab';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import calculator from './modules/calculator';
import menuCard from './modules/menuCard';
import form from './modules/form';


window.addEventListener("DOMContentLoaded", () => {

  const timerId = setTimeout(openModal, 50000);

  tab('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  modal('.modal', '[data-modal]', timerId);
  timer('.timer', "2022.03.10");
  slider({
    container: '.offer__slider',
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
    current: '#current',
    total: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slidesSelector: '.offer__slide'
  });
  calculator();
  menuCard();
  form('form', '.modal', timerId);

});