"use client";

// import { boolean } from 'zod/v4';
import '../../styles/admin.css';
import Linechart from './components/charts/Linechart';
import Numberchart from './components/charts/Numberchart';
import Piechart from './components/charts/Piechart';
import Link from 'next/link';


export default function AdminDashboard() {


  return (
    <>
      <section className="dashboard">
        <div className="chart-container number">
          <h5>
            <i className="fa-solid fa-newspaper"></i>
            Articles
          </h5>
          <div>
            <Numberchart num={42}/>
          </div>

        </div>
        <div className="chart-container number">
          <h5>
            <i className="fa-solid fa-users"></i>
            Subscribers
          </h5>
          <div>
            <Numberchart num={65}/>
          </div>
        </div>
        <div className="chart-container subscribers">
          <h5>
            <i className="fa-solid fa-chart-pie"></i> 
            Subscriber Tiers
          </h5>
          <div>
            <Piechart />
          </div>
        </div>
        <div className="chart-container sales">
          <h5>
            <i className="fa-solid fa-chart-simple"></i>
            Sales
          </h5>
          <div>
            <Linechart />
          </div>
        </div>
        <div className="chart-container popular">
          <h5>
            <i className="fa-solid fa-trophy"></i>
            Top Reads {new Date().toLocaleString('en-US', { month: 'long' })}
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