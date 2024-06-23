import React from 'react'
import { Link } from 'react-router-dom'
export default function Contact() {
    return (
        <div className='contact'>
            <div>
                <img src="https://inuvdp.com/wp-content/uploads/2022/05/logo-la-co-03.jpg" alt="" style={{
                    width: "150px"
                }} />
            </div>
            <div>
                <h1>
                    Pham Viet Hoang
                </h1>
            </div>
            <div>
                <p>
                    <h3>This web is created by Viet Hoang</h3>

                    Phone number: 0123456789
                    <br />
                    <Link to='/home' >
                        <button className="btn btn-danger btn-lg container-fluid">Back to home</button>
                    </Link> <br />
                </p>
            </div>
        </div>
    )
}
