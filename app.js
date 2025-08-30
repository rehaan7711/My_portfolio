// Ultimate Portfolio JavaScript - Enhanced with animations for every section

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileMenu();
    initTypingAnimation();
    initContactForm();
    initScrollEffects();
    initActiveNavigation();
    initCounterAnimations();
    initProjectFiltering();
    initSkillAnimations();
    initTextRevealAnimations();
    
    // Initialize Three.js background after DOM is ready
    setTimeout(() => {
        initAdvancedThreeJSBackground();
    }, 100);
    
    // Start continuous animations
    initContinuousAnimations();
    
    // Best Practice: Section Animation & Overlap Fix
    initSectionAnimations();
    fixSectionOverlap();
    fixContactSectionContrast();
    window.addEventListener('resize', fixSectionOverlap);
    
    console.log('Ultimate Portfolio JavaScript initialized successfully');
});

// Enhanced Three.js Background with Multiple Layers
function initAdvancedThreeJSBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Three.js not available, creating enhanced fallback animation');
        createAdvancedFallbackAnimation();
        return;
    }

    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create multiple particle systems
        const particleSystems = [];
        
        // Main particle system
        const mainParticlesGeometry = new THREE.BufferGeometry();
        const mainParticlesCount = 1000;
        const mainPosArray = new Float32Array(mainParticlesCount * 3);
        const mainVelocities = new Float32Array(mainParticlesCount * 3);

        for (let i = 0; i < mainParticlesCount * 3; i += 3) {
            mainPosArray[i] = (Math.random() - 0.5) * 20;
            mainPosArray[i + 1] = (Math.random() - 0.5) * 20;
            mainPosArray[i + 2] = (Math.random() - 0.5) * 20;
            
            mainVelocities[i] = (Math.random() - 0.5) * 0.02;
            mainVelocities[i + 1] = (Math.random() - 0.5) * 0.02;
            mainVelocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        mainParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(mainPosArray, 3));

        const mainParticlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: '#32b8cd',
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const mainParticlesMesh = new THREE.Points(mainParticlesGeometry, mainParticlesMaterial);
        scene.add(mainParticlesMesh);
        particleSystems.push({ mesh: mainParticlesMesh, velocities: mainVelocities });

        // Secondary particle system (smaller, faster)
        const secondaryParticlesGeometry = new THREE.BufferGeometry();
        const secondaryParticlesCount = 500;
        const secondaryPosArray = new Float32Array(secondaryParticlesCount * 3);
        const secondaryVelocities = new Float32Array(secondaryParticlesCount * 3);

        for (let i = 0; i < secondaryParticlesCount * 3; i += 3) {
            secondaryPosArray[i] = (Math.random() - 0.5) * 15;
            secondaryPosArray[i + 1] = (Math.random() - 0.5) * 15;
            secondaryPosArray[i + 2] = (Math.random() - 0.5) * 15;
            
            secondaryVelocities[i] = (Math.random() - 0.5) * 0.03;
            secondaryVelocities[i + 1] = (Math.random() - 0.5) * 0.03;
            secondaryVelocities[i + 2] = (Math.random() - 0.5) * 0.03;
        }

        secondaryParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPosArray, 3));

        const secondaryParticlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#2da6b2',
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const secondaryParticlesMesh = new THREE.Points(secondaryParticlesGeometry, secondaryParticlesMaterial);
        scene.add(secondaryParticlesMesh);
        particleSystems.push({ mesh: secondaryParticlesMesh, velocities: secondaryVelocities });

        // Create advanced geometric shapes
        const shapes = [];
        
        // Torus shapes
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.TorusGeometry(0.5, 0.1, 8, 16);
            const material = new THREE.MeshBasicMaterial({
                color: '#32b8cd',
                transparent: true,
                opacity: 0.1,
                wireframe: true
            });
            
            const shape = new THREE.Mesh(geometry, material);
            
            shape.position.x = (Math.random() - 0.5) * 15;
            shape.position.y = (Math.random() - 0.5) * 15;
            shape.position.z = (Math.random() - 0.5) * 15;
            
            shape.rotation.x = Math.random() * Math.PI;
            shape.rotation.y = Math.random() * Math.PI;
            
            shapes.push(shape);
            scene.add(shape);
        }

        // Octahedron shapes
        for (let i = 0; i < 4; i++) {
            const geometry = new THREE.OctahedronGeometry(0.8);
            const material = new THREE.MeshBasicMaterial({
                color: '#2da6b2',
                transparent: true,
                opacity: 0.08,
                wireframe: true
            });
            
            const shape = new THREE.Mesh(geometry, material);
            
            shape.position.x = (Math.random() - 0.5) * 12;
            shape.position.y = (Math.random() - 0.5) * 12;
            shape.position.z = (Math.random() - 0.5) * 12;
            
            shapes.push(shape);
            scene.add(shape);
        }

        camera.position.z = 10;

        // Enhanced mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Performance tracking
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        // Enhanced animation loop
        function animate(currentTime) {
            requestAnimationFrame(animate);

            // Throttle to target FPS
            if (currentTime - lastTime < frameInterval) return;
            lastTime = currentTime;

            // Smooth mouse following
            targetX += (mouseX - targetX) * 0.02;
            targetY += (mouseY - targetY) * 0.02;

            // Animate particle systems
            particleSystems.forEach((system, index) => {
                const positions = system.mesh.geometry.attributes.position.array;
                const velocities = system.velocities;
                
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += velocities[i];
                    positions[i + 1] += velocities[i + 1];
                    positions[i + 2] += velocities[i + 2];
                    
                    // Boundary checking
                    if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
                    if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
                    if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
                }
                
                system.mesh.geometry.attributes.position.needsUpdate = true;
                system.mesh.rotation.x += 0.0005 * (index + 1);
                system.mesh.rotation.y += 0.0003 * (index + 1);
            });

            // Animate shapes with different patterns
            shapes.forEach((shape, index) => {
                const time = currentTime * 0.001;
                
                shape.rotation.x += 0.003 + index * 0.0002;
                shape.rotation.y += 0.002 + index * 0.0003;
                shape.rotation.z += 0.001 + index * 0.0001;
                
                // Floating motion
                shape.position.y += Math.sin(time + index) * 0.003;
                shape.position.x += Math.cos(time * 0.7 + index) * 0.002;
            });

            // Enhanced mouse interaction
            camera.position.x += (targetX * 0.5 - camera.position.x) * 0.03;
            camera.position.y += (targetY * 0.5 - camera.position.y) * 0.03;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        // Clean up function
        window.threeCleanup = function() {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            particleSystems.forEach(system => {
                system.mesh.geometry.dispose();
                system.mesh.material.dispose();
            });
            shapes.forEach(shape => {
                shape.geometry.dispose();
                shape.material.dispose();
            });
        };

    } catch (error) {
        console.warn('Advanced Three.js initialization failed:', error);
        createAdvancedFallbackAnimation();
    }
}

