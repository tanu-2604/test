import React from 'react'
import { Link } from 'react-router-dom'
import  '../style/footer.css'
function Footer() {
    return (
        <div className="pos">
            <footer className="footer">
                <p className="footer-text"><Link to="/contact">Contact</Link> | <Link to="/privacy">Privacy Policy</Link> | <Link to="/disclaimer">Disclaimer</Link></p>
            </footer>
        </div>
    )
}

export default Footer
