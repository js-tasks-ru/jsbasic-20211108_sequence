/*
  Alternatively, this function can be used for only the initial turning
  off of the left arrows. In this case it will be necessary to write an
  additional, similar, function which operates only on single sets of
  arrows. This would allow for an optimized case where there is a big
  number of carousels on a page.
*/
function arrowStat(leftArrows, rightArrows, counters, marginValue) {
  for (let i = 0; i < rightArrows.length; i++) {
    if (counters[i] === marginValue) {
      leftArrows[i].style.display = 'none';
    }
    else {
      leftArrows[i].style.display = '';
    }
  }
}

/*
  This is a generalized function, which admits that there may be more than one set
  of left / right arrows (that is, more than one carousel on a page).
  Each set of arrows (carousel) has its own click counter. Another
  generalization allows for an arbitrary amount of slides in each carousel.
  In light of this, it is much easier to use the traditional for loop with
  iteration over a numeric index.
*/
function initCarousel() {
  let rightArrows = document.getElementsByClassName("carousel__arrow_right");
  let leftArrows = document.getElementsByClassName("carousel__arrow_left");
  let clickCounter = []; // Click counters per carousel
  let totalSlidesCount = document.getElementsByClassName("carousel__slide").length;
  let carouselsCount = document.getElementsByClassName("carousel").length;
  let slidesCount = totalSlidesCount / carouselsCount;

  // Initialize click counters
  for (let i = 0; i < rightArrows.length; i++) {
    clickCounter[i] = 0;
  }

  // Initially the left arrows are turned off
  arrowStat(leftArrows, rightArrows, clickCounter, 0);

  for (let i = 0; i < rightArrows.length; i++) {
    rightArrows[i].onclick = function() {
      let carouselInner = rightArrows[i].nextElementSibling.nextElementSibling;
      let offset = carouselInner.offsetWidth;
      ++clickCounter[i];
      carouselInner.style.transform = `translateX(${-offset * clickCounter[i]}px)`;
      arrowStat(leftArrows, rightArrows, clickCounter, 0);
      arrowStat(rightArrows, leftArrows, clickCounter, slidesCount - 1);
    };
  }

  for (let i = 0; i < leftArrows.length; i++) {
    leftArrows[i].onclick = function() {
      let carouselInner = rightArrows[i].nextElementSibling.nextElementSibling;
      let offset = carouselInner.offsetWidth;
      clickCounter[i]--;
      carouselInner.style.transform = `translateX(${-offset * clickCounter[i]}px)`;
      arrowStat(leftArrows, rightArrows, clickCounter, 0);
      arrowStat(rightArrows, leftArrows, clickCounter, slidesCount - 1);
    };
  }
}