// Advanced Fallback Animation
function createAdvancedFallbackAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const connectionDistance = 120;

    // Create particles with different types
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.5 + 0.2,
            size: Math.random() * 2 + 1,
            type: Math.random() > 0.8 ? 'special' : 'normal'
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((particle, index) => {
            // Mouse interaction
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x += dx * 0.002;
                particle.y += dy * 0.002;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary collision
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            if (particle.type === 'special') {
                ctx.fillStyle = `rgba(45, 166, 178, ${particle.opacity})`;
            } else {
                ctx.fillStyle = `rgba(50, 184, 205, ${particle.opacity})`;
            }
            ctx.fill();

            // Draw connections
            for (let j = index + 1; j < particles.length; j++) {
                const other = particles[j];
                const dist = Math.sqrt(
                    (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
                );
                
                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(50, 184, 205, ${0.1 * (1 - dist / connectionDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'AI Developer',
        'Data Scientist', 
        'Software Engineer',
        'Machine Learning Engineer',
        'Computer Vision Developer',
        'Python Developer',
        'Deep Learning Specialist',
        'Research Scientist'
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 120;

    function type() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 60;
        } else {
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2500; // Longer pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 800; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation with delay
    setTimeout(type, 1500);
}

// Advanced Scroll Effects with Section-Specific Animations
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.borderBottom = '1px solid rgba(119, 124, 124, 0.2)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(119, 124, 124, 0.1)';
            navbar.style.boxShadow = 'none';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Advanced Intersection Observer for animations
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                    
                    // Trigger specific animations based on element class
                    if (element.classList.contains('stat-item')) {
                        triggerCounterAnimation(element);
                    }
                    
                    if (element.classList.contains('skill-category')) {
                        triggerSkillBarAnimation(element);
                    }
                    
                    if (element.classList.contains('text-reveal')) {
                        triggerTextReveal(element);
                    }
                }, delay * 100);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Observe stat items and skill categories
    const statItems = document.querySelectorAll('.stat-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const textReveals = document.querySelectorAll('.text-reveal');
    
    [...statItems, ...skillCategories, ...textReveals].forEach(element => {
        observer.observe(element);
    });
}

// Counter Animations
function initCounterAnimations() {
    // This will be triggered by the scroll observer
}

function triggerCounterAnimation(element) {
    const counter = element.querySelector('.counter-number');
    if (!counter) return;
    
    const target = parseFloat(element.dataset.target || counter.dataset.target);
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            counter.textContent = current.toFixed(2);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16); // ~60fps
}

// Skill Bar Animations
function initSkillAnimations() {
    // This will be triggered by the scroll observer
}

function triggerSkillBarAnimation(element) {
    const skillBars = element.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.dataset.width;
        if (width) {
            setTimeout(() => {
                bar.style.setProperty('--progress-width', width);
                bar.parentElement.classList.add('animate');
            }, index * 200);
        }
    });
}

// Text Reveal Animations
function initTextRevealAnimations() {
    // This will be triggered by the scroll observer
}

function triggerTextReveal(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

// Fixed Project Filtering System
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Initializing project filtering...', {
        filterButtons: filterButtons.length,
        projectCards: projectCards.length
    });
    
    if (!filterButtons.length || !projectCards.length) {
        console.warn('No filter buttons or project cards found');
        return;
    }
    
    // Log initial project categories
    projectCards.forEach((card, index) => {
        const category = card.dataset.category;
        console.log(`Project ${index} category:`, category);
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = button.dataset.filter;
            console.log('Filter clicked:', filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const categories = (card.dataset.category || '').toLowerCase();
                const shouldShow = filter === 'all' || categories.includes(filter.toLowerCase());
                
                console.log(`Project ${index}: categories="${categories}", filter="${filter}", shouldShow=${shouldShow}`);
                
                if (shouldShow) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    card.style.display = 'block';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.9)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Continuous Background Animations
function initContinuousAnimations() {
    // Floating shapes animation
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        const duration = 8 + Math.random() * 4; // 8-12 seconds
        const delay = index * 0.5;
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
    
    // Skill bubbles animation
    const skillBubbles = document.querySelectorAll('.bubble');
    skillBubbles.forEach((bubble, index) => {
        const duration = 6 + Math.random() * 4;
        const delay = index * 0.8;
        
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
    });
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add focus animations to form inputs
        const inputs = contactForm.querySelectorAll('.animated-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Animate button
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showAdvancedNotification('Please fill in all fields.', 'error');
                resetSubmitButton();
                return;
            }
            
            // Simulate sending delay
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:abdulrehaan7711@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open email client
                window.open(mailtoLink);
                
                // Show success message
                showAdvancedNotification('Thank you! Your email client will open to send the message.', 'success');
                
                // Reset form
                this.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Success animation
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    resetSubmitButton();
                }, 3000);
                
            }, 1500);
            
            function resetSubmitButton() {
                submitBtn.innerHTML = originalText;
                submitBtn.style.transform = 'scale(1)';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }
        });
    }
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on nav links with animation
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Fixed Enhanced Smooth Scrolling
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    
    // Handle all clicks on anchor links
    document.addEventListener('click', function(e) {
        // Find the closest anchor link
        const link = e.target.closest('a[href^="#"]');
        
        if (link) {
            e.preventDefault();
            console.log('Smooth scroll clicked:', link.getAttribute('href'));
            
            const targetId = link.getAttribute('href');
            
            // Handle special case for #home or empty hash
            let targetSection;
            if (targetId === '#home' || targetId === '#') {
                targetSection = document.querySelector('#home') || document.body;
            } else {
                targetSection = document.querySelector(targetId);
            }
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                let targetPosition;
                
                if (targetId === '#home' || targetId === '#') {
                    targetPosition = 0; // Scroll to very top for home
                } else {
                    targetPosition = targetSection.offsetTop - navHeight;
                }
                
                console.log('Scrolling to:', targetPosition);
                
                // Enhanced smooth scrolling
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Add ripple effect to clicked link
                addRippleEffect(link, e);
            } else {
                console.warn('Target section not found:', targetId);
            }
        }
    });
    
    // Also handle direct navigation for back-to-top functionality
    const backToTopLinks = document.querySelectorAll('.back-to-top, a[href="#home"], a[href="#"]');
    console.log('Found back-to-top links:', backToTopLinks.length);
    
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to top clicked');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Fixed Active Navigation with Smooth Transitions
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Initializing active navigation...', {
        sections: sections.length,
        navLinks: navLinks.length
    });

    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        // Check if we're at the very top
        if (window.scrollY < 50) {
            current = 'home';
        } else {
            // Find the current section
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
        }

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            // Only add active if the section is actually in view
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveNav();
}

