"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faNewspaper,faSquarePlus, faMountainCity } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const pathname = usePathname();
  return (
      <>
      <nav className="sidebar">
        <div className="buttons">
          <Link 
            href='/admin' 
            className={`${pathname === '/admin' 
              ? "active"
              : ""
            }`}
          ><FontAwesomeIcon className="fa-solid" icon={faHouse} />Home</Link>
          <Link 
            href='/admin/articles'
            className={`${pathname === '/admin/articles' 
              ? "active"
              : ""
            }`}
          ><FontAwesomeIcon className="fa-solid" icon={faNewspaper} />Articles</Link>
          <Link 
            href='/admin/create-tier'
            className={`${pathname === '/admin/create-tier' 
              ? "active"
              : ""
            }`}
          ><FontAwesomeIcon className="fa-solid" icon={faMountainCity} />Create Tier</Link>
          {/* <Link 
            href='/admin/payments'
            className={`${pathname === '/admin/payments' 
              ? "active"
              : ""
            }`}
          ><FontAwesomeIcon className="fa-solid" icon={faMoneyBillWave} />Payments</Link> */}
          <Link 
            href='/admin/create-article'
            className={`${pathname === '/admin/create-article' 
              ? "active"
              : ""
            }`}
          ><FontAwesomeIcon className="fa-solid" icon={faSquarePlus} />Create Article</Link>
        </div>
        {/* <div className="searchbar">
          <FontAwesomeIcon className="fa-solid" icon={faMagnifyingGlass} />
          <input 
              type="text"
              name="search"
              placeholder="Search"
              
          />
        </div> */}
      </nav>
    </>
  )
}