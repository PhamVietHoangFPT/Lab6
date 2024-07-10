import { GoogleLogin } from '@react-oauth/google';
const clientId = "629470625241-il5it1rn5pejaltppdm23jog45iat57b.apps.googleusercontent.com"
import { jwtDecode } from 'jwt-decode';

function Login() {
  const response = (response) => {
    const decoded = jwtDecode(response.credential);
    localStorage.setItem("userInfo", JSON.stringify(decoded));
    localStorage.setItem("userToken", response.credential);
    window.location.reload();
  }
  const error = (error) => {
    console.log(error)
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={response}
      onError={error}
    />
  )
}

export default Login