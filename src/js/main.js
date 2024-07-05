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
    telInput.addEventListener('input', function (event) {
        const target = event.target;
        target.value = `+7${target.value.slice(2)} `;
    });


    // настройка карты , табы section.places
    const places = [{
        title: 'all',
        coord: [76.927728, 43.241132],
        zoom: 14
    },

    {
        title: "HM Lounge Bar",
        coord: [76.919107, 43.246407],
        mapFollowsOnDrag: true,
        copyrightsPosition: "center center",
        zoom: 17
    },
    {
        title: 'Coffee House Grain',
        coord: [76.93139, 43.243735],
        mapFollowsOnDrag: true,
        copyrightsPosition: "center center",
        zoom: 17
    },
    {
        title: 'Harats Irish Pub на Бульваре',
        coord: [76.923477, 43.232472],
        mapFollowsOnDrag: true,
        copyrightsPosition: "center center",
        zoom: 17
    },
    {
        title: 'Munchen',
        coord: [76.934375, 43.244867],
        mapFollowsOnDrag: true,
        copyrightsPosition: "center center",
        zoom: 17
    }

    ];
    let map;
    async function initMap(center, zoom) {
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapProps } = ymaps3;

        map = new YMap(
            document.getElementById('map'),
            {
                location: {
                    center: center,
                    zoom: zoom
                },
                theme: 'dark',

            }
        );
        // map.addChild(new YMapProps());
        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());
        function createHTMLMarker() {
            const markerHTML = document.createElement('img');
            markerHTML.classList.add('marker')
            markerHTML.src = 'images/map-icon.svg';
            markerHTML.style.height = '54px';
            markerHTML.style.width = '54px';
            markerHTML.style.position = 'relative';
            markerHTML.style.top = '-54px';
            markerHTML.style.left = '-27px';
            return markerHTML;
        }
        function mapHandler(places) {

            places.forEach(place => {

                const { title, coord, mapFollowsOnDrag, copyrightsPosition } = place;
                const markerHTML = createHTMLMarker();


                const marker = new YMapMarker(
                    {
                        coordinates: coord,
                        mapFollowsOnDrag: mapFollowsOnDrag,
                        copyrightsPosition: copyrightsPosition
                    },
                    markerHTML
                );
                map.addChild(marker);
            });
        };
        mapHandler(places);
    }
    initMap([76.927728, 43.241132], 14);

    const placesTriggers = document.querySelector('.places__triggers');
    const placeTriggerBtns = document.querySelectorAll('.places__triggers-btn');
    const placeCaption = document.querySelectorAll('.places__caption');
    function removeClassesTriggers() {
        placeTriggerBtns.forEach((btn, index) => {
            btn.classList.remove('active');
            placeCaption[index].classList.remove('active');
        });
    }

    function tabMaps(e) {
        const target = e.target;

        if (target && target.hasAttribute('data-trigger')) {
            removeClassesTriggers();
            target.classList.add('active');
            document.querySelector(`[data-content="${target.dataset.trigger}"]`).classList.add('active');
            places.forEach(place => {
                const { title, coord, zoom } = place;
                if (target.dataset.trigger === title) {
                    map.destroy();
                    initMap(coord, zoom);
                }
            });
        }

    };
    placesTriggers.addEventListener('click', tabMaps);





    // якорные ссылки

    const links = document.querySelectorAll('.anchors-link');
    const mobileMenu = document.getElementById('menu-mobile');


    mobileMenu.addEventListener('click', function (e) {
        const target = e.target;
        links.forEach((item, index) => {
            if (target && target === item) {
                buttonMenu.classList.remove('active');
                menuMobile.classList.remove('active');
                document.body.classList.remove('active');
            }
        })
    })

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {

            event.preventDefault();


            const sectionId = link.getAttribute('data-href').substring(1);;


            if (sectionId === 'header') {

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
                const section = document.getElementById(`${sectionId}`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }


        });
    });
});









