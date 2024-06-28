'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const buttonMenu = document.getElementById('menu-btn'),
        menuMobile = document.getElementById('menu-mobile');

    function menuHandler(e) {
        const target = e.target;
        target.classList.toggle('active');
        menuMobile.classList.toggle('active');
        document.body.classList.toggle('active');
    }
    buttonMenu.addEventListener('click', menuHandler);
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
});