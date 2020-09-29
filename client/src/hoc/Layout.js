import React from 'react'
import Footer from '../components/Header_Footer/Footer'
import Header from '../components/Header_Footer/Header'

function Layout(props) {
    return (
        <div>
            <Header/>
            <div className="page_container">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
