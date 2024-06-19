import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className='main-div-sidebar'>
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to='/dashboard'>Expenses</Link>
                </li>
                <li>
                    <Link to='/incomedashboard'>Incomes</Link>
                </li>
            </ul>
        </div>
        </div>
    );
}

export default Sidebar;