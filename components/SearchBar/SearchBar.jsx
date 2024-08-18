import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.scss';
import dropShadow from '../../assets/Asset 1.png';
// import { useNavigate, useLocation } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;



const SearchBar = ({ setMarkers, setEvent, setDetails, markers, setResults }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();



    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/mentors?s=${encodeURIComponent(query)}`);

                const mentors = response.data.mentors;

                const globeMarkers = mentors.map((mentor) => {
                    return {
                        name: `${mentor.first_name} ${mentor.last_name}`,
                        id: mentor.id,
                        city: mentor.city,
                        color: 'blue',
                        coordinates: [parseFloat(mentor.lat), parseFloat(mentor.long)],
                        value: mentor.value || 0,
                    };
                });

                setMarkers(globeMarkers)
                setResults(response.data)

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                fetchData();
                // navigate(`/search?s=${encodeURIComponent(query)}`);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [query, navigate]);


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <>
            <input
                type="text"
                className='search__bar'
                placeholder='Search...'
                value={query}
                onChange={handleInputChange}
            />
        </>
    );
};

export default SearchBar;