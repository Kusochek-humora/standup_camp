'use strict';
document.addEventListener('DOMContentLoaded', function () {

    // бургер меню 
    const buttonMenu = document.getElementById('menu-btn'),
        menuMobile = document.getElementById('menu-mobile');
    function menuHandler(e) {
        const target = e.target;
        target.classList.toggle('active');
        menuMobile.classList.toggle('active');
        document.body.classList.toggle('active');
    }
    buttonMenu.addEventListener('click', menuHandler);


    // бегающая строка в section.promo
    const SwiperTop = new Swiper('.promo__marquee', {
        spaceBetween: 20,
        centeredSlides: true,
        speed: 6000,
        autoplay: {
            delay: 0,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: true,
    });

    // табы section.schedule 

    const mixer = mixitup('.schedule__content');

    const triggersContainer = document.getElementById('triggers');
    const tabsArray = document.querySelectorAll('.schedule__triggers-btn');

    function triggersHandler(e) {
        const target = e.target;
        if (target && target.classList.contains('schedule__triggers-btn')) {
            tabsArray.forEach(i => i.classList.remove('active'));
            target.classList.add('active');
        }
    };
    triggersContainer.addEventListener('click', triggersHandler);






// Вызываем функцию после инициализации Isotope и при изменении размера окна
// iso.on('arrangeComplete', centerIsotopeItems);
// window.addEventListener('resize', centerIsotopeItems);

// // Инициализация центрирования при загрузке страницы
// centerIsotopeItems();
});





