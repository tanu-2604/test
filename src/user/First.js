import React from 'react'
import './style/first.css'
import {Link} from 'react-router-dom'
function First() {
    return (
        <div className="bg">
            <div>
                <center>
                <img className="img-1" src="/assets/image/1.png"/>
                </center>
                <h3 className="text-style">We Best Friends</h3>
                <p className="sentence">Solve the Quiz and challenge others in the ranking!</p>
                <div className="btn-wrapper">
                <Link to="/choosecategory">
                <button className="get-start">Let's Get Started</button>
                </Link>
                </div>
                
            </div>
        </div>
    )
}
export default First
