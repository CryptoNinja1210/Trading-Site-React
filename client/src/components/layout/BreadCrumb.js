import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BreadCrumb = ({props}) => {

    const {isAuthenticated} = useSelector(({auth}) => auth)

    return isAuthenticated && props !== '/dashboard' ? (
        <div className="bread-crumb" >
            <Link to={'/'} >Home </Link>
            <Link to={ props } >{ props }</Link>
            <i className="fas fa-solid fa-magnifying-glass"></i>
        </div>
    ) : null
}

export default BreadCrumb