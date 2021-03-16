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

  const getResource = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status ${response.status}`);
    }

    return await response.json();
  };

  getResource('http://localhost:3000/menu')
    .then(data => {
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

export default menuCard();