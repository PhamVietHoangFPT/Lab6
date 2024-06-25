import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Rating } from "@mui/material";
import useToggle from "../../CustomHook/useToggle";
export default function ContentPre() {
	const [data, setData] = useState([]);
	const [trigger, setTrigger] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("userInfo"));
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
	}, [trigger])

	function calculatePrice(rate, isRare) {
		const rarityMultiplier = isRare ? 2 : 1.5;
		return Math.round(rate * 1000 * rarityMultiplier);
	}

	return (
		<>
			{
				data.length > 0 ? (
					<div style={{
						transition: 'background-image 0.5s ease-in-out',
						backgroundImage: darkMode ? 'url("https://c1.wallpaperflare.com/preview/233/661/101/flower-orchid-petal-stem.jpg")' : 'url("https://img.freepik.com/premium-photo/flowers-white-orchid-phalaenopsis-white-background-copy-space-generative-ai_535844-3245.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}>

						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '10px',
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
							{user &&
								<Button sx={{
									marginBottom: '10px',
									height: '50px',
									backgroundColor: darkMode ? '#fff' : '#000', // Reversed colors
									color: darkMode ? '#000' : '#fff', // Reversed text color
									'&:hover': {
										backgroundColor: darkMode ? '#e6e6e6' : '#1a1a1a', // Reversed hover background color
										color: darkMode ? '#1a1a1a' : '#f2f2f2', // Reversed hover text color
									}
								}}
									onClick={() => navigate('/create', { state: { darkMode: darkMode, contextDarkMode: contextDarkMode } })}>CREATE NEW ORCHID</Button>
							}
						</div>
						<Container>
							<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
								{data.map((Orchid, index) => (
									<Grid key={Orchid.id} item xs={4} sm={4} md={3} lg={3}
										sx={{
											marginBottom: '10px',
											animation: 'floatIn 0.8s ease-out',
											animationDelay: `${index * 100}ms`, // Delays the animation of each card
											'@keyframes floatIn': {
												from: { opacity: 0, transform: 'translateY(20px)' },
												to: { opacity: 1, transform: 'translateY(0)' },
											},
										}}>
										<Card sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
											height: '100%',
											backgroundColor: '#dbd1d0',
											boxShadow: '0 0 10px 5px #fff',
											cursor: 'pointer',
											transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
											'&:hover': {
												boxShadow: '0 0 10px 5px rgba(255, 105, 180, 0.8)',
												transform: 'scale(1.2)',
											}
										}} onClick={() => goToDetailId(Orchid.id)}>
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
												<h4>Price: {calculatePrice(Orchid.rating, Orchid.isSpecial).toLocaleString()}$</h4>
												<Rating name="read-only" value={Orchid.rating} readOnly precision={0.5} />
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						</Container>
					</div >)
					: (
						<div style={{
							transition: 'background-image 0.5s ease-in-out',
							backgroundImage: darkMode ? 'url("https://c1.wallpaperflare.com/preview/233/661/101/flower-orchid-petal-stem.jpg")' : 'url("https://img.freepik.com/premium-photo/flowers-white-orchid-phalaenopsis-white-background-copy-space-generative-ai_535844-3245.jpg")',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							height: '100vh',
						}}>
							<div style={{
								display: 'flex',
								justifyContent: 'center',
							}}>
								<h1>Loading...</h1>
							</div>
						</div>
					)
			}
		</>
	)
}