
import '../../styles/admin.css';
import Linechart from './components/charts/Linechart';
import Numberchart from './components/charts/Numberchart';
import Piechart from './components/charts/Piechart';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUsers, faChartPie, faChartSimple, faTrophy } from '@fortawesome/free-solid-svg-icons'
import getUserData from '@/lib/UserData';
import { redirect } from "next/navigation";


export default async function AdminDashboard() {

  const userData = await getUserData();
  if(!userData) return null;
  if (!userData.user.isAdmin) {
      redirect("/login");
    }

  return (
    <>
      <section className="dashboard">
        <div className="chart-container number">
          <h5>
            <FontAwesomeIcon className="fa-solid" icon={faNewspaper} />
            Articles
          </h5>
          <div>
            <Numberchart num={42}/>
          </div>

        </div>
        <div className="chart-container number">
          <h5>
            <FontAwesomeIcon className="fa-solid" icon={faUsers} />
            Subscribers
          </h5>
          <div>
            <Numberchart num={65}/>
          </div>
        </div>
        <div className="chart-container subscribers">
          <h5>
            <FontAwesomeIcon className="fa-solid" icon={faChartPie} /> 
            Subscriber Tiers
          </h5>
          <div>
            <Piechart />
          </div>
        </div>
        <div className="chart-container sales">
          <h5>
            <FontAwesomeIcon className="fa-solid" icon={faChartSimple} /> 
            Sales
          </h5>
          <div>
            <Linechart />
          </div>
        </div>
        <div className="chart-container popular">
          <h5>
            <FontAwesomeIcon className="fa-solid" icon={faTrophy} />
            Top Reads June {/* {new Date().toLocaleString('en-US', { month: 'long' })} */}
          </h5>
          <div className='popular-list'>
            {/* <h6>Most visited articles this month</h6> */}
            <ul>
              <li><Link href="/">Article 1</Link></li>
              <li><Link href="#">Article 2</Link></li>
              <li><Link href="#">Article 3</Link></li>
              <li><Link href="#">Article 4</Link></li>
              <li><Link href="#">Article 5</Link></li>
            </ul>
            
          </div>
        </div>

      </section>
    </>
  )
}