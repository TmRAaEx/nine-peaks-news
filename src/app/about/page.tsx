export default function AboutUs(){
    return( 
      <>
        <section className="normal-width">
          <div className="wrapper mw-1200">
            <h1>About</h1>
          </div>
          <div className="wrapper mw-1200">
            <div className="flex flex-col items-center text-container" >  {/*ta bort mig, bacis  */}
              <div className="projectNews">
                <p>
                    This project was orgiginaly an school group assingment, that envolved into an portfolio worthy website
                    all articles are made up, and we are just trying to show how cool we are. the name commes from our assigned group number, 9, and the 9 peaks challenge.
                </p>
              </div>
              <h2>About group 9</h2>
              <div className="info Alex">
                <h3>Alex</h3>
                <p>This is node n next master</p>
              </div>
              <div className="info Magnus">
                <h3>Magnus</h3>
                <p>Design master, might be sunburned</p>
              </div>
              <div className="info Michelle">
                <h3>Michelle</h3>
                <p>hAR nI SKapat eN BRAnch äN?!</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
}