import { useNavigate } from "react-router-dom";
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Apatheia</h1>
      <div className="button-group">
        <button onClick={() => navigate("/quote")}>Sign In</button>
        <button onClick={() => navigate("/quote")}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;