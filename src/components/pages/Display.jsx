import React, { useState, useEffect, } from 'react'
import { Grid, Card, CardMedia, CardContent, Button, CardHeader } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useToggle from '../../CustomHook/useToggle'
export default function Display() {
  const [display, setDisplay] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode: initialDarkMode, contextDarkMode: initialContextDarkMode } = location.state || {};

  const [darkMode, setDarkMode] = useToggle(initialDarkMode);
  const [contextDarkMode, setContextDarkMode] = useState(initialContextDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    !darkMode ? setContextDarkMode("Toggle Light Mode") : setContextDarkMode("Toggle Dark Mode");
  }
  function displayOnClick() {
    setDisplay(!display)
  }

  const backToHome = () => {
    navigate('/home')
  }

  useEffect(() => {
    fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`)
      .then(response => response.json())
      .then(data => setDataDetail(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div style={{
      backgroundColor: darkMode ? '#fff' : '#6f6f6f',
    }}>
      <Button onClick={toggleDarkMode} variant="contained" size="large" sx={{
        marginBottom: '10px',
        height: '50px',
      }}>
        {contextDarkMode}
      </Button>
      <Grid container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Card sx={{
          backgroundColor: '#dbd1d0',
          boxShadow: '0 0 10px 5px #fff',
          margin: '25px',
        }}>
          <CardHeader title="Orchid information" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}></CardHeader>
          <CardMedia sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <img src={dataDetail.image} style={{
              width: '500px',
              padding: '10px',
              margin: '10px',
            }} />
            <h2>{dataDetail.name}</h2>
          </CardMedia>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}>
            <Button onClick={displayOnClick} variant="contained" size="large" color="primary" sx={{
              width: '75%',
            }}>Click here to show all</Button>
          </div>
          {display &&
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div>Color: {dataDetail.color} </div>
              <div>Rating: {dataDetail.rating}</div>
              <div>Origin: {dataDetail.origin}</div>
              <div>Category: {dataDetail.category}</div>
              <div>Is special: {dataDetail.isSpecial ? 'Rare' : 'Normal'}</div>
              <div></div>

            </CardContent>
          }
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
                width: '75%',
              }}
              onClick={backToHome}>
              Back to home
            </Button>
          </div>
        </Card>

      </Grid>

    </div>
  )
}