function slider() {
  const slides = document.querySelectorAll(".slide");
  // const dotsContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    // activateDot(currentSlide);
  }
  function nextSlide() {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    // activateDot(currentSlide);
  }

  // const createDots = function () {
  //   slides.forEach(function (_, i) {
  //     dotsContainer.insertAdjacentHTML(
  //       "beforeend",
  //       `<button class="dots__dot" data-slide="${i}"></button>`
  //     );
  //   });
  // };

  // const activateDot = function (slide) {
  //   document
  //     .querySelectorAll(".dots__dot")
  //     .forEach((dot) => dot.classList.remove("active"));
  //   document
  //     .querySelector(`.dots__dot[data-slide="${slide}"]`)
  //     .classList.add("active");
  // };

  const init = function () {
    goToSlide(0);
    // createDots();
    // activateDot(0);
  };
  init();

  // dotsContainer.addEventListener("click", function (e) {
  //   if (e.target.classList.contains("dots__dot")) {
  //     const { slide } = e.target.dataset;
  //     goToSlide(slide);
  //     activateDot(slide);
  //   }
  // });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  setInterval(() => {
    nextSlide();
  }, 4000);
}
slider();
