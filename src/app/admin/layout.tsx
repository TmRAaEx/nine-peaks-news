
import Sidebar from "./components/sidebar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import SessionControls from "@/components/shared/buttons/LogOutButtons";
import getUserData from "@/lib/UserData";
config.autoAddCss = false

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserData();

  if (!userData) {
      redirect("/login");
    }

  const { user, tier, sessions } = userData;

  

  return (
    <>
      <section className="normal-width admin-section">
        <div className="wrapper mw-1200 admin-header">
            <h1>Admin</h1>
        </div>
        <div className="wrapper mw-full admin-nav-container">
          <nav className='admin-navbar'>
            <ul className='admin-menu'>
              <li><Link href="#">Account</Link></li>
              <li><SessionControls user_id={user.id}/></li>
            </ul>
          </nav>
        </div>
        <div className="wrapper mw-full dashboard-background">
          <section className="normal-width dashboard-section">
            <div className="wrapper mw-1200 dashboard-wrapper">
              <div className="ctn dashboard-container">
                <div className="meatball-button">
                  <label htmlFor="meatball">
                    <FontAwesomeIcon className="fa-fw" icon={faEllipsis} />
                  </label>
                  <input type="checkbox" name="meatball" id="meatball" />
                </div>
                <Sidebar />
                {children}
                </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}