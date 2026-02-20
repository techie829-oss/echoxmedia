document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loading Animation (Hero Section)
    const tl = gsap.timeline();

    tl.from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
        .from(".hero-title span, .hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.5")
        .from(".hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".hero-btns", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.6");

    // Scroll Animations for Sections

    // About Section (Mapmaker)
    gsap.from(".mapmaker-card", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        x: -50,
        rotation: -10,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    });

    gsap.from(".team-image-wrapper", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3
    });

    // Work Slider Animation (Swiper) - No entrance animations for absolute visibility
    const workSwiper = new Swiper(".workSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    // Services and Stats animations removed for absolute visibility

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const originalText = counter.innerText;
        let target = 0;
        let isMillion = false;

        if (originalText.includes('M')) {
            target = parseFloat(originalText.replace('M', '').replace('+', '')) * 1000000;
            isMillion = true;
        } else {
            target = parseFloat(originalText.replace('+', ''));
        }

        // Use a proxy object for GSAP to animate
        let proxy = { val: 0 };

        gsap.to(proxy, {
            val: target,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onUpdate: function () {
                const currentVal = Math.ceil(proxy.val);
                if (isMillion) {
                    counter.innerText = Math.floor(currentVal / 1000000) + "M+";
                } else {
                    counter.innerText = currentVal + "+";
                }
            }
        });
    });

    // Footer Animation
    gsap.from("footer .container > .row", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

});
