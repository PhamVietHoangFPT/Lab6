import React, { useState, useEffect, } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Grid, Card, CardMedia, CardContent, Button, CardHeader, TextField, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Typography, Box, Chip } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useToggle from '../../CustomHook/useToggle'
export default function Display() {
  const [update, setUpdate] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [responseCodeDisplay, setResponseCodeDisplay] = useState(0)
  const [responseCodeUpdate, setResponseCodeUpdate] = useState(0)
  const [contextUpdate, setContextUpdate] = useState(update ? 'Click here to close' : 'Click here to update')
  const [trigger, setTrigger] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode: initialDarkMode, contextDarkMode: initialContextDarkMode } = location.state || {};
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [darkMode, setDarkMode] = useToggle(initialDarkMode ? initialDarkMode : false);
  const [contextDarkMode, setContextDarkMode] = useState(initialContextDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    !darkMode ? setContextDarkMode("Toggle Light Mode") : setContextDarkMode("Toggle Dark Mode");
  }

  function updateOnClick() {
    setUpdate(!update)
    setContextUpdate(update ? 'Click here to update' : 'Click here to close')
    setTrigger(prev => !prev)
  }

  function deleteOnClick() {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  const backToHome = () => {
    navigate('/home')
  }

  useEffect(() => {
    fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`)
      .then(response => (
        setResponseCodeDisplay(response.status),
        response.json()
      ))
      .then(data => setDataDetail(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [trigger])

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Orchid\'s name is required'),
    rating: Yup.number().required('rating is required').min(0.1, 'rating must be at least 0.1').max(5, 'rating must be at most 5'),
    origin: Yup.string().required('origin is required'),
    category: Yup.string().required('category is required'),
    isSpecial: Yup.boolean().required('Special is required'),
    image: Yup.string().required('Link image is required').url('Link image must be a valid URL'),
    color: Yup.string().required('color is required')
  })

  const initialValues = {
    name: dataDetail.name,
    color: dataDetail.color,
    rating: dataDetail.rating,
    origin: dataDetail.origin,
    category: dataDetail.category,
    isSpecial: dataDetail.isSpecial,
    image: dataDetail.image,
    editedby: user?.given_name ? user.given_name : dataDetail.editedby,
  }

  const onSubmit = (values) => {
    const transformData = {
      ...values,
      rating: parseFloat(values.rating),
    }
    updateOrchid(transformData)
    // formik.resetForm()
  }

  const updateOrchid = (values) => {
    fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        setResponseCodeUpdate(response.status);
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setTrigger(prev => !prev)
  }

  return (
    <>
      {responseCodeDisplay.toString().startsWith('2') ? (
        <div style={{
          // backgroundColor: darkMode ? '#fff' : '#6f6f6f',
          transition: 'background-image 0.5s ease-in-out',
          backgroundImage: darkMode ? 'url("https://c1.wallpaperflare.com/preview/233/661/101/flower-orchid-petal-stem.jpg")' : 'url("https://img.freepik.com/premium-photo/flowers-white-orchid-phalaenopsis-white-background-copy-space-generative-ai_535844-3245.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '-webkit-fill-available',
        }}>
          <Button onClick={toggleDarkMode} variant="contained" size="large"
            sx={{
              marginBottom: '10px',
              height: '50px',
              backgroundColor: darkMode ? '#fff' : '#000',
              color: darkMode ? '#000' : '#fff',
              '&:hover': {
                backgroundColor: darkMode ? '#e6e6e6' : '#1a1a1a',
                color: darkMode ? '#1a1a1a' : '#f2f2f2',
              }
            }}>
            {contextDarkMode}
          </Button>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
            <Card sx={{
              backgroundColor: '#dbd1d0',
              boxShadow: '0 0 10px 5px #fff',
              margin: '25px',
              width: '50%',
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
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {!update ? (
                  <div className='row' style={{
                    width: '100%',
                  }}>
                    <div className='col' style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Typography variant="h6" color="text.primary">Color: {dataDetail.color}</Typography>
                      <Typography variant="h6" color="text.primary">Rating: {dataDetail.rating}</Typography>
                      <Typography variant="h6" color="text.primary">Origin: {dataDetail.origin}</Typography>
                    </div>
                    <div className='col' style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}  >
                      <Typography variant="h6" color="text.primary">Category: {dataDetail.category}</Typography>
                      <Typography variant="h6" color="text.primary">
                        Is special:
                        <Chip label={dataDetail.isSpecial ? 'Rare' : 'Normal'} color={dataDetail.isSpecial ? 'success' : 'default'} />
                      </Typography>
                      <Typography variant="h6" color="text.primary">Edited by: {dataDetail.editedby}</Typography>
                    </div>
                  </div>
                ) : (
                  <>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      style={{ width: '100%' }}
                    >
                      {({ handleChange, values }) => (
                        <Form style={{ width: '100%' }}>
                          <div>
                            <Field
                              as={TextField}
                              id="name"
                              name="name"
                              label="Name"
                              value={values.name}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="name">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              as={TextField}
                              id="color"
                              name="color"
                              label="color"
                              value={values.color}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="name">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              as={TextField}
                              id="rating"
                              name="rating"
                              label="rating"
                              value={values.rating}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="rating">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              as={TextField}
                              id="origin"
                              name="origin"
                              label="origin"
                              value={values.origin}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="origin">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              as={TextField}
                              id="category"
                              name="category"
                              label="category"
                              value={values.category}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="category">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              name="isSpecial"
                              as={RadioGroup}
                              onChange={handleChange}
                              value={values.isSpecial} style={{ width: '100%' }}
                            >
                              <FormControlLabel value="true" control={<Radio />} label="Rare" />
                              <FormControlLabel value="false" control={<Radio />} label="Common" />
                            </Field>
                            <ErrorMessage name="isSpecial">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div> <br />
                          <div>
                            <Field
                              as={TextField}
                              id="image"
                              name="image"
                              label="image image"
                              value={values.image}
                              onChange={handleChange} style={{ width: '100%' }}
                            />
                            <ErrorMessage name="image">
                              {msg => <Alert severity="error">{msg}</Alert>}
                            </ErrorMessage>
                          </div><br />
                          <div>
                            {responseCodeUpdate.toString().startsWith('2') ? <Alert severity="success">Update successfully</Alert> : null}
                            <Button type="submit" variant="contained" size="large" color="primary" fullWidth>Submit</Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>)}
              </CardContent>
              {user &&
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  margin: '10px',
                }}>
                  <Button onClick={updateOnClick} variant="contained" size="large" color="warning">
                    {contextUpdate}
                  </Button>
                  <Button onClick={deleteOnClick} variant="contained" size="large" color="error">
                    Click here to delete
                  </Button>
                </div>
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

          </div>

        </div>
      ) : (
        <div style={{
          backgroundColor: darkMode ? '#fff' : '#6f6f6f',
          color: darkMode ? '#000' : '#fff',
          height: '90vh',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
            <h1>Loading...</h1>
          </div>
        </div>
      )}
    </>
  )
}