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
const projects = {
    archiving: {
        media: [
            { type: "image", url: "./archiv/Screenshot_2024-05-20_141132.png" },
            { type: "image", url: "./archiv/Screenshot 2024-11-05 160501.png" },
            { type: "image", url: "./archiv/Screenshot 2024-11-05 160522.png" },
            { type: "image", url: "./archiv/Screenshot 2024-11-05 160539.png" },
        ]
    },
    ecommerce: {
        media: [
            { type: "image", url: "./e_commerce/Screenshot 2024-11-05 153833.png" },
            { type: "video", url: "./e_commerce/1105.mp4", thumbnail: "./e_commerce/Screenshot 2024-11-05 153833.png" },
            { type: "image", url: "./e_commerce/Screenshot 2024-11-05 154108.png" },
            { type: "image", url: "./e_commerce/Screenshot 2024-11-05 154245.png" }
        ]
    },
    pizza: {
        media: [
            { type: "image", url: "./MoPIzza/Screenshot 2024-11-02 145419 .png" },
            { type: "video", url: "./MoPIzza/1102.mp4", thumbnail: "./MoPIzza/Screenshot 2024-11-02 145419 .png" },
            { type: "image", url: "./MoPIzza/Screenshot 2024-11-02 145520.png" },
            { type: "image", url: "./MoPIzza/Screenshot 2024-11-02 145626.png" }
        ]
    }
};

const currentMedia = {
    archiving: 0,
    ecommerce: 0,
    pizza: 0
};

function showProject(projectId) {
    const showcases = document.querySelectorAll('.showcase-container');
    showcases.forEach(showcase => showcase.classList.remove('active'));

    const projectShowcase = document.getElementById(`${projectId}-showcase`);
    projectShowcase.classList.add('active');

    createMediaSlides(projectId);
}

function createMediaSlides(projectId) {
    const mediaContainer = document.querySelector(`#${projectId}-showcase .media-container`);
    const project = projects[projectId];
    
    mediaContainer.querySelectorAll('.media-slide').forEach(slide => slide.remove());

    project.media.forEach((media, index) => {
        const slide = document.createElement('div');
        slide.className = `media-slide ${index === currentMedia[projectId] ? 'active' : ''}`;

        if (media.type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.poster = media.thumbnail;
            const source = document.createElement('source');
            source.src = media.url;
            source.type = 'video/mp4';
            video.appendChild(source);
            slide.appendChild(video);

            if (index === currentMedia[projectId]) {
                video.play();
            }
        } else {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = `Project image ${index + 1}`;
            slide.appendChild(img);
        }

        mediaContainer.insertBefore(slide, mediaContainer.firstChild);
    });

    updateDots(projectId);
}

function updateProjectMedia(projectId) {
    const showcase = document.getElementById(`${projectId}-showcase`);
    const slides = showcase.querySelectorAll('.media-slide');

    slides.forEach((slide, index) => {
        const isActive = index === currentMedia[projectId];
        slide.classList.toggle('active', isActive);

        const video = slide.querySelector('video');
        if (video) {
            isActive ? video.play() : video.pause();
        }
    });

    updateDots(projectId);
}

function prevMedia(projectId) {
    const mediaCount = projects[projectId].media.length;
    currentMedia[projectId] = (currentMedia[projectId] - 1 + mediaCount) % mediaCount;
    updateProjectMedia(projectId);
}

function nextMedia(projectId) {
    const mediaCount = projects[projectId].media.length;
    currentMedia[projectId] = (currentMedia[projectId] + 1) % mediaCount;
    updateProjectMedia(projectId);
}

function updateDots(projectId) {
    const dotsContainer = document.getElementById(`${projectId}Dots`);
    dotsContainer.innerHTML = "";

    projects[projectId].media.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = `dot ${index === currentMedia[projectId] ? "active" : ""}`;
        dot.addEventListener("click", () => {
            currentMedia[projectId] = index;
            updateProjectMedia(projectId);
        });
        dotsContainer.appendChild(dot);
    });
}
