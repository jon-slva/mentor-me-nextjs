import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import igIcon from '../../assets/ig-icon-logo.svg';
import fbIcon from '../../assets/facebook-logo.svg';
import scIcon from '../../assets/soundcloud icon.svg';
import ytIcon from '../../assets/youtube-icon.svg';
import liIcon from '../../assets/linkedin-logo.svg';
import linkIcon from '../../assets/link icon.svg';

const BASE_URL = process.env.REACT_APP_API_URL;


import './ConversationPage.scss'

const ConversationPage = ({ setMarkers, setEvent, setDetails, details, markers }) => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState(null);
    const detailsCardRef = useRef(null);


    useEffect(() => {



        return () => {

        }
    }, [])




    useEffect(() => {
        // Define a function to fetch mentor information
        const fetchMentor = async () => {
            try {
                const mentorResponse = await axios.get(`${BASE_URL}/api/mentors/${mentorId}`);
                console.log(mentorResponse.data.mentors[0])
                setMentor(mentorResponse.data.mentors[0]); // Assuming the mentor data is in the response's data property

                // const mentorResponse = await axios.get(`${BASE_URL}/api/mentees/1`);
                // console.log(mentorResponse.data.mentors[0])
                // setMentor(mentorResponse.data.mentors[0]); // Assuming the mentor data is in the response's data property



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



            } catch (error) {
                console.error('Error fetching mentor information', error);
            }
        };


        // Call the fetchMentor function
        console.log(fetchMentor());
    }, [mentorId]); // Run the effect whenever mentorId changes

    if (!mentor) {
        return null;
    }

    return (
        <main className="page-container">

            <section className="details-card" ref={detailsCardRef}>
                <div className="details-card__top">
                    <img src={mentor.pic} alt="" className="details-card__pic" />
                    <div className="details-card__header-wrap">
                        <h3 className="details-card__header">
                            {mentor.first_name} {mentor.last_name}
                        </h3>
                        {mentor.subjects.map((subject) => (
                            <p className="details-card__subject" key={subject.id}>
                                {subject.name}
                            </p>
                        ))}
                        <p className="details-card__mentorships">
                            Mentees: 8
                        </p>
                        <p className="details-card__rating">
                            4 / 5
                        </p>
                        <p>{mentor.city}</p>
                        <p>{mentor.country}</p>
                    </div>
                </div>

                <div className="details-card__interest-wrap">
                    {mentor.interests.map((interest) => (
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
                        {mentor.bio}
                    </p>
                    <p className="details-card__bottom--header">
                        Available Hous:
                    </p>
                    <p className="details-card__bottom--content">
                        Mon - Fri: 5pm - 9pm
                    </p>
                </div>

                <div className="details-card__links">
                    {mentor.social_ig && (
                        <a href={`https://instagram.com/${mentor.social_ig}`} target="_blank" rel="noopener noreferrer">
                            <img src={igIcon} alt={`Instagram ${mentor.first_name}`} className="details-card__links--icon" />
                        </a>
                    )}
                    {mentor.social_facebook && (
                        <a href={`https://facebook.com/${mentor.social_facebook}`} target="_blank" rel="noopener noreferrer">
                            <img src={fbIcon} alt={`Facebook ${mentor.first_name}`} className="details-card__links--icon" />
                        </a>
                    )}
                    {mentor.social_soundcloud && (
                        <a href={`https://soundcloud.com/${mentor.social_soundcloud}`} target="_blank" rel="noopener noreferrer">
                            <img src={scIcon} alt={`Soundcloud ${mentor.first_name}`} className="details-card__links--icon" />
                        </a>
                    )}
                    {mentor.social_youtube && (
                        <a href={mentor.social_youtube} target="_blank" rel="noopener noreferrer">
                            <img src={ytIcon} alt={`Youtube ${mentor.first_name}`} className="details-card__links--icon" />
                        </a>
                    )}
                    {mentor.social_linkedin && (
                        <a href={`https://linkedin.com/in/${mentor.social_linkedin}`} target="_blank" rel="noopener noreferrer">
                            <img src={liIcon} alt={`Linkedin ${mentor.first_name}`} className="details-card__links--icon" />
                        </a>
                    )}
                </div>

                {mentor.portfolioLink1 && (
                    <a href={mentor.portfolioLink1} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                        <img src={linkIcon} alt={`${mentor.first_name}'s first link`} className="details-card__links--icon" />
                        {mentor.portfolioLink1}
                    </a>
                )}
                {mentor.portfolioLink2 && (
                    <a href={mentor.portfolioLink2} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                        <img src={linkIcon} alt={`${mentor.first_name}'s second link`} className="details-card__links--icon" />
                        {mentor.portfolioLink2}
                    </a>
                )}
                {mentor.portfolioLink3 && (
                    <a href={mentor.portfolioLink3} target="_blank" rel="noopener noreferrer" className='details-card__link'>
                        <img src={linkIcon} alt={`${mentor.first_name}'s third link`} className="details-card__links--icon" />
                        {mentor.portfolioLink3}
                    </a>
                )}

            </section>

        </main >
    );
};

export default ConversationPage
