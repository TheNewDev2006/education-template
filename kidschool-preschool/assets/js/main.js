(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    );

    // Cursor start
    $(".cursor-animate").on("click", function () {
      $("body").removeClass("remove-animate-cursor");
    });

    $(".cursor-default").on("click", function () {
      $("body").addClass("remove-animate-cursor");
    });
    // Cursor end

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    // function toastMessage(messageType, messageTitle, messageText, messageIcon) {
    //   let $toastContainer = $("#toast-container");

    //   let $toast = $("<div>", {
    //     class: `toast-message ${messageType}`,
    //     html: `
    //   <div class="toast-message__content">
    //     <span class="toast-message__icon">
    //       <i class="${messageIcon}"></i>
    //     </span>
    //     <div class="flex-grow-1">
    //       <div class="d-flex align-items-start justify-content-between mb-1">
    //         <h6 class="toast-message__title">${messageTitle}</h6>
    //         <button type="button" class="toast-message__close">
    //           <i class="ph-bold ph-x"></i>
    //         </button>
    //       </div>
    //       <span class="toast-message__text">${messageText}</span>
    //     </div>
    //   </div>
    //   <div class="progress__bar"></div>
    // `,
    //   });

    //   $toastContainer.append($toast);

    //   setTimeout(() => {
    //     $toast.addClass("active");
    //   }, 50);

    //   let totalDuration = 3500;
    //   let startTime = Date.now();
    //   let remainingTime = totalDuration;
    //   let toastTimeout = setTimeout(hideToast, remainingTime);

    //   function hideToast() {
    //     $toast.removeClass("active");
    //     setTimeout(() => {
    //       $toast.remove();
    //     }, 500);
    //   }

    //   // Remove Toast on Close Button Click
    //   $toast.find(".toast-message__close").on("click", function () {
    //     $toast.removeClass("active");
    //     setTimeout(() => {
    //       $toast.remove();
    //     }, 500);
    //   });

    //   // Pause Timeout on Hover
    //   $toast.on("mouseenter", function () {
    //     remainingTime -= Date.now() - startTime;
    //     clearTimeout(toastTimeout);
    //   });

    //   // Resume Timeout on Mouse Leave
    //   $toast.on("mouseleave", function () {
    //     startTime = Date.now();
    //     toastTimeout = setTimeout(hideToast, remainingTime);
    //   });
    // }
    // ********************* Toast Notification Js End *********************

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle"
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================

    // ========================= AOS Js Start ===========================
    AOS.init({
      once: false,
    });
    // ========================= AOS Js End ===========================









