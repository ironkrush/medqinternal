import React, { useEffect } from 'react';
import gsap from 'gsap';
import MedicineImg from '../assets/images/medicine.png'
import HCard1 from '../assets/images/final_hd_image.png'
import HCard2 from '../assets/images/queue_homepage.png'
import HCard3 from '../assets/images/Bed_homepage.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/homepage.css';

const HomePage = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const marquee = document.querySelector(".marquee-part");
        let scroll = 0;
        let isScrollingDown = true;
        let lastScrollLeft = 0;

        let TWEEN = gsap.to(".marquee-part", {
            xPercent: -100,
            repeat: -1,
            duration: 5,
            ease: "linear",
        }).totalProgress(0.5);

        marquee.addEventListener("mousemove", (e) => {
            if (!isScrollingDown) return;
            e.preventDefault();
            const x = e.pageX - marquee.offsetLeft;
            const walk = (x - scroll) * 3;
            marquee.scrollLeft = scroll - walk;

            // Skew effect
            let diff = marquee.scrollLeft - lastScrollLeft;
            let speed = diff * 0.40;
            marquee.style.transform = `skew(${speed}deg)`;
            lastScrollLeft = marquee.scrollLeft;
        });

        window.onscroll = () => {
            marquee.style.left = `${-window.scrollX}px`;
        };

        const nav = document.querySelector(".glassin-nav");

        const handleMouseMove = (e) => {
            let x = e.clientX - nav.getBoundingClientRect().left;
            let y = e.clientY - nav.getBoundingClientRect().top;

            nav.style.setProperty("--x", x + "px");
            nav.style.setProperty("--y", y + "px");
        };

        nav.addEventListener("mousemove", throttle(handleMouseMove, 100));

        const medicine = document.querySelector('.medicine');

        document.addEventListener('mousemove', (event) => {
            const rect = medicine.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = ((event.clientX - centerX) / rect.width) * 10;
            const offsetY = ((event.clientY - centerY) / rect.height) * 10;
            medicine.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        });

        const flyingImages = document.querySelectorAll('.flying-img');

        flyingImages.forEach(img => {
            const initialZ = Math.random() * 1000 - 500;

            gsap.fromTo(img, 
                {
                    z: initialZ,
                    opacity: 0,
                    y: () => Math.random() * 100 - 50,
                    x: () => Math.random() * 100 - 50
                },
                {
                    z: 0,
                    opacity: 1,
                    y: 0,
                    x: 0,
                    filter: 'blur(0px)',
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom 20%",
                        scrub: 1,
                        onUpdate: (self) => {
                            const maxBlur = 10;
                            const currentZ = gsap.getProperty(img, "z");
                            const blurAmount = Math.min(Math.max(-currentZ / 25, 0), maxBlur);
                            gsap.set(img, { filter: `blur(${blurAmount}px)` });
                        }
                    }
                }
            );
        });

    }, []);

    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    return (
        <div id="medq_homepage">
            <div className="medq_landing">
                <div className="nav_homepage">
                    <div className="glassin-nav">
                        <a className="nav-a" href=""><span className="nav-elem">Medq</span></a>
                        <a className="nav-a" href=""><span className="nav-elem">Pricing</span></a>
                    </div>
                </div>
                <div className="medi-img">
                    <div className="tagline">
                        <button className="hbutton">
                            <p className="hbutton__text">
                                <span style={{ '--index': 0 }}>G</span>
                                <span style={{ '--index': 1 }}>E</span>
                                <span style={{ '--index': 2 }}>T</span>
                                <span style={{ '--index': 3 }}></span>
                                <span style={{ '--index': 4 }}>S</span>
                                <span style={{ '--index': 5 }}>T</span>
                                <span style={{ '--index': 6 }}>A</span>
                                <span style={{ '--index': 7 }}>R</span>
                                <span style={{ '--index': 8 }}>T</span>
                                <span style={{ '--index': 9 }}>E</span>
                                <span style={{ '--index': 10 }}>D</span>
                                <span style={{ '--index': 11 }}> </span>
                            </p>
                            <div className="hbutton__circle">
                                <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="hbutton__icon" width="14">
                                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                                </svg>
                                <svg viewBox="0 0 14 15" fill="none" width="14" xmlns="http://www.w3.org/2000/svg" className="hbutton__icon hbutton__icon--copy">
                                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </button>
                        <h1>Medq: Your Health, Prioritized</h1>
                    </div>
                    <img className="medicine" src={MedicineImg} alt="Medicine" />
                </div>
            </div>

            <div className="marquee">
                <div className="marquee-inner">
                    <div className="marquee-part">
                        SERVICES WE PROVIDE ↘
                    </div>
                    <div className="marquee-part">
                        SERVICES WE PROVIDE ↘
                    </div>
                    <div className="marquee-part">
                        SERVICES WE PROVIDE ↘
                    </div>
                    <div className="marquee-part">
                        SERVICES WE PROVIDE ↘
                    </div>
                    <div className="marquee-part">
                        SERVICES WE PROVIDE ↘
                    </div>
                </div>
            </div>

            <div className="homepage_stack">
                <ul id="cards">
                    <li className="card" id="card-1">
                        <div className="card-content" id="appointment_homepage">
                            <div className="stack_header">
                                <h1>Appointment Booking</h1>
                                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolor natus pariatur animi eius quis, dignissimos placeat laudantium tempore? Beatae quam autem doloribus vero natus. Culpa libero sunt modi? Explicabo!</h4>
                            </div>
                            <img className="appointment_homepage" src={HCard1} alt="Appointment Booking" />
                        </div>
                    </li>
                    <li className="card" id="card-2">
                        <div className="card-content" id="queue_homepage">
                            <div className="stack_header">
                                <h1>Advanced Queue Management</h1>
                                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolor natus pariatur animi eius quis, dignissimos placeat laudantium tempore? Beatae quam autem doloribus vero natus. Culpa libero sunt modi? Explicabo!</h4>
                            </div>
                            <img src={HCard2} alt="Advanced Queue Management" />
                        </div>
                    </li>
                    <li className="card" id="card-3">
                        <div className="card-content" id="bed_homepage">
                            <div className="stack_header">
                                <h1>Bed Management</h1>
                                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolor natus pariatur animi eius quis, dignissimos placeat laudantium tempore? Beatae quam autem doloribus vero natus. Culpa libero sunt modi? Explicabo!</h4>
                            </div>
                            <img src={HCard3} alt="Bed Management" />
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    );
};

export default HomePage;
