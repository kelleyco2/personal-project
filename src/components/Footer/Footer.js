import React from 'react' 
import './Footer.css'


export default function Footer(){
    return (
        <footer className='w3-pale-red'>
            <i class="fab fa-facebook" style={{marginRight: '16px'}}></i>
            <i class="fab fa-twitter" style={{marginRight: '16px'}}></i>
            <a href='https://www.instagram.com/mariakelley.lashes/?hl=en' target='_blank' rel='noopener noreferrer'>
                <i class="fab fa-instagram"></i>
            </a>
        </footer>
    )
}