import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

function Landing() {

        //sempre que tiver uma informação que será mantida pelo server
        //ela contera um estado
    const [ totalConnections, setTotalConnections ] = useState(0)

    //useEffect recebe dois parametros( uma função ou arrow func e um array de dependencias
    //que nada mais é que: toda vez que esse parametro for acionado a função será executa)
    useEffect(() => {
        api.get('/connections').then(response => {
            
            const { total } = response.data;

            setTotalConnections(total);
        })

    }, [])

    return (
        /**div#page-landing */
        <div id="page-landing">

            
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logo} alt="YourTeacher"/>
                    <h2>Sua Plataforma de estudos online</h2>
                </div>

                <img 
                src={landing} 
                alt="" 
                className="hero-img"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study" >
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="give-classes" className="give-classes" >
                        <img src={giveClassesIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de { totalConnections } conexões já realizadas <img src={purpleHeartIcon} alt="purple heart"/>
                </span>
            </div>
        </div>
    )
    }
export default Landing;