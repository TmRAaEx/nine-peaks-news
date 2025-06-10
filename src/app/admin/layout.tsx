"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <section className="normal-width admin-section">
        <div className="wrapper mw-1200 admin-header">
            <h1>Admin</h1>
        </div>
        <div className="wrapper mw-full admin-nav-container">
          <nav className='admin-navbar'>
            <ul className='admin-menu'>
              <li><a href="#">Account</a></li>
              <li><a href="#">Actions</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </nav>
        </div>
        <div className="wrapper mw-full dashboard-background">
          <section className="normal-width dashboard-section">
            <div className="wrapper mw-1200 dashboard-wrapper">
              <div className="ctn dashboard-container">
                <div className="meatball-button">
                  <label htmlFor="meatball">
                    <i className="fa-solid fa-ellipsis"></i>
                  </label>
                  <input type="checkbox" name="meatball" id="meatball" />
                </div>
                <nav className="sidebar">

                  <div className="buttons">
                    <Link 
                      href='/admin' 
                      className={`${pathname === '/admin' 
                        ? "active"
                        : ""
                      }`}
                    ><i className="fa-solid fa-house"></i>Home</Link>
                    <Link 
                      href='/admin/articles'
                      className={`${pathname === '/admin/articles' 
                        ? "active"
                        : ""
                      }`}
                    ><i className="fa-solid fa-newspaper"></i>Articles</Link>
                    <Link 
                      href='/admin/subscribers'
                      className={`${pathname === '/admin/subscribers' 
                        ? "active"
                        : ""
                      }`}
                    ><i className="fa-solid fa-users"></i>Subscribers</Link>
                    <Link 
                      href='/admin/payments'
                      className={`${pathname === '/admin/payments' 
                        ? "active"
                        : ""
                      }`}
                    ><i className="fa-solid fa-money-bill-wave"></i>Payments</Link>
                  </div>
                  <div className="searchbar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input 
                        type="text"
                        name="search"
                        placeholder="Search"
                        
                    />
                  </div>
                </nav>
                {children}
                </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}