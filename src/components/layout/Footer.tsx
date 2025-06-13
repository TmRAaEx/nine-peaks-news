import React from "react";
import Link from "next/link";
import AdminLoginButton from "../shared/buttons/AdminLoginButton";

export default function Footer() {
  return (
    <footer>
      <section className="normal-width">
        <div className="wrapper">
          <div className="ctn footer-container">
            <div className="footer-column">
              <div className="icon-container">
                <img
                  src="/img/icons/9-fill-color-dm.svg"
                  id="iconDark"
                  alt="icon"
                  width="80px"
                  height="80px"
                />
                <img
                  src="/img/icons/9-fill-color-lm.svg"
                  id="iconLight"
                  alt="icon"
                  width="80px"
                  height="80px"
                />
              </div>
              <div className="footer-content">
                <p>
                  Nine Peaks News Ltd.
                  <br />
                  Outdoor & Travel news corporation
                </p>
                <div className="some-icons">
                  <Link href="#">
                    <i
                      className="fa-brands fa-twitter"
                      suppressHydrationWarning={true}
                    ></i>
                  </Link>
                  <Link href="#">
                    <i
                      className="fa-brands fa-facebook"
                      suppressHydrationWarning={true}
                    ></i>
                  </Link>
                  <Link href="#">
                    <i
                      className="fa-brands fa-instagram"
                      suppressHydrationWarning={true}
                    ></i>
                  </Link>
                  <Link href="#">
                    <i
                      className="fa-brands fa-linkedin"
                      suppressHydrationWarning={true}
                    ></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer-column">
              <h3>Navigation</h3>
              <div className="footer-content">
                <ul>
                  <li>
                    <Link href="/articles">Articles</Link>
                  </li>
                  <li>
                    <Link href="/subscriptions">Subscriptions</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <AdminLoginButton />
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-column">
              <h3>Contact us</h3>
              <div className="footer-content">
                <p>
                  News Street 42, 12345 Article Town
                  <br />
                  Phone: 012345678
                  <br />
                  Email: info@ninepeaks.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