// Advanced Notification System
function showAdvancedNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.advanced-notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `advanced-notification notification--${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    const color = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-progress"></div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(38, 40, 40, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        border-radius: 12px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    // Style the icon
    const iconEl = notification.querySelector('.notification-icon');
    iconEl.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${color};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        flex-shrink: 0;
    `;
    
    // Style the progress bar
    const progressEl = notification.querySelector('.notification-progress');
    progressEl.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: ${color};
        border-radius: 0 0 12px 12px;
        width: 100%;
        transform-origin: left;
        animation: notificationProgress 4s linear forwards;
    `;

    // Add progress animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationProgress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
    `;
    document.head.appendChild(style);

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
                document.head.removeChild(style);
            }
        }, 400);
    }, 4000);
}

// Ripple Effect
function addRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(50, 184, 205, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Performance optimizations
window.addEventListener('load', () => {
    // Mark page as loaded
    document.body.classList.add('loaded');
    
    // Optimize animations for reduced motion preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Preload critical animations
    requestAnimationFrame(() => {
        const criticalElements = document.querySelectorAll('.hero-title, .hero-subtitle, .nav-logo');
        criticalElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    });
});

// Error handling and fallbacks
window.addEventListener('error', (e) => {
    console.warn('Error caught:', e.message);
    
    if (e.message.includes('THREE') || e.message.includes('WebGL')) {
        console.warn('Three.js error detected, using fallback animation');
        setTimeout(createAdvancedFallbackAnimation, 1000);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.threeCleanup) {
        window.threeCleanup();
    }
});

// Initialize intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Lazy load animations for better performance
function initLazyAnimations() {
    const lazyElements = document.querySelectorAll('[data-animate]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate;
                
                element.classList.add(`animate-${animationType}`);
                lazyObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', initLazyAnimations);

// Best Practice: Section Animation & Overlap Fix
function initSectionAnimations() {
    // Animate all .animate-on-scroll, .animate-slide-down, .animate-fade-up
    const animatedEls = document.querySelectorAll('.animate-on-scroll, .animate-slide-down, .animate-fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Highlight important text on animation
                if (entry.target.classList.contains('highlight-text')) {
                    entry.target.style.color = '#32b8cd'; // Teal highlight
                    entry.target.style.fontWeight = '600';
                }
            }
        });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => observer.observe(el));
}

