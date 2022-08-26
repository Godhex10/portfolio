const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    skillsCounter();
});


const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

window.addEventListener("scroll", () =>{
   if(!skillsplayed) skillsCounter();
});

/* ----------- Sticky Navbar ------- */

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* ----------- REVEAL ANIMATION ------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal("showcase-info", {delay: 600});
sr.reveal("showcase-image", {delay: 600});

/* ----------- SKILLS PROGRESS BAR ANIMATION ------- */

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if(Window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum){
    let currentNum = +num. innerText;
    
    if (currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsplayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;

    skillsplayed = true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });
   
    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out fowards")
    );
}

/* ----------- Portfolio filter ANIMATION ------- */

let mixer = mixitup(".portfolio-gallery",{
    selectors: {
        target: ".prt-card"
    },
    animation:{
        duration: 500,
    },
});


/* ----------- MODAL POP UP ANIMATION ------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    /*document.body.classList.add("stopScrolling");*/
    currentIndex = i;
    changeImage(currentIndex);
})
);

modal_overlay.addEventListener("click", () => { 
    prt_section.classList.remove("open")
    
});

prev_btn.addEventListener("click", () => {
    if(currentIndex === 0){
      currentIndex = 5;
    }else {
    currentIndex--;
    }
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if(currentIndex === 5){
        currentIndex = 0;
    } else {
    currentIndex++;
    }
    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach((img) => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/* ----------- SWIPER ANIMATION ------- */
const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 500,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


/* ----------- CHANGE PAGE THEME ------- */

function changeTheme() {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
    } else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon"); 
           
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme();
});


/* ----------- OPEN AND CLOSE NAVBAR  ------- */

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("StopScrolling");
});

links.forEach((link) => 
    link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("StopScrolling");
}))