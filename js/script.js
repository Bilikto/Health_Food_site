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

  const timerId = setTimeout(openModal, 30000);

















});