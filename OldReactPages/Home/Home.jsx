import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.scss';
import dropShadow from '../../assets/Asset 1.png';

const Home = ({ setMarkers, markers }) => {
    const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState('');

    return (
        <main className='home-container'>
            <h1 className='home__h1'>Mentor Me</h1>
            <img src={dropShadow} alt="" className="home__dropshadow-h1" />
            <h2 className='home__h2'>What would you like to learn?</h2>
            <img src={dropShadow} alt="" className="home__dropshadow-h2" />
            {/* <SearchBar setMarkers={setMarkers} markers={markers} /> */}
            <h2 className='home__h2--link'>
                <Link to='/search'>Get Started</Link>
            </h2>
            <img src={dropShadow} alt="" className="home__dropshadow" />
        </main>
    );
};

export default Home;
