import * as THREE from "three";

// Scene, Camera, Renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('earth-container').appendChild(renderer.domElement);

// Load Textures
var textureLoader = new THREE.TextureLoader();
var earthTexture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
var bumpTexture = textureLoader.load('https://threejs.org/examples/textures/earthbump1k.jpg');
var specularTexture = textureLoader.load('https://threejs.org/examples/textures/earthspec1k.jpg');
var cloudsTexture = textureLoader.load('https://threejs.org/examples/textures/fair_clouds_4k.png');

// Create Earth geometry and material
var geometry = new THREE.SphereGeometry(1, 64, 64);
var material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.05,
    specularMap: specularTexture,
    specular: new THREE.Color('grey')
});
var earth = new THREE.Mesh(geometry, material);
scene.add(earth);


// Clouds material
var cloudsMaterial = new THREE.MeshLambertMaterial({
    map: cloudsTexture,
    transparent: true
});

// Create clouds geometry slightly larger than Earth
var cloudsGeometry = new THREE.SphereGeometry(1.005, 64, 64);
var clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
scene.add(clouds);

// Position clouds slightly above Earth's surface
clouds.scale.set(1.01, 1.01, 1.01); // Scale up clouds slightly to cover Earth completely
clouds.position.copy(earth.position);

// Lighting
var ambientLight = new THREE.AmbientLight(0x333333); // Soft ambient light
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Sunlight
directionalLight.position.set(5, 3, 5).normalize();
scene.add(directionalLight);

// Set camera position
camera.position.z = 1.5;
camera.position.y = -0.8; // Position camera to show only the bottom half

// Mouse movement interaction
var mouseX = 0;
var mouseY = 0;

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Move stars based on mouse movement
    scene.traverse(function (object) {
        if (object instanceof THREE.Mesh && object !== earth && object !== clouds) {
            object.position.x = object.initialPosition.x + mouseX * 5;
            object.position.y = object.initialPosition.y + mouseY * 5;
        }
    });
}

document.addEventListener('mousemove', onMouseMove, false);


// Touch movement interaction
function onTouchMove(event) {
    if (event.touches.length == 1) {
        var touch = event.touches[0];
        mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;

        // Move stars based on touch movement
        scene.traverse(function (object) {
            if (object instanceof THREE.Mesh && object !== earth && object !== clouds) {
                object.position.x = object.initialPosition.x + mouseX * 5;
                object.position.y = object.initialPosition.y + mouseY * 5;
            }
        });
    }
}

document.addEventListener('touchmove', onTouchMove, false);



// Stars
var starCount = 400; // Number of stars
var starGeometry = new THREE.SphereGeometry(0.050, 16, 16); // Small sphere geometry for stars
var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff });
for (let i = 0; i < starCount; i++) {
    var star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
    star.initialPosition = star.position.clone(); // Store initial position for reset
    scene.add(star);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update Earth rotation based on mouse movement
    earth.rotation.y = mouseX * 0.5;
    earth.rotation.x = mouseY * 0.5;

    // Update clouds rotation and texture offset for movement
    clouds.rotation.y += 0.0005; // Rotate clouds slightly
    clouds.material.map.offset.x += 0.0002; // Move clouds texture horizontally
    clouds.material.map.offset.y += 0.0001; // Move clouds texture vertically

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight * 0.5; // Only half height
    renderer.setSize(width, height);
    camera.aspect = width / (window.innerHeight * 0.5);
    camera.updateProjectionMatrix();
});


document.addEventListener('DOMContentLoaded', () => {
    const titles = gsap.utils.toArray('.p1 ,.p2 ,.p3 ,.p4');
    const tl = gsap.timeline({ repeat: -1 });

    titles.forEach(title => {
        const splitTitle = new SplitText(title, { type: "chars" });
        tl
            .from(splitTitle.chars, {
                opacity: 0,
                y: 80,
                transform: 'translateZ(0)',
                stagger: 0.02
            }, "<")
            .to(splitTitle.chars, {
                opacity: 0,
                y: -80,
                transform: 'translateZ(0)',
                stagger: 0.02
            }, "<1");
    });
});

