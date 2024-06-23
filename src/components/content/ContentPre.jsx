import React, { useState, useEffect } from "react";
import './content.css'
import { Orchids } from "./listOfOrchids";
import { Link, Outlet } from "react-router-dom";

export default function ContentPre() {
    const [selectedOrchidId, setSelectedOrchidId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://663e59f4e1913c47679763a2.mockapi.io/orchids')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])
    return (
        <div className='container-fluid '>
            <div className="row">
                {data.map((Orchid) => (
                    <div key={Orchid.id} className='col-3 card-body cardContainer'>
                        <div className='card'>
                            <img src={Orchid.image} className="imgBorder" /> <br />
                            <Link to={`details/${Orchid.id}`}>
                                <button
                                    className="btn btn-primary btn-lg container-fluid"
                                >
                                    Detail
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}