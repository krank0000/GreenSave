// //首頁-第一頁banner
// let tl_p1 = gsap.timeline({
//   scrollTrigger: {
//     trigger: "#index_p1",
//     // markers: false,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: false, //動畫播放是否以視窗滾動播放
//   },
// });

// tl_p1
//   .from(".piggy", {
//     duration: 0.5,
//     y: 50,
//     opacity: 0,
//   })
//   .from(".tree_R", {
//     duration: 0.5,
//     y: 50,
//     opacity: 0,
//   })
//   .from(".tree_L", {
//     duration: 0.5,
//     y: 50,
//     opacity: 0,
//   })
//   .from(".cloud", {
//     duration: 0.5,
//     // y: 50,
//     opacity: 0,
//   })
//   .from(".bird", {
//     duration: 0.5,
//     // y: 50,
//     x: 50,
//     opacity: 0,
//   })
//   .from(".actNow", {
//     duration: 0.5,
//     x: -50,
//     opacity: 0,
//   });

// //持續動畫
// gsap.to(".piggy", {
//   duration: 2,
//   y: 10,
//   repeat: -1,
//   yoyo: true,
//   ease: "power1.inOut",
// });

// gsap.from(".cloud_L", {
//   duration: 2,
//   x: 15,
//   repeat: -1,
//   yoyo: true,
//   ease: "none",
// });

// gsap.from(".cloud_M", {
//   duration: 2,
//   x: -15,
//   repeat: -1,
//   yoyo: true,
//   ease: "none",
// });

//首頁-第二頁----------------------------------------------
let tl_p2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#index_p2",
    markers: false,
    start: "top 50%",
    end: "bottom 50%",
    scrub: false, //動畫播放是否以視窗滾動播放
  },
});

tl_p2
  .from(".speech-bubble", {
    duration: 0.5,
    y: 50,
    opacity: 0,
  })
  .from(".block1", {
    duration: 0.5,
    x: -40,
    opacity: 0,
  })
  .from(".block2", {
    duration: 0.5,
    x: 40,
    opacity: 0,
  });

//首頁-第三頁----------------------------------------------
let tl_p3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#index_p3",
    // markers: true,
    start: "top 50%",
    end: "bottom 50%",
    scrub: false, //動畫播放是否以視窗滾動播放
  },
});

tl_p3
  .from(".Environment-bro", {
    duration: 0.5,
    y: 50,
    opacity: 0,
  })
  .from("section.p3", {
    duration: 1,
    y: 40,
    opacity: 0,
    rotateY: 180,
  });

gsap.from(".Environment-bro", {
  duration: 2,
  y: -5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

//首頁banner ScrollTrigger -----------------------------------------------

gsap.registerPlugin(ScrollTrigger);

// gsap.to(".bird", {
//   y: -50,
//   x: -100,
//   ease: "none",
//   scrollTrigger: {
//     markers: true,
//     trigger: "#index_p1",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//   },
// });

let bannerImg = document.querySelectorAll(".banner img");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  // console.log(scrollY);

  bannerImg[5].style.right = scrollY * 0.5 - 50 + "px";
});
