import React from 'react';

const Header = () => {
	return (
		<header className="header" >
			<img className="logo" src="../images/WebLogo.png" alt="hotel logo"/>
			<div className="middle"></div>
			<button className="description">Description</button>
		</header>
	);
}

export default Header;
