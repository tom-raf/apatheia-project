import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Apatheia</h1>
      <button onClick={() => navigate('/quote')}>Sign In</button>
      <button onClick={() => navigate('/quote')}>Sign Up</button>
    </div>
  );
}

export default Landing;