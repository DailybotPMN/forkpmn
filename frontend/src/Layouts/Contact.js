import React from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/secondaryPages.css';

const Contact = () => {
    return (
        <div className='contactPage'>
            <Navbar/>
            <div className='secondaryPages'>
                <form>
                    <p>Nom: </p>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;