// ================================ Floating Progress js start =================================
    const progressContainers = document.querySelectorAll(".progress-container");

    function setPercentage(progressContainer) {
      const percentage =
        progressContainer.getAttribute("data-percentage") + "%";

      const progressEl = progressContainer.querySelector(".progress");
      const percentageEl = progressContainer.querySelector(".percentage");

      progressEl.style.width = percentage;
      percentageEl.innerText = percentage;
      percentageEl.style.insetInlineStart = percentage;
    }

    // Intersection Observer to trigger progress animation when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view, start the progress animation
            const progressContainer = entry.target;
            setPercentage(progressContainer);
            progressContainer
              .querySelector(".progress")
              .classList.remove("active");
            progressContainer
              .querySelector(".percentage")
              .classList.remove("active");
            observer.unobserve(progressContainer); // Stop observing once animation is triggered
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value as needed (0.5 means half the section needs to be visible)
      }
    );

    // Start observing all progress containers
    progressContainers.forEach((progressContainer) => {
      observer.observe(progressContainer);
    });
    // ================================ Floating Progress js End =================================


  // =========================  Search Bar 9 Js Start ==============
  $(".open-search").on("click", function () {
    $(".search_popup").addClass("search-opened");
    $(".search-popup-overlay").addClass("search-popup-overlay-open");
  });
  $(".search_close_btn").on("click", function () {
    $(".search_popup").removeClass("search-opened");
    $(".search-popup-overlay").removeClass("search-popup-overlay-open");
  });
  $(".search-popup-overlay").on("click", function () {
    $(".search_popup").removeClass("search-opened");
    $(this).removeClass("search-popup-overlay-open");
  });
  // =========================  Search Bar 9 Js End ==============


  // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================



   // ============================ Banner Slider Js Start ===========================
    var bannerMenu = ['Air Freight', 'Ocean Freight', 'Land Transport']
    var bannerSwiper = new Swiper ('.banner-slider', {
      loop: true,
      speed: 800,
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 4500,
        disableOnInteraction: false, 
      },
      pagination: {
        el: '.banner-pagination',
        clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (bannerMenu[index]) + '</span>';
          },
      },

      // Navigation arrows
    });

    // Stop
    $('.banner-slider').on('mouseenter', function() {
      bannerSwiper.autoplay.stop();
    });

    // Start
    $('.banner-slider').on('mouseleave', function() {
      bannerSwiper.autoplay.start();
    });
    // ============================ Banner Slider Js End ===========================



    // ============== Magnific Popup Js Start =======================
      $('.popup-video-link').magnificPopup({
        type: 'iframe'
      });
      $('.gallery-popup').magnificPopup({
        type: 'image',
        gallery:{
          enabled:true
        }
      });
    // ============== Magnific Popup Js End =======================
    


    // =========================== testimonial js start ============================
    var swiper = new Swiper(".testimonial-swiper-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: true,
      speed: 3000,
      loop: true,
      autoplay: {
        delay:3000,
        disableOnInteraction: false
      },
      breakpoints: {
        300: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1199: {
            slidesPerView: 3,
        },
      }
    });
    // =========================== testimonial js end ============================


    // ======================== brand slider js start =====================
    var swiper = new Swiper(".brand-swiper__slider", {
      slidesPerView: 6,
      spaceBetween: 30, 
      autoplay: true,
      speed: 1500,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      breakpoints: {
        300: {
            slidesPerView: 2,
        },
        575: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        992: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 6,
        },
      }
    });
    // ======================== brand slider js end ======================



    // ============================= teacher four js start =========================
    var TeacherBottomFourSlider = new Swiper(".teacher-bottom-four-slider", {
      slidesPerView: 3,
      spaceBetween: 20, 
      autoplay: true,
      speed: 1500,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      breakpoints: {
        300: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1199: {
            slidesPerView: 3,
        },
      }
    });
    // ============================= teacher four js end =========================



    // ========================== testimonial two slider js start =========================
    var swiper = new Swiper(".testimonial-two-slider", {
      slidesPerView: 1,
      autoplay: true,
      speed: 1500,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: "#testimonial-tw-button-next",
        prevEl: "#testimonial-tw-button-prev",
      },
    });
    // ========================== testimonial two slider js end =========================




    // ========================= testimonial three slider js start =============================
    var swiper = new Swiper(".testimonial-three-button-slider", {
      slidesPerView: 1,
      speed: 1500,
      loop: true,
      navigation: {
        nextEl: "#testimonial-three-button-next",
        prevEl: "#testimonial-three-button-prev",
      },
    });
    // ========================= testimonial three slider js end =============================



    // ======================== our program js start ========================
    var swiper = new Swiper(".our-program-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: true,
      speed: 2500,
      loop: true,
      autoplay: {
        delay:2500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: "#our-program-button-next",
        prevEl: "#our-program-button-prev",
      },
      breakpoints: {
        300: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1199: {
            slidesPerView: 3,
        },
      }
    });
    // ======================== our program js end ========================










    // // ================================= Brand slider Start =========================
    // var brandSlider = new Swiper('.brand-slider', {
    //   autoplay: {
    //     delay: 2000,
    //     disableOnInteraction: false
    //   },
    //   autoplay: true,
    //   speed: 1500,
    //   grabCursor: true,
    //   loop: true,
    //   slidesPerView: 7,
    //   breakpoints: {
    //       300: {
    //           slidesPerView: 2,
    //       },
    //       575: {
    //           slidesPerView: 3,
    //       },
    //       768: {
    //           slidesPerView: 4,
    //       },
    //       992: {
    //           slidesPerView: 5,
    //       },
    //       1200: {
    //           slidesPerView: 6,
    //       },
    //       1400: {
    //           slidesPerView: 7,
    //       },
    //   }
    // });
    // // ================================= Brand slider End =========================

    // ========================= Counter Up Js End ===================
    const counterUp = window.counterUp.default;

    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 1500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };
    const IO = new IntersectionObserver(callback, { threshold: 1 });

    // Banner statistics Counter
    const statisticsCounter = document.querySelectorAll(".counter");
    if (statisticsCounter.length > 0) {
      statisticsCounter.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }

    // performance Count
    const performanceCount = document.querySelectorAll(".counter");
    if (performanceCount.length > 0) {
      performanceCount.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }
    // ========================= Counter Up Js End ===================

    // ========================== Add Attribute For Bg Image Js Start ====================
    // $(".background-img").css('background', function () {
    //   var bg = ('url(' + $(this).data("background-image") + ')');
    //   return bg;
    // });
    // ========================== Add Attribute For Bg Image Js End =====================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".loader-mask").fadeOut();
  });
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================
})(jQuery);
