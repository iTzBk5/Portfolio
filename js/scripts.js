document.addEventListener("DOMContentLoaded", stars);

function stars() {
    let count = 20;
    let scene = document.querySelector('.scener');
    let i = 0;
    while (i < count) {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 1+1; // Ensure duration is between 1 and 6 seconds
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        star.style.height = 50 + h + 'px';
        star.style.animationDuration = duration + 's';

        scene.appendChild(star);
        i++;
    }
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        subject : document.getElementById("subject").value,
        mss : document.getElementById("mss").value,
    }
    emailjs.send("service_duyc0v9","template_nhc3he9",parms).then(alert("Email Sent!!"))
}

function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const mss = document.getElementById('mss').value;

    if (!name || !email || !mss|| !subject) {
        alert('Please fill out all required fields.');
        return;
    }

    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        mss: mss,
    };

    // Send the email using EmailJS
    emailjs.send("service_duyc0v9","template_nhc3he9", templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           alert('Email sent successfully!');
           document.getElementById('contact-form').reset(); // Reset the form
        }, function(error) {
           console.log('FAILED...', error);
           alert('Failed to send email. Please try again later.');
        });
}