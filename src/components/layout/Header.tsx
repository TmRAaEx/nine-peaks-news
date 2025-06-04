"use client";

import React, { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const [isOpen, setIsOpen] = useState<string>("");

  const toggleMenu = () => {
    if (active === "") {
      setActive("active");
      setIsOpen("open");
    } else {
      setActive("");
      setIsOpen("");
    }
  };

  return (
    <header>
      <section className="normal-width">
        <div className="wrapper">
          <nav>
            <div className="logo-container">
              <img src="/img/logotype-lightmode.svg" alt="company logo" />
            </div>
            <button className="burger-button" onClick={toggleMenu}>
              <svg id="hamburger" className={`${active}`} viewBox="0 0 30 30">
                <g>
                  <path id="top-line" d="M3,9 L27,9 Z"></path>
                  <path id="bottom-line" d="M3,18 L27,18 Z"></path>
                </g>
              </svg>
            </button>
            <ul className={`main-menu ${isOpen}`}>
              <li className="menu-items nav-links">
                <a href="prices">Prices</a>
                <a href="about">About</a>
                <a href="contact">Contact</a>
              </li>
              {isLoggedIn ? (
                <li className="menu-items account">
                  <a href="myaccount">My Account</a>
                </li>
              ) : (
                <li className="menu-items account">
                  <a href="authentication/register">Login | Signup</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
