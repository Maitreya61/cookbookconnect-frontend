import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";
import { NavLink,Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const [cookies,setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const logout = ()=>{
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/login")
	}

	return (
		<div>
			<div className="navheader">
			<div className="navheader-title"><img src="RecipeLogo.jpg" alt="Logo" className="title-image" />
			<h3><span style={{fontSize:"25px"}}>C</span>ook<span style={{fontSize:"25px"}}>B</span>ook<span style={{fontSize:"25px"}}>C</span>onnect</h3></div>
            <button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
			<nav ref={navRef} className="navbar">
				<NavLink onClick={showNavbar} to='/' >Home</NavLink>
				<NavLink onClick={showNavbar} to='/create'>Create</NavLink>
				<NavLink onClick={showNavbar} to='/saved'>Saved</NavLink>
				{!cookies.access_token ? (<NavLink onClick={showNavbar} to='/login'>Login</NavLink>) : (<NavLink onClick={()=>{
					showNavbar();
					logout();
				}} to='/login'>Logout</NavLink>) }
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			</div>
			<Outlet />
		</div>
		
		
	);
}

export default Navbar;