import React from "react";
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? "black": ""}>
            <div className="header--logo"> {/* logo netflix */}
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                </a>
            </div>
            <div className="header--user"> {/* imagem usuario */}
                <a href="/">
                    <img src="http://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}
