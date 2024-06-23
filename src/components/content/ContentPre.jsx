import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Rating } from "@mui/material";
import useToggle from "../../CustomHook/useToggle";
export default function ContentPre() {
	const [data, setData] = useState([]);

	const navigate = useNavigate();
	const goToDetailId = (id) => {
		navigate(`/home/details/${id}`, { state: { darkMode: darkMode, contextDarkMode: contextDarkMode } });
	}

	const [darkMode, setDarkMode] = useToggle(false);
	const [contextDarkMode, setContextDarkMode] = useState(darkMode ? "Toggle Light Mode" : "Toggle Dark Mode");
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		!darkMode ? setContextDarkMode("Toggle Light Mode") : setContextDarkMode("Toggle Dark Mode");
	}

	useEffect(() => {
		fetch('https://663e59f4e1913c47679763a2.mockapi.io/orchids')
			.then(response => response.json())
			.then(data => setData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [])

	function calculatePrice(rate, isRare) {
		if (isRare) {
			return Math.round(rate * 100 * 1.5)
		} else {
			return Math.round(rate * 100)
		}
	}
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
			<Container>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
					{data.map((Orchid) => (
						<Grid key={Orchid.id} item xs={4} sm={4} md={3} lg={3}
							sx={{
								marginBottom: '10px',
							}}>
							<Card sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								height: '100%',
								backgroundColor: '#dbd1d0',
								boxShadow: '0 0 10px 5px #fff',
							}}>
								<CardMedia sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
									<img src={Orchid.image} style={{
										width: '300px',
										padding: '10px',
										margin: '25px',
									}} />
								</CardMedia>
								<CardContent>

									<h3>{Orchid.name}</h3>
									<h4>Price: {calculatePrice(Orchid.rating, Orchid.isSpecial)}$</h4>
									<Rating name="read-only" value={Orchid.rating} readOnly precision={0.1} />
									<Button variant="contained" size="large" fullWidth color="primary" onClick={() => goToDetailId(Orchid.id)}>
										Detail
									</Button>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>

		</div >
	)
}