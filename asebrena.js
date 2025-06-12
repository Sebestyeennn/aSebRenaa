document.addEventListener('DOMContentLoaded', function() {
    // Sima görgetés navigációs linkekhez
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar változtatás scrollozáskor
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Portfólió szűrő
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelector('.portfolio-container');
    
    // Portfólió elemek generálása
    const portfolioData = [
        { id: 1, category: 'residential', img: 'nappali.jpg', title: 'Modern nappali', desc: 'Kertvári családi ház' },
        { id: 2, category: 'residential', img: 'konyha.jpg', title: 'Minimalista konyha', desc: 'Belvárosi lakás' },
        { id: 3, category: 'commercial', img: 'etterem.jpg', title: 'Étterem tervezés', desc: 'Városi étterem' },
        { id: 4, category: 'commercial', img: 'hotellobby.jpg', title: 'Hotel lobby', desc: '5 csillagos hotel' },
        { id: 5, category: 'office', img: 'iroda.jpg', title: 'Kreatív iroda', desc: 'Tech startup' },
        { id: 6, category: 'office', img: 'konferenciaterem.jpg', title: 'Konferencia terem', desc: 'Multinacionális cég' },
        { id: 7, category: 'residential', img: 'apartman.jpg', title: 'Hálószobák', desc: 'Luxus apartman' },
        { id: 8, category: 'commercial', img: 'img-3819-copy.jpg', title: 'Kávézó belső', desc: 'Hipster kávézó' },
        { id: 9, category: 'office', img: 'targyalo.jpg', title: 'Tárgyalóterem', desc: 'Cég tárgyalóterem' }
    ];

    function generatePortfolioItems() {
        portfolioItems.innerHTML = '';
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `col-md-6 col-lg-4 mb-4 portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <div class="position-relative overflow-hidden">
                    <img src="${item.img}" alt="${item.title}" class="img-fluid portfolio-img">
                    <div class="portfolio-overlay">
                        <h5>${item.title}</h5>
                        <p>${item.desc}</p>
                        <a href="${item.img}" data-lightbox="portfolio" class="text-white"><i class="fas fa-search-plus"></i></a>
                    </div>
                </div>
            `;
            portfolioItems.appendChild(portfolioItem);
        });
    }

    generatePortfolioItems();

    // Portfólió szűrés
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktív gomb beállítása
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');
            
            items.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Űrlap validáció
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Itt lehetne AJAX kérés a form elküldéséhez
                alert('Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.');
                this.reset();
            }
        });
    }

    // Scroll animációk
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-img-container, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Azonnali ellenőrzés betöltéskor

    // Lightbox effekt portfólióhoz
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-search-plus')) {
            e.preventDefault();
            const imgUrl = e.target.parentElement.getAttribute('href');
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgUrl}" alt="Portfolio image">
                    <span class="close-lightbox">&times;</span>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        }
    });
});

// Lightbox stílus hozzáadása dinamikusan
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lightbox.show {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 5px solid white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .lightbox-content img {
            max-width: 95%;
        }
    }
`;
document.head.appendChild(lightboxStyle);