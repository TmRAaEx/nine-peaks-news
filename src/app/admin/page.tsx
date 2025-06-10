import '../../styles/admin.css';

export default function AdminDashboard() {
  return (
    <>
      <section className="normal-width admin-section">
        <div className="wrapper mw-1200 admin-header">
          <h1>Admin</h1>
        </div>
        <div className="wrapper mw-full admin-nav-container">
          <nav className='admin-navbar'>
            <ul className='admin-menu'>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Subscribers</a></li>
              <li><a href="#">Payments</a></li>
                    
            </ul>
          </nav>
        </div>
        <div className="wrapper mw-full dashboard-background">
          <section className="normal-width dashboard-section">
            <div className="wrapper mw-1200 dashboard-wrapper">
              <div className="container dashboard-container">
                <nav className="sidebar">
                  <div className="searchbar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input 
                      type="text"
                      name="search"
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                  <div className="buttons">
                    <button><i className="fa-solid fa-house"></i>Home</button>
                    <button><i className="fa-solid fa-newspaper"></i>Articles</button>
                    <button><i className="fa-solid fa-users"></i>Subscribers</button>
                    <button><i className="fa-solid fa-file-invoice-dollar"></i>Payments</button>
                  </div>
                </nav>
                <section className="dashboard">
                  <div className="chart-container">
                    Number Articles
                  </div>
                  <div className="chart-container">
                    Number Subs
                  </div>
                  <div className="chart-container">
                    Subscriber Tier Percentage
                  </div>
                  <div className="chart-container">
                    Sales
                  </div>

                </section>

              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}