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
    const swiperTop = new Swiper('.promo__marquee', {
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






    // адаптация gallery

    const gallery = document.getElementById('gallery');
    const lastColumn = document.getElementById('column-4');
    const comediansColLast = lastColumn.querySelectorAll('.comedians__comedian');
    const otherColumns = document.querySelectorAll('.comedians__column');
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');

    function redistributeItems() {
        lastColumn.style.display = "none"
        comediansColLast.forEach((item, index) => {
            const targetColumn = otherColumns[index % otherColumns.length];
            targetColumn.appendChild(item);
        });
    };
    function returnItemsToLastColumn() {
        lastColumn.removeAttribute('style');
        comediansColLast.forEach((item) => {
            lastColumn.appendChild(item);
        });
    };

    function handleMediaQueryChange(e) {
        if (e.matches) {
            redistributeItems();
        } else {
            returnItemsToLastColumn();
        }
    }

    mediaQuery768.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery768);

    let swiperComedians = null;

    function initSwiper() {
        swiperComedians = new Swiper('.comedians__swiper', {
            // centeredSlides: true,
            slidesPerView: 'auto',
            grabCursor: true,
            freeMode: false,
            loop: true,
            mousewheel: false,
            spaceBetween: 20,
            keyboard: {
                enabled: true
            },

            navigation: {
                nextEl: '.comedians__swiper-next',
                prevEl: '.comedians__swiper-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
            },
        });
    }

    function destroySwiper() {
        if (swiperComedians !== null) {
            swiperComedians.destroy(true, true);
            swiperComedians = null;
        }
    }

    // Проверка ширины экрана при загрузке страницы и при изменении размера окна
    function checkScreenSize() {
        if (window.matchMedia('(max-width: 500px)').matches) {
            initSwiper();
        } else {
            destroySwiper();
        }
    }

    // Проверяем размер экрана при загрузке страницы
    checkScreenSize();

    // Проверяем размер экрана при изменении размера окна
    window.addEventListener('resize', checkScreenSize);
});





