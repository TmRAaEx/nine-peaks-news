import React from 'react'

export default function Footer() {
  return (
    <footer>
      <section className='normal-width'>
        <div className="wrapper">
          <div className="footer-container">
            <div className="footer-column">
              <div className='icon-container'>
                <img src="/img/icons/9-fill-lg.svg" id="iconDark" alt="icon" width="80px" height="80px" />
                <img src="/img/icons/9-fill-lg-light.svg" id="iconLight" alt="icon" width="80px" height="80px" />
              </div>
              <div className="footer-content">
                <p>Nine Peaks News Ltd.<br/>
                  Outdoor & Travel news corporation
                </p>
                <p>Social Media Links</p>
              </div>
            </div>
            <div className="footer-column">
              <h3>Navigation</h3>
              <div className="footer-content">
                <ul>
                  <li><a href="/articles">Articles</a></li>
                  <li><a href="/articles">Prices</a></li>
                  <li><a href="/articles">About</a></li>
                  <li><a href="/articles">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-column">
              <h3>Contact us</h3>
              <div className="footer-content">
                <p>News Street 42, 12345 Article Town<br/>
                Phone: 012345678<br/>
                Email: info@ninepeaks.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
