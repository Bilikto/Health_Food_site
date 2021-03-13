window.addEventListener("DOMContentLoaded", () => {

  //Tabs
  const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent');

  const hideTabContent = () => {
    tabsContent.forEach(content => {
      content.classList.remove('show', "fade");
      content.classList.add('hide');
    });

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', "fade");
    tabs[i].classList.add('tabheader__item_active');
  };

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
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


  //Modal
  const modal = document.querySelector('.modal'),
    modalTriggerBtn = document.querySelectorAll('[data-modal]');

  const openModal = () => {
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(timerId);
  };

  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
  };

  modalTriggerBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal());
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.hasAttribute('data-close')) {
      closeModal();
    }
  });

  document.documentElement.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  const timerId = setTimeout(openModal, 50000);


  //Timer
  const deadLine = "2022.03.10";

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor(total / (1000 * 60 * 60) % 24),
      minutes = Math.floor((total / 1000 / 60) % 60),
      seconds = Math.floor((total / 1000) % 60);

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const getZero = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = (endTime) => {
    const timer = document.querySelector('.timer'),
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

      if (t === 0) {
        clearInterval(timerId);
      }
    }
    updateTimer();
  };

  setTimer(deadLine);


  //Slider
  const slider = document.querySelector('.offer__slider'),
    prevArrow = slider.querySelector('.offer__slider-prev'),
    nextArrow = slider.querySelector('.offer__slider-next'),
    currentCounter = slider.querySelector('#current'),
    totalCounter = slider.querySelector('#total'),
    slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
    slidesField = slider.querySelector('.offer__slider-inner'),
    slides = slider.querySelectorAll('.offer__slide'),
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

  const deleteNotDigits = (str) => {
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
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  };


  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.addEventListener('click', (e) => {
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


  const getDynamicInfo = (selector) => {
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



















});