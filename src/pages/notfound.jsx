import React from 'react'
import '../assets/styles/notfound.css'
import notfoundvideo from '../assets/images/404.mp4';
import { Link } from 'react-router-dom';

const notfound = () => {
    return (
        <div className="content404">
            <div className="comment0"><video className="video404" src={notfoundvideo} autoPlay loop muted></video></div>
            <div className="data">
                <div className="comment1">The Page you are looking for doesn't exist or hase been moved.</div>
                <div className="comment2">Please Click on Home page button.</div>
            </div>
            <div className="comment3"><button className="nfbtn btn-16"><Link className='notfoundhome' to="/">Home</Link></button></div>
        </div>
    )
}

export default notfound