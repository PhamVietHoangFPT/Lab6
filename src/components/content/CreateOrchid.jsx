import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, TextField, Alert, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useToggle from '../../CustomHook/useToggle'
import './Input.css'

export default function CreateOrchid() {
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode: initialDarkMode, contextDarkMode: initialContextDarkMode } = location.state || {};

  const [darkMode, setDarkMode] = useToggle(initialDarkMode);
  const [contextDarkMode, setContextDarkMode] = useState(initialContextDarkMode);
  const [responseCode, setResponseCode] = useState(0)
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    !darkMode ? setContextDarkMode("Toggle Light Mode") : setContextDarkMode("Toggle Dark Mode");
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  }
  useEffect(() => {
    setDarkMode(initialDarkMode);
  }, [initialDarkMode]);
  const [textFieldStyle, setTextFieldStyle] = useState({});
  useEffect(() => {
    const style = {
      width: '100%',
      backgroundColor: darkMode ? '#333' : '#fff', // Dark mode background color
      color: darkMode ? '#fff' : '#000', // Dark mode text color
    };
    const inputLabelStyle = { color: darkMode ? '#fff' : '#000' }; // Dark mode label color
    const inputPropsStyle = {
      color: darkMode ? '#fff' : '#000',
      '& .MuiAutocomplete-inputRoot': {
        color: darkMode ? '#fff' : '#000', // Autocomplete text color
        backgroundColor: darkMode ? '#555' : '#eee', // Autocomplete background color
      }
    }; // Dark mode input text color

    setTextFieldStyle({
      style,
      InputLabelProps: {
        style: inputLabelStyle,
      },
      InputProps: {
        style: inputPropsStyle,
      },
    });
  }, [darkMode]);

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
      .then(data => data)
      .catch((error) => {
        console.error('Error:', error);
      });
    setTrigger(prev => !prev)
  }

  return (
    <div style={{
      transition: 'background-image 0.5s ease-in-out',
      backgroundImage: darkMode ? 'url("https://c1.wallpaperflare.com/preview/233/661/101/flower-orchid-petal-stem.jpg")' : 'url("https://img.freepik.com/premium-photo/flowers-white-orchid-phalaenopsis-white-background-copy-space-generative-ai_535844-3245.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '84vh',
    }}>
      <Button onClick={toggleDarkMode}
        variant="contained" size="large"
        sx={{
          marginBottom: '10px',
          height: '50px',
          backgroundColor: darkMode ? '#fff' : '#000', // Reversed colors
          color: darkMode ? '#000' : '#fff', // Reversed text color
          '&:hover': {
            backgroundColor: darkMode ? '#e6e6e6' : '#1a1a1a', // Reversed hover background color
            color: darkMode ? '#1a1a1a' : '#f2f2f2', // Reversed hover text color
          }
        }}
      >{contextDarkMode}</Button>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}

        >
          {({ handleChange, values }) => (
            <Form style={{
              width: '50%',
              height: '-webkit-fill-available',
              margin: 'auto',
              padding: '20px',
              background: darkMode ? '#212122' : '#fff',
              color: darkMode ? "#fff" : '#000',
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
                  value={values.isSpecial} style={{
                    width: '100%',
                  }}
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
                  onChange={handleChange}
                  {...textFieldStyle}
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
      </Box>

    </div>

  )
}
