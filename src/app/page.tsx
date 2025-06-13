import Image from "next/image";
export default function Home() {
  return (
    <section className="normal-width">
      <div className="wrapper mw-1600">
        <div className="ctn hero-container">
          <div className="hero-content">
            <div className="content-wrapper">
              <h1>
                News that travels.
                <br /> Everywhere
              </h1>
              <p>See our offers and sign up for a subscription today!</p>
              <button className="button cta-button">SEE THE PLANS</button>
            </div>
          </div>
          <div className="overlay"></div>
          <div className="image-container">
            <Image src="/img/hero-image.jpg" id="heroImage" alt="hero image" width={900} height={600}/>
          </div>
          <div className="circle">
            <Image
              src="/img/icons/9-fill-lg-light.svg"
              alt="mambo number nine"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
