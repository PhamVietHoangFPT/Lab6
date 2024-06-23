import { Button } from "@mui/material";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.reload()
  };

  return (
    <Button
      sx={{
        padding: '14px 16px',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d32f2f',
        }
      }}
      onClick={handleLogout} >Logout</Button>
  );
}

export default Logout;