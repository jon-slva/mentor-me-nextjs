import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import './SearchResults.scss';
import { Link } from 'react-router-dom';
import igIcon from '../../assets/ig-icon-logo.svg';
import fbIcon from '../../assets/facebook-logo.svg';
import scIcon from '../../assets/soundcloud icon.svg';
import ytIcon from '../../assets/youtube-icon.svg';
import liIcon from '../../assets/linkedin-logo.svg';
import linkIcon from '../../assets/link icon.svg';
import upArrow from '../../assets/chevron-up.svg';

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const SearchResults = ({ setMarkers, markers, onClickMarker }) => {
    const [expanded, setExpanded] = useState(false);
    const [results, setResults] = useState(null);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [randomRating, setRandomRating] = useState(0);

    const detailsCardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsCardRef.current && !detailsCardRef.current.contains(event.target)) {
                setSelectedMentor(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log(results);
        return () => { };
    }, [results]);

    useEffect(() => {
        if (selectedMentor) {
            const newRandomRating = Math.floor(Math.random() * 5) + 1;
            setRandomRating(newRandomRating);
        }
    }, [selectedMentor]);

    const handleMentorClick = (mentor) => {
        setSelectedMentor(mentor);
        // onClickMarker(mentor)
    };

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <main className="page-container">
            <SearchBar setMarkers={setMarkers} markers={markers} setResults={setResults} />
            {results && (
                <section className={`results ${expanded ? 'expanded' : ''}`}>
                    <div className="results__mobile" onClick={handleExpand}>
                        <img src={upArrow} alt="" className={`results__mobile-pullout ${expanded ? 'expanded' : ''}`} />
                    </div>
                    <h3 className="results__header">Results for "{results.searchQuery}" </h3>
                    {results.mentors.map((mentor) => (
                        <article className={`mentor ${selectedMentor === mentor ? 'selected' : ''}`} key={mentor.id} onClick={() => handleMentorClick(mentor)}>
                            <img src={mentor.pic} alt="" className="mentor__pic" />
                            <div className="mentor__container">
                                <div className="mentor__top">
                                    <h3 className="mentor__name">
                                        {mentor.first_name} {mentor.last_name}
                                    </h3>
                                    {mentor.subjects.map((subject) => (
                                        <p className="mentor__subject" key={subject.id}>
                                            {subject.name}
                                        </p>
                                    ))}
                                </div>
                                <div className="mentor__middle">
                                    <p className="mentor__middle--country">
                                        {mentor.city}, {mentor.country}
                                    </p>
                                </div>
                                <div className="mentor__bottom">
                                    {mentor.interests.map((interest) => (
                                        <p className="mentor__interest" key={interest.id}>
                                            {interest.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                    <p>No more results</p>
                </section>
            )}

            {selectedMentor && (
                <section className="details-card" ref={detailsCardRef}>
                    <div className="details-card__top">
                        <img src={selectedMentor.pic} alt="" className="details-card__pic" />
                        <div className="details-card__header-wrap">
                            <h3 className="details-card__header">
                                {selectedMentor.first_name} {selectedMentor.last_name}
                            </h3>
                            {selectedMentor.subjects.map((subject) => (
                                <p className="details-card__subject" key={subject.id}>
                                    {subject.name}
                                </p>
                            ))}
                            <p className="details-card__mentorships">
                                Mentees: 8
                            </p>
                            <p className="details-card__rating">
                                Rating: {randomRating} / 5
                            </p>
                            <p className='details-card__subhead'>{selectedMentor.city}</p>
                            <p className='details-card__subhead'>{selectedMentor.country}</p>
                        </div>
                    </div>

                    <div className="details-card__interest-wrap">
                        {selectedMentor.interests.map((interest) => (
                            <p className="details-card__interest" key={interest.id}>
                                {interest.name}
                            </p>
                        ))}
                    </div>

                    <div className="details-card__bottom">
                        <p className="details-card__bottom--header">
                            Bio:
                        </p>
                        <p className="details-card__bottom--content">
                            {selectedMentor.bio}
                        </p>
                        <p className="details-card__bottom--header">
                            Available Hous:
                        </p>
                        <p className="details-card__bottom--content">
                            Mon - Fri: 5pm - 9pm
                        </p>
                    </div>

                    <div className="details-card__links">
                        {selectedMentor.social_ig && (
                            <a href={`https://instagram.com/${selectedMentor.social_ig}`} target="_blank" rel="noopener noreferrer">
                                <img src={igIcon} alt={`Instagram ${selectedMentor.first_name}`} className="details-card__links--icon" />
                            </a>
                        )}
                        {selectedMentor.social_facebook && (
                            <a href={`https://facebook.com/${selectedMentor.social_facebook}`} target="_blank" rel="noopener noreferrer">
                                <img src={fbIcon} alt={`Facebook ${selectedMentor.first_name}`} className="details-card__links--icon" />
                            </a>
                        )}
                        {selectedMentor.social_soundcloud && (
                            <a href={`https://soundcloud.com/${selectedMentor.social_soundcloud}`} target="_blank" rel="noopener noreferrer">
                                <img src={scIcon} alt={`Soundcloud ${selectedMentor.first_name}`} className="details-card__links--icon" />
                            </a>
                        )}
                        {selectedMentor.social_youtube && (
                            <a href={selectedMentor.social_youtube} target="_blank" rel="noopener noreferrer">
                                <img src={ytIcon} alt={`Youtube ${selectedMentor.first_name}`} className="details-card__links--icon" />
                            </a>
                        )}
                        {selectedMentor.social_linkedin && (
                            <a href={`https://linkedin.com/in/${selectedMentor.social_linkedin}`} target="_blank" rel="noopener noreferrer">
                                <img src={liIcon} alt={`Linkedin ${selectedMentor.first_name}`} className="details-card__links--icon" />
                            </a>
                        )}
                    </div>

                    {selectedMentor.portfolioLink1 && (
                        <a href={selectedMentor.portfolioLink1} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                            <img src={linkIcon} alt={`${selectedMentor.first_name}'s first link`} className="details-card__links--icon" />
                            {selectedMentor.portfolioLink1}
                        </a>
                    )}
                    {selectedMentor.portfolioLink2 && (
                        <a href={selectedMentor.portfolioLink2} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                            <img src={linkIcon} alt={`${selectedMentor.first_name}'s second link`} className="details-card__links--icon" />
                            {selectedMentor.portfolioLink2}
                        </a>
                    )}
                    {selectedMentor.portfolioLink3 && (
                        <a href={selectedMentor.portfolioLink3} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                            <img src={linkIcon} alt={`${selectedMentor.first_name}'s third link`} className="details-card__links--icon" />
                            {selectedMentor.portfolioLink3}
                        </a>
                    )}

                    <Link to={`/mentor/${selectedMentor.mentor_id}`} className="contact-button">
                        <button type="submit" className="actn-button__link">
                            Contact
                        </button>
                    </Link>


                </section>
            )}
        </main>
    );
};

export default SearchResults;
