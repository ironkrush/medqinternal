import React, { useEffect, useRef } from 'react';
import '../assets/styles/pdashboard.css';

const PatientDashboard = () => {
  const dockContainerRef = useRef(null);
  const dockItemsRef = useRef([]);

  useEffect(() => {
    const dockContainer = dockContainerRef.current;
    const dockItems = dockItemsRef.current;

    const defaultItemScale = 1;
    const hoverItemScale = 1.8; 
    const neighborItemScale = 1.3;

    const defaultMargin = "10px";
    const expandedMargin = "40px";

    const updateDockItems = () => {
      dockItems.forEach((item) => {
        let scale = defaultItemScale;
        let margin = defaultMargin;

        if (item.isHovered) {
          scale = hoverItemScale;
          margin = expandedMargin;
        } else if (item.isNeighbour) {
          scale = neighborItemScale;
          margin = defaultMargin;
        }

        item.style.transform = `scale(${scale})`;
        item.style.margin = `0 ${margin}`;
      });

      if (dockItems.some(item => item.isHovered)) {
        dockContainer.style.width = "10000px";
      } else {
        dockContainer.style.width = "";
      }
    };

    dockItems.forEach((item) => {
      item.addEventListener("mousemove", () => {
        dockItems.forEach((otherItem) => {
          otherItem.isHovered = otherItem === item;
          otherItem.isNeighbour = Math.abs(
            dockItems.indexOf(otherItem) - dockItems.indexOf(item)
          ) === 1;
        });
        updateDockItems();
      });
    });

    dockContainer.addEventListener("mouseleave", () => {
      dockItems.forEach((item) => {
        item.isHovered = false;
        item.isNeighbour = false;
      });
      updateDockItems();
    });

    const dashboardname = document.querySelector(".dashboard-name");
    const nameofUser = document.createElement("h1");
    nameofUser.setAttribute("class", "User-name");
    nameofUser.innerHTML = '';
    dashboardname.appendChild(nameofUser);

    const main = () => {
      const articles = Array.from(document.querySelectorAll("article"));
      articles.forEach((article, index) => {
        setTimeout(() => {
          article.classList.add("reveal");
        }, index * 250);
      });
    };
    document.addEventListener("DOMContentLoaded", main);

    const patient = "Hemangi";
    const name = document.querySelector(".dashboard_header");
    name.innerHTML = `Hi Welcome! ${patient}`;
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-name"></div>
      <div className="grid-container">
        <div className="bento">
          <article className="inside-dashboard">
            <a href="#">
              <img src="female-pic.jpg" className="dashboard_femalepic" alt="Profile" />
              <h2 className="dashboard_header"></h2>
            </a>
          </article>
          <article className="inside-dashboard">
            <a href="#">
              <img className="dashboard_appointment" src="appointment-Photoroom.png" alt="Appointment" />
              <h1>Appointment</h1>
            </a>
          </article>
          <article className="inside-dashboard">
            <a href="#">
              <img className="dashboard_queue" src="queue-Photoroom.png" alt="Queue" />
              <h1>Queue</h1>
            </a>
          </article>
          <article className="inside-dashboard">
            <a href="#">
              <img className="dashboard_bed" src="bed.png" alt="Bed Management" />
              <h1>Bed Management</h1>
            </a>
          </article>
        </div>
      </div>
      <div className="macos-nav">
        <div className="dock" ref={dockContainerRef}>
          <div className="dock-item" ref={el => dockItemsRef.current[0] = el}>
            <a className="mac-a" href="#"><ion-icon name="person-outline" /></a>
          </div>
          <div className="dock-item" ref={el => dockItemsRef.current[1] = el}>
            <a className="mac-a" href="#"><ion-icon name="bed-outline" /></a>
          </div>
          <div className="dock-item" ref={el => dockItemsRef.current[2] = el}>
            <a className="mac-a" href="#"><ion-icon name="fitness-outline" /></a>
          </div>
          <div className="dock-item" ref={el => dockItemsRef.current[3] = el}>
            <a className="mac-a" href="#"><ion-icon name="alarm-outline" /></a>
          </div>
        </div>
      </div>
      <div className="dashboard_medq"><h1>medq</h1></div>
    </div>
  );
};

export default PatientDashboard;
