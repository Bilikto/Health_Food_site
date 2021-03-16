/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calculator() {
  //Calorie Calculator
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') == [sex]) {
        item.classList.add(activeClass);
      }

      if (item.getAttribute('data-ratio') == [ratio]) {
        item.classList.add(activeClass);
      }
    });
  };

  const calcResult = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  };

  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        item.classList.add(activeClass);
        calcResult();
      });
    });
  };

  const getDynamicInfo = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/ig)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcResult();
    });
  };

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  calcResult();
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/modal */ "./js/modules/modal.js");



function form(formSelector, modalSelector, timerId) {
  //Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thank you! We received your data.',
    failure: 'Ups.. something goes wrong.'
  };
  forms.forEach(form => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(e => {
        console.log(e);
        showThanksModal(message.failure);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(modalSelector, timerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)(modalSelector);
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/menuCard.js":
/*!********************************!*\
  !*** ./js/modules/menuCard.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menuCard() {
  //Menu Card
  class MenuCards {
    constructor(src, alt, title, descr, price, parent, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parent);
      this.classes = classes;
      this.defaultClass = 'menu__item';
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length == 0) {
        element.classList.add(this.defaultClass);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> $/day</div>
      </div> 
      `;
      this.parent.append(element);
    }

  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (menuCard);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModal": function() { return /* binding */ openModal; },
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; }
/* harmony export */ });
const openModal = (modalSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show', 'fade');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
};

const closeModal = modalSelector => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show', 'fade');
  document.body.style.overflow = '';
};

function modal(modalSelector, triggerSelector, modalTimerId) {
  //Modal
  const modal = document.querySelector(modalSelector),
        modalTriggerBtn = document.querySelectorAll(triggerSelector);
  modalTriggerBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target == modal || e.target.hasAttribute('data-close')) {
      closeModal(modalSelector);
    }
  });
  document.documentElement.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  prev,
  next,
  current,
  total,
  wrapper,
  field,
  slidesSelector
}) {
  //Slider
  const slider = document.querySelector(container),
        prevArrow = slider.querySelector(prev),
        nextArrow = slider.querySelector(next),
        currentCounter = slider.querySelector(current),
        totalCounter = slider.querySelector(total),
        slidesWrapper = slider.querySelector(wrapper),
        slidesField = slider.querySelector(field),
        slides = slider.querySelectorAll(slidesSelector),
        width = window.getComputedStyle(slidesWrapper).width;
  let slidesIndex = 1,
      offSet = 0;
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s All';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicator = document.createElement('ol'),
        dots = [];
  indicator.classList.add('carousel-indicators');
  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicator.append(dot);
    dots.push(dot);
  }

  const changeOpacity = () => {
    dots.forEach(dot => {
      dot.style.opacity = 0.5;
    });
    dots[slidesIndex - 1].style.opacity = 1;
  };

  const getCounterZero = () => {
    if (slidesIndex < 10) {
      totalCounter.textContent = `0${slides.length}`;
      currentCounter.textContent = `0${slidesIndex}`;
    } else {
      totalCounter.textContent = slides.length;
      currentCounter.textContent = slidesIndex;
    }
  };

  const deleteNotDigits = str => {
    return +str.replace(/\D/g, ''); //width.slice(0, width.length - 2)
  };

  nextArrow.addEventListener('click', () => {
    if (offSet == deleteNotDigits(width) * (slides.length - 1)) {
      offSet = 0;
    } else {
      offSet += deleteNotDigits(width);
    }

    slidesField.style.transform = `translate(-${offSet}px)`;

    if (slidesIndex == slides.length) {
      slidesIndex = 1;
    } else {
      slidesIndex++;
    }

    getCounterZero();
    changeOpacity();
  });
  prevArrow.addEventListener('click', () => {
    if (offSet == 0) {
      offSet = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offSet -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translate(-${offSet}px)`;

    if (slidesIndex == 1) {
      slidesIndex = slides.length;
    } else {
      slidesIndex--;
    }

    getCounterZero();
    changeOpacity();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideTo = dot.getAttribute('data-slide-to');
      slidesIndex = slideTo;
      offSet = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translate(-${offSet}px)`;
      getCounterZero();
      changeOpacity();
    });
  });
  getCounterZero();
  changeOpacity();
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tab.js":
/*!***************************!*\
  !*** ./js/modules/tab.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tab(tabParent, tabSelector, tabContent, activeClass) {
  //Tabs
  const tabsParent = document.querySelector(tabParent),
        tabs = document.querySelectorAll(tabSelector),
        tabsContent = document.querySelectorAll(tabContent);

  const hideTabContent = () => {
    tabsContent.forEach(content => {
      content.classList.remove('show', "fade");
      content.classList.add('hide');
    });
    tabs.forEach(tab => {
      tab.classList.remove(activeClass);
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', "fade");
    tabs[i].classList.add(activeClass);
  };

  tabsParent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains(tabSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (tab === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  hideTabContent();
  showTabContent();
}

/* harmony default export */ __webpack_exports__["default"] = (tab);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(parentSelector, deadLine) {
  //Timer
  const getTimeRemaining = endTime => {
    const total = Date.parse(endTime) - Date.parse(new Date()),
          days = Math.floor(total / (1000 * 60 * 60 * 24)),
          hours = Math.floor(total / (1000 * 60 * 60) % 24),
          minutes = Math.floor(total / 1000 / 60 % 60),
          seconds = Math.floor(total / 1000 % 60);
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const getZero = num => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerId = setInterval(updateTimer);

    function updateTimer() {
      const t = getTimeRemaining(endTime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t == 0) {
        clearInterval(timerId);
      }
    }

    updateTimer();
  };

  setTimer(parentSelector, deadLine);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const getResource = async url => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status ${response.status}`);
  }

  return await response.json();
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: data
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status ${response.status}`);
  }

  return await response.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tab */ "./js/modules/tab.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_menuCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/menuCard */ "./js/modules/menuCard.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");








window.addEventListener("DOMContentLoaded", () => {
  const timerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', timerId), 50000);
  (0,_modules_tab__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('.modal', '[data-modal]', timerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', "2022.03.10");
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
    container: '.offer__slider',
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
    current: '#current',
    total: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slidesSelector: '.offer__slide'
  });
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_modules_menuCard__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_6__.default)('form', '.modal', timerId);
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map