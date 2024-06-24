import React, { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Grid, Card, CardMedia, CardContent, Button, CardHeader, TextField, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useToggle from '../../CustomHook/useToggle'

export default function CreateOrchid() {
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode: initialDarkMode, contextDarkMode: initialContextDarkMode } = location.state || {};

  const [darkMode, setDarkMode] = useToggle(initialDarkMode);
  const [contextDarkMode, setContextDarkMode] = useState(initialContextDarkMode);
  const [responseCode, setResponseCode] = useState(0)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    !darkMode ? setContextDarkMode("Toggle Light Mode") : setContextDarkMode("Toggle Dark Mode");
  }

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
    name: '',
    color: '',
    rating: '',
    origin: '',
    category: '',
    isSpecial: '',
    image: '',
    editedby: user.given_name,
  }

  const onSubmit = (values) => {
    const transformData = {
      ...values,
      rating: parseFloat(values.rating),
    }
    CreateOrchid(transformData)
    // formik.resetForm()
  }
  function CreateOrchid(values) {
    console.log(values)
    fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => (
        setResponseCode(response.status),
        response.json()
      ))
      .then(data => console.log('Success:', data))
      .catch((error) => {
        console.error('Error:', error);
      });
    setTrigger(prev => !prev)
  }

  return (
    <div style={{
      backgroundColor: darkMode ? '#fff' : '#6f6f6f',
      color: darkMode ? '#000' : '#fff',
      paddingBottom: '100px',
    }}>
      <Button onClick={toggleDarkMode}
        variant="contained" size="large"
        sx={{
          marginBottom: '10px',
          height: '50px',
          backgroundColor: darkMode ? '#000' : '#fff',
          color: darkMode ? '#fff' : '#000',
          '&:hover': {
            backgroundColor: darkMode ? '#1a1a1a' : '#e6e6e6',
            color: darkMode ? '#f2f2f2' : '#1a1a1a',
          }
        }}
      >{contextDarkMode}</Button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}

      >
        {({ handleChange, values }) => (
          <Form style={{
            width: '50%',
            margin: 'auto',
            padding: '20px',
            background: '#fff',
            color: '#000',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)'
          }}>

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
                label="Link image"
                value={values.image}
                onChange={handleChange} style={{ width: '100%' }}
              />
              <ErrorMessage name="image">
                {msg => <Alert severity="error">{msg}</Alert>}
              </ErrorMessage>
            </div><br />
            {responseCode.toString()[0] === '2' ? <Alert severity="success"><h3>Create orchid successfully</h3></Alert> : null}
            <div>
              <Button type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                sx={{ marginBottom: '10px' }}>Submit</Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth onClick={() => navigate('/home')}>Back to home page</Button>
            </div>
          </Form>
        )}
      </Formik>

    </div>

  )
}
