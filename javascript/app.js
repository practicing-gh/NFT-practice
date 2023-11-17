const hamMenu = document.querySelector(".nav-ham");
const mobileMenu = document.querySelector(".nav-list");
const hamMenuLinks = document.querySelectorAll(".nav-menu__item");
const counting = document.querySelectorAll(".counting__count");
const hourRemaining = document.querySelectorAll(".time-hours__text");
const minuteRemaining = document.querySelectorAll(".time-minutes__text");
const secondRemaining = document.querySelectorAll(".time-seconds__text");
const likeBtn = document.querySelectorAll(".trending-option__like-svg");

function toggleMobileMenu() {
  hamMenu.classList.toggle("nav-ham--active");
  if (hamMenu.classList.contains("nav-ham--active")) {
    mobileMenu.style.left = "0";
  } else {
    mobileMenu.style.left = "-35rem";
  }
}

let interval = 3000;
counting.forEach((count) => {
  let startValue = 0;
  let endValue = parseFloat(count.dataset.value);
  let duration = Math.floor(interval / endValue);

  let counter = setInterval(() => {
    if (!Number.isInteger(endValue)) {
      startValue += 0.5;
    } else {
      startValue += 1;
    }
    count.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

hamMenu.addEventListener("click", toggleMobileMenu);
document.addEventListener("click", (event) => {
  if (!hamMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
    hamMenu.classList.remove("nav-ham--active");
    mobileMenu.style.left = "-35rem";
  }
});

hamMenuLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    document
      .querySelector(".nav-menu__item--active")
      .classList.remove("nav-menu__item--active");
    this.classList.add("nav-menu__item--active");
  });
});

likeBtn.forEach((likeSvg) => {
  likeSvg.addEventListener("click", (event)=> {
    console.log(event);
  event.target.classList.toggle("trending-option__like-svg--fill")
})})

const targetTime = new Date();
targetTime.setHours(23, 59, 59, 999);
function updateTimer (){
    const curruntTime = new Date();
    let remainingTime = targetTime.getTime() - curruntTime.getTime();
    let hours = Math.floor(remainingTime / (1000 * 60 *60));
    let minutes = Math.floor(remainingTime % (1000 * 60 *60) / (1000 * 60));
    let seconds = Math.floor(remainingTime % (1000 * 60) / 1000);
    
    hourRemaining.forEach((hour) => {
      hour.innerHTML = hours;
      if(remainingTime < 0) {
        hour.innerHTML = "00";
      }
    });
    minuteRemaining.forEach((min) => {
      min.innerHTML = minutes;
      if(remainingTime < 0) {
        min.innerHTML = "00";
      }
    })
      secondRemaining.forEach((sec) => {
        sec.innerHTML = seconds;
        if(remainingTime < 0) {
          sec.innerHTML = "00";
        }
      })
  
      if(remainingTime < 0) {
        targetTime.setDate(targetTime.getDate() + 1)
      }
  }
let remainingCount = setInterval(updateTimer, 1000);

