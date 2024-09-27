var swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
      200: {
        slidesPerView: 1,
      },
    },
    on: {
      touchStart: function () {
        document.querySelector('.swiper').classList.add('swiper-grabbing');
      },
      touchEnd: function () {
        document.querySelector('.swiper').classList.remove('swiper-grabbing');
      },
      sliderFirstMove: function () {
        document.querySelector('.swiper').classList.add('swiper-grabbing');
      },
      slideChangeTransitionEnd: function () {
        document.querySelector('.swiper').classList.remove('swiper-grabbing');
      }
    }
  });