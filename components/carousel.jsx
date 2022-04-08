import React, { useEffect } from "react";

const OwlCarousel = ({
  name,
  responsive,
  showDots,
  showNavs,
  customNavs,
  autoplay,
  loop,
  autoplayTimeout,
  autoplaySpeed,
  autoplayHoverPause,
  children
}) => {
  useEffect(() => {
    window.jQuery = require("../public/js/jquery.min.js");
    window.Carousel = require("../public/js/owl.carousel.js");

    //handle responsive breakpoints
    let responsive_points = {};
    responsive &&
      Object.keys(responsive).map((key) => {
        let _obj = {};
        _obj[key] = responsive[key];

        responsive_points = {
          ...responsive_points,
          ..._obj,
        };
      });

    let owl = window.jQuery(`#${name}`);
    owl.owlCarousel({
      margin: 15,
      dots: showDots,
      nav: showNavs,
      autoplay: autoplay,
      loop: loop,
      autoplayTimeout: autoplayTimeout,
      autoplaySpeed: autoplaySpeed,
      autoplayHoverPause: autoplayHoverPause,
      responsive: responsive
        ? responsive_points
        : {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1280: {
            items: 3,
          },
          1600: {
            items: 4,
          },
          2560: {
            items: 6,
          },
        },
    });

    window.jQuery(".owl-dots").addClass("mt-0");
    console.log(document.getElementsByClassName("owl-dot"));
    let owl_buttons = document.getElementsByClassName("owl-dot");
    for (let _btn of owl_buttons) {
      _btn.setAttribute("aria-label", "Carousel Button");
      console.log(_btn);
    }

    //handle custom navigations
    customNavs &&
      //go to previous slide
      (window.jQuery(`#${customNavs.previous}`).on(
        "click",
        function () {
          owl.trigger("prev.owl.carousel");
        },
        false
      ),
        //go to next slide
        window.jQuery(`#${customNavs.next}`).on(
          "click",
          function () {
            owl.trigger("next.owl.carousel");
          },
          false
        ));
    //END handle custom navigations
  }, [children]);

  return (
    <div className="owl-carousel owl-theme mb-0 owl-loaded owl-drag" id={name}>
      {children}
    </div>
  );
};

export default OwlCarousel;
