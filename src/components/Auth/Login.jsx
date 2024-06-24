import { GoogleLogin } from '@react-oauth/google';
const clientId = "629470625241-il5it1rn5pejaltppdm23jog45iat57b.apps.googleusercontent.com"
import { jwtDecode } from 'jwt-decode';

function Login() {
  const responseMessage = (response) => {
    const decoded = jwtDecode(response.credential);
    localStorage.setItem("userToken", response.credential);
    localStorage.setItem("userInfo", JSON.stringify(decoded));
    window.location.reload();
  }
  const errorMessage = (error) => {
    console.log(error)
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={responseMessage}
      onError={errorMessage}
    />
  )
}

export default Login