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






















});