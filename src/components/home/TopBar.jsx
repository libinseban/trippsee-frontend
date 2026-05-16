import React from 'react';
import { Topbar, TopbarHeader } from '../../Ui/styledHeader'; // Ensure this path is correct

const linkStyle = {
  color: '#fff',
  marginLeft: '5px',
  textDecoration: 'underline',
};

const HeaderBanner = () => {
  return (
    <div>
      <Topbar>
        <TopbarHeader>
          Sale Starts Now! Grab Your Favorite Mobile Phones at Unbeatable Prices!
          <a href="#" style={linkStyle}>
            Shop now
          </a>
        </TopbarHeader>
      </Topbar>
    </div>
  );
};

export default HeaderBanner;
