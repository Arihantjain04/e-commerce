import React from 'react'
import { NavLink } from 'react-router-dom'
import './Admin.css'

const AdminNavbar = () => {
    const getAdminNavLinkClass = ({ isActive }) =>
    isActive ? "admin-navbar-links-active" : "admin-navbar-links";
  return (
    <div className='admin-navbar'>
        <NavLink className={getAdminNavLinkClass} to='/admin/createProduct' >Create Product</NavLink>
        <NavLink className={getAdminNavLinkClass}  to='/admin/updateProduct' >Update Product</NavLink>
        <NavLink className={getAdminNavLinkClass}  to='/admin/deleteProduct' >Delete Product</NavLink>
    </div>
  )
}

export default AdminNavbar