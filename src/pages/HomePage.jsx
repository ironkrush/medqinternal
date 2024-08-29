import React, { useEffect } from 'react';
import gsap from 'gsap';
import MedicineImg from '../assets/images/medicine.png'
import HCard1 from '../assets/images/final_hd_image.png'
import HCard2 from '../assets/images/queue_homepage.png'
import HCard3 from '../assets/images/Bed_homepage.png'
import Agni from '../assets/images/agnivesh.webp'
import Footersvg from '../assets/images/Footer.svg'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/homepage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const marquee = document.querySelectorAll(".marquee-part");

        // Scroll animation for the marquee
        marquee.forEach((part) => {
            gsap.to(part, {
                xPercent: -100,
                repeat: -1,
                duration: 10,
                ease: "linear"
            });
        });

        // Implement the skew effect when moving the mouse over the marquee
        marquee.forEach((part) => {
            let lastScrollLeft = 0;

            part.addEventListener("mousemove", (e) => {
                const x = e.pageX - part.offsetLeft;
                const walk = (x - part.scrollLeft) * 3;
                part.scrollLeft = part.scrollLeft - walk;

                let diff = part.scrollLeft - lastScrollLeft;
                let speed = diff * 0.40;
                part.style.transform = `skew(${speed}deg)`;
                lastScrollLeft = part.scrollLeft;
            });
        });

        // Apply other animations and interactions
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
        <>
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
                        <Link to='/signup'>
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
                            </Link>
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
                <div className="review-page">
                    <div className="review-text">
                        <h3 className="review_h1">
                            Get lifetime access to our monthly industry calls where our instructors sit down with industry experts to bring you exclusive content
                        </h3>
                    </div>
                    <div className="flying-img" style={{ top: '20%', left: '20%', filter: 'blur(0px)' }}>
                        <img src={Agni} alt="Flying Image 1" />
                    </div>
                    <div className="flying-img" style={{ top: '75%', left: '30%' }}>
                        <img src={Agni} alt="Flying Image 2" />
                    </div>
                    <div className="flying-img" style={{ top: '65%', left: '5%', filter: 'blur(0px)' }}>
                        <img src={Agni} alt="Flying Image 3" />
                    </div>
                    <div className="flying-img" style={{ top: '40%', left: '80%' }}>
                        <img src={Agni} alt="Flying Image 4" />
                    </div>
                    <div className="flying-img" style={{ top: '10%', left: '50%', filter: 'blur(0px)' }}>
                        <img src={Agni} alt="Flying Image 5" />
                    </div>
                    <div className="flying-img" style={{ top: '60%', left: '60%' }}>
                        <img src={Agni} alt="Flying Image 6" />
                    </div>
                </div>
                <footer>
                    <div className="footer-img">
                        <img className="medi-svg" src={Footersvg} alt="Footer" />
                    </div>
                    <div className="footer-parent">
                        <div className="contact-footer">
                            <p className="footer-text">
                                The dignity of a physician requires that he should look healthy, and as plump as nature intended him to be
                                for the common crowd consider those who are not of this excellent bodily condition to be unable to take care of themselves.
                            </p>
                        </div>
                        <div className="social-tags">
                            <div className="inside-social">
                                <p className="Contact-header">[Contact]</p>
                                <a href="">
                                    <div className="linked-text">
                                        <span className="media-btn">Email</span>
                                        <span className="duplicate-span">Email</span>
                                    </div>
                                </a>
                                <a href="" target="_blank" rel="noreferrer noopener">
                                    <div className="linked-text">
                                        <span className="media-btn">Idea</span>
                                        <span className="duplicate-span">Idea</span>
                                    </div>
                                </a>
                                <a href="" target="_blank" rel="noreferrer noopener">
                                    <div className="linked-text">
                                        <span className="media-btn">FAQs</span>
                                        <span className="duplicate-span">FAQs</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="stuff-footer">
                        <div className="inffy">
                            Made With ❤ By Asynchroners<br />
                            <p style={{ color: 'rgb(129, 129, 129)', fontSize: 'smaller' }}>2024 © All Rights Reserved</p>
                        </div>
                        <div className="location">
                            &nbsp;<img src="https://assets-global.website-files.com/5e1689facb9d5168c0dcbe0b/5fd67d88e589fa52700f6034_MapPin.svg" loading="lazy" width="20" height="20" alt="Location" className="location-icon" />
                            Based in India
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default HomePage;
