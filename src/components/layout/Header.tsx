"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";

export default function Header() {
  const { session, loading } = useSession();
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

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
      return;
    }
    setIsLoggedIn(false);
  }, [session]);

  return (
    <header>
      <section className="normal-width">
        <div className="wrapper">
          <nav>
            <div className="logo-container">
              <Link href={"/"}>
                <Image
                  src="/img/logotype-lightmode.svg"
                  id="logoLight"
                  width={250}
                  height={80}
                  alt="company logo"
                />
                <Image
                  src="/img/logotype-darkmode.svg"
                  id="logoDark"
                  width={250}
                  height={80}
                  alt="company logo"
                />
              </Link>
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
                <Link href="/prices">Articles</Link>
                <Link href="/prices">Prices</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </li>
              {isLoggedIn ? (
                <li className="menu-items account">
                  <Link href="/myaccount">My Account</Link>
                </li>
              ) : (
                <li className="menu-items account">
                  <Link href="/register">Login | Signup</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
