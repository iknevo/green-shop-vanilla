function slider() {
  const slides = document.querySelectorAll(".slide");

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
  }
  function nextSlide() {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  }

  const init = function () {
    goToSlide(0);
  };
  init();

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  setInterval(() => {
    nextSlide();
  }, 4000);
}
slider();
