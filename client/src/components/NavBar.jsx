import { Link } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";
import AuthPage from '../pages/AuthPage';
import { useNavigate } from "react-router-dom";

export default function Navbar({ team, input, setInput, getValue }) {

  
  return (
    <nav>
      <h1>POKEDEX</h1>
      <Link as={Link} to='/'>Home</Link>
      <Link as={Link} to="team">{`My Team #${team.length}`}</Link>
      <input placeholder="search" type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={getValue}>Search</button>
    </nav>
  );
}