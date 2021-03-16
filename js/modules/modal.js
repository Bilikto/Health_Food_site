const openModal = (modal, modalTimerId) => {
  modal.classList.add('show', 'fade');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
};

const closeModal = (modal) => {
  modal.classList.add('hide');
  modal.classList.remove('show', 'fade');
  document.body.style.overflow = '';
};

function modal(modalSelector, triggerSelector, modalTimerId) {
  //Modal
  const modal = document.querySelector(modalSelector),
        modalTriggerBtn = document.querySelectorAll(triggerSelector);
        
  modalTriggerBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal(modal, modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.hasAttribute('data-close')) {
      closeModal(modal);
    }
  });

  document.documentElement.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modal);
    }
  });

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
      openModal(modal, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;