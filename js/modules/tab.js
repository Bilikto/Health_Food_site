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

  tabsParent.addEventListener('click', (e) => {
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

export default tab;