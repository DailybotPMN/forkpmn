import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Styles/secondaryPages.css';

require('dotenv').config();

const Contact = () => {
    
    const form = useRef();

    const sendEmail = (e) => {

        e.preventDefault();
        
        emailjs.sendForm(
            'service_ite0d4g',
            'template_m1iy938', 
            form.current, 
            'ZBhwALYGxfOy88FhY', 
        )
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
        }

        return (
            <div className='contactPage'>
                <Navbar/>
                <div className='secondaryPages'>
                    <form ref={form} onSubmit={sendEmail}>
                        <label>Name</label>
                        <input type="text" name="user_name" />
                        <label>Email</label>
                        <input type="email" name="user_email" />
                        <label>Message</label>
                        <textarea name="message" />
                        <input type="submit" value="Send" className='submit'/>
                    </form>
                </div>
                <Footer/>
            </div>
        );
};

export default Contact;