// Best Practice: Prevent Section Overlap
function fixSectionOverlap() {
    // Ensure all .section have enough z-index and padding
    document.querySelectorAll('.section').forEach(section => {
        section.style.zIndex = 1;
        section.style.position = 'relative';
        section.style.paddingTop = window.innerWidth < 480 ? '40px' : window.innerWidth < 768 ? '60px' : '100px';
        section.style.paddingBottom = window.innerWidth < 480 ? '40px' : window.innerWidth < 768 ? '60px' : '100px';
    });
    // Floating backgrounds always behind
    document.querySelectorAll('.section-background, .floating-shapes, .floating-particles, .educational-elements, .floating-icons, .code-rain, .skill-bubbles, .academic-elements, .communication-elements').forEach(bg => {
        bg.style.zIndex = 0;
        bg.style.pointerEvents = 'none';
    });
    // Main content always above
    document.querySelectorAll('.container, .hero-content, .section-title, .about-content, .about-stats, .education-timeline, .experience-timeline, .projects-grid, .skills-container, .contact-content, .footer-content').forEach(content => {
        content.style.zIndex = 2;
        content.style.position = 'relative';
    });
}

// Improved Contact Section Text Visibility
function fixContactSectionContrast() {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.background = 'linear-gradient(135deg, #222 60%, #32b8cd 100%)';
        contactSection.style.color = '#fff';
        contactSection.querySelectorAll('.highlight-text').forEach(el => {
            el.style.color = '#32b8cd';
            el.style.fontWeight = '600';
        });
        contactSection.querySelectorAll('.form-label').forEach(el => {
            el.style.color = '#32b8cd';
        });
        contactSection.querySelectorAll('.form-control').forEach(el => {
            el.style.background = '#fff';
            el.style.color = '#222';
            el.style.border = '1px solid #32b8cd';
        });
    }
}

console.log('Ultimate Portfolio JavaScript with advanced animations loaded successfully');