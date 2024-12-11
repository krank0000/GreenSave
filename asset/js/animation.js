//首頁-第一頁banner
let tl_p1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#index_p1",
    markers: false,
    start: "top top",
    end: "bottom bottom",
    scrub: false, //動畫播放是否以視窗滾動播放
  },
});

tl_p1
  .from(".piggy", {
    duration: 0.5,
    y: 50,
    opacity: 0,
  })
  .from(".tree_R", {
    duration: 0.5,
    y: 50,
    opacity: 0,
  })
  .from(".tree_L", {
    duration: 0.5,
    y: 50,
    opacity: 0,
  })
  .from(".cloud", {
    duration: 0.5,
    // y: 50,
    opacity: 0,
  })
  .from(".bird", {
    duration: 0.5,
    y: 50,
    x: 50,
    opacity: 0,
  })
  .from(".actNow", {
    duration: 0.5,
    x: -50,
    opacity: 0,
  });

//持續動畫
gsap.to(".piggy", {
  duration: 2,
  y: 10,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

gsap.from(".cloud_L", {
  duration: 2,
  x: 15,
  repeat: -1,
  yoyo: true,
  ease: "none",
});

gsap.from(".cloud_M", {
  duration: 2,
  x: -15,
  repeat: -1,
  yoyo: true,
  ease: "none",
});

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
