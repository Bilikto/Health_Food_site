function slider({container, prev, next, current, total, wrapper, field, slidesSelector}) {
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
}

export default slider;