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

    // адаптация gallery section.comedians

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
            loop: false,
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


    function checkScreenSize() {
        if (window.matchMedia('(max-width: 500px)').matches) {
            initSwiper();
        } else {
            destroySwiper();
        }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    // модальные окна section.comedians 
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalContent = document.querySelectorAll('[data-content-id]');
    const wrapperTriggers = document.getElementById('comedians');
    const closeBtns = document.querySelectorAll('[data-close]');
    function modalOpen(e) {
        const target = e.target;
        if (target && target.classList.contains('modal-btn')) {
            const triggerId = target.dataset.modalTrigger;
            modalContent.forEach(modal => {
                modal.style.display = 'none';
                modalContent[triggerId - 1].removeAttribute('style');
                modalContent[triggerId - 1].showModal();
                modalContent[triggerId - 1].classList.add('active');
            });
            modalContent[triggerId - 1].showModal();
            modalContent[triggerId - 1].classList.add('active');

        };
    };
    function closeModal() {
        modalContent.forEach(modal => {
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                modal.removeAttribute('style');
                modal.close();
            }
        });
    }
    function modalHandler(e) {
        const target = e.target;
        if (target) {
            if (target.hasAttribute('data-modal-trigger')) return;
            if (target.hasAttribute('data-close')) closeModal();
            if (!target.closest('.modal__inner')) closeModal();

        };
    };
    document.addEventListener('click', modalHandler);
    wrapperTriggers.addEventListener('click', modalOpen);


    // swiper корусель section.media, section.special
    const mediaSwiper = new Swiper('.media__swiper', {

        navigation: {
            nextEl: '.media__swiper-next',
            prevEl: '.media__swiper-prev',
        },
        breakpoints: {
            320: {
                initialSlide: 0,
                slidesPerView: 'auto',
                spaceBetween: 10,
                // centeredSlides: true,
            },
            500: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            }
        },
    });
    const createSwiperOptions = (nextEl, prevEl) => ({
        navigation: {
            nextEl,
            prevEl,
        },
        breakpoints: {
            320: {
                initialSlide: 0,
                slidesPerView: 1.1,
                spaceBetween: 20,
                // centeredSlides: true,
            },
            500: {
                initialSlide: 0,
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
            },
            1024: {
                initialSlide: 1,
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    const dinnerSwiper = new Swiper('.dinner__swiper', createSwiperOptions('.dinner__swiper-next', '.dinner__swiper-prev'));
    const specialSwiper = new Swiper('.special__swiper', createSwiperOptions('.special__swiper-next', '.special__swiper-prev'));

    // обработка формы .special>form
    const telInput = document.getElementById('tel');
    VMasker(telInput).maskPattern('+9 (999) 999-99-99')
    console.dir(telInput)
    telInput.addEventListener('input', function (event) {
        const target = event.target
        console.log(target.value);
        target.value = `+7${target.value.slice(2)} `;
    });


    async function initMap() {
        await ymaps3.ready;
        console.log(ymaps3)
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapDefaultMarker } = ymaps3;

        const map = new YMap(
            document.getElementById('map'),
            {
                location: {
                    center: [76.912204, 43.236141],
                    zoom: 12
                },
                theme: 'dark',

            }
        );
        // map.addChild(new YMapDefaultMarker({
        //     coordinates: [34, 54],
        //     title: 'Hello World!',
        //     subtitle: 'kind and bright',
        //     color: 'blue'
        // }));

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());
        const markerElement = document.createElement('img');
        markerElement.classList.add('marker')
        markerElement.src = 'images/map-icon.svg';

        markerElement.style.height = '54px';
        markerElement.style.width = '54px';
        markerElement.style.position = 'relative';
        markerElement.style.top = '-54px'; 
        markerElement.style.left = '-27px';

        
        const markerElement2 = document.createElement('img');
        markerElement2.classList.add('marker')
        markerElement2.src = 'images/map-icon.svg';
        const marker = new YMapMarker(
            {
                // source: 'images/map-icon.svg', %2
                coordinates: [76.919107, 43.246407],
                // draggable: true,
                mapFollowsOnDrag: true,
                copyrightsPosition: "center center"
            },
            markerElement
        );

        map.addChild(marker);
        const marker2 = new YMapMarker(
            {
                // source: 'images/map-icon.svg',   %2C
                coordinates: [76.93139, 43.243735],
                // draggable: true,
                mapFollowsOnDrag: true,
                iconImageOffset: [-27, -54],
            },
            markerElement2
        );

        map.addChild(marker2);
    }

    initMap();



});









