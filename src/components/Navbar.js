import React from 'react'
import FontAwesome from 'react-fontawesome'

export default function Navbar() {
    document.addEventListener("DOMContentLoaded", function () {

        let el_autohide = document.querySelector('.autohide');
        if (el_autohide) {
            var last_scroll_top = 0;
            window.addEventListener('scroll', function () {
                let scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('scrolled-up');
                    // console.log("scroll")
                }
                else {
                    el_autohide.classList.remove('scrolled-up');
                    el_autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            });
            // window.addEventListener
        }
        // if

    });
    return (
        <div className="navBar autohide navbar">
            <FontAwesome className='fa fa-bars' name='bars' />
            <span>Artificial Intelligence</span>
        </div>
    );
}