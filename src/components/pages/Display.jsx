import React, { useState, useEffect, } from 'react'
import { Link, useParams } from 'react-router-dom'
export default function Display() {
    const [display, setDisplay] = useState(false)
    const [dataDetail, setDataDetail] = useState([])
    const { id } = useParams()
    function displayOnClick() {
        setDisplay(!display)
    }

    useEffect(() => {
        fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`)
            .then(response => response.json())
            .then(data => setDataDetail(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])
    return (
        <div className='container-fluid containerCard'>
            <div className='card'>
                <div className='card-body cardContent'>
                    <div>
                        <img src={dataDetail.image} alt='' className='imgCard' />
                        <h2>Name: {dataDetail.name}</h2>
                    </div>
                    <button onClick={displayOnClick} className="btn btn-primary btn-lg container-fluid">Click here to show all</button>
                    {display &&
                        <div className='product-details'>
                            <div>Color: {dataDetail.color} </div>
                            <div>Rating: {dataDetail.rating}</div>
                            <div>Origin: {dataDetail.origin}</div>
                            <div>Category: {dataDetail.category}</div>
                            <div>Is special: {dataDetail.isSpecial ? 'Rare' : 'Normal'}</div>
                            <div className='product-bottom-details'></div>

                        </div>
                    }
                    <Link to='/home'>
                        <button className="btn btn-primary btn-lg container-fluid">
                            Back to home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}