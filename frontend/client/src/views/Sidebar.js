import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='/incomedashboard'>Income</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;