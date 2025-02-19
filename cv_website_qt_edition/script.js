// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 700,
            },
        },
        color: {
            value: '#00ff00',
        },
        shape: {
            type: 'rectangle',
        },
        opacity: {
            value: 0.6,
        },
        size: {
            value: 14,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff00',
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab',
            },
        },
    },
});
