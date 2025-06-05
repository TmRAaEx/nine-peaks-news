

export default function Home() {
  return (
    <section className="normal-width">
      <div className="wrapper">
         <div className="hero-container">
          <div className="hero-content">
            <div className="content-wrapper">
              <h1>News that travels.<br/> Everywhere</h1>
              <p>See our offers and sign up for a subscription today!</p>
              <button className="button cta-button">SEE THE PLANS</button>
            </div>
          </div>
          <div className="overlay"></div>
          <div className="image-container">
            <img src="/img/hero-image.jpg" id="heroImage" alt="hero image" />
          </div>
          <div className="circle">
            <img src="/img/icons/9-fill-lg-light.svg" alt="mambo number nine" />
          </div>
         </div>
      </div>
    </section>
  );
}
