document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                mobileMenu.classList.add('open');
                // Change icon to X
                menuBtn.innerHTML = '<i data-lucide="x" width="28" height="28"></i>';
            } else {
                mobileMenu.classList.remove('open');
                // Change icon to Menu
                menuBtn.innerHTML = '<i data-lucide="menu" width="28" height="28"></i>';
            }
            lucide.createIcons();
        });
    }

    // Scroll Effect for Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 || (isOpen && window.innerWidth < 768)) {
            navbar.classList.add('bg-bullet-900/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('bg-bullet-900/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Form Handling (Contact Page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message (simple alert replacement for vanilla)
            const formContainer = document.getElementById('form-container');
            formContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-center py-20 animate-on-scroll visible">
                    <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <i data-lucide="check-circle" width="40" height="40"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">Message Received</h3>
                    <p class="text-gray-400 font-serif">We'll be in touch shortly to discuss your project.</p>
                    <button onclick="window.location.reload()" class="mt-8 text-bullet-accent hover:text-white transition-colors text-sm uppercase font-bold tracking-widest flex items-center gap-2">
                        Send Another <i data-lucide="arrow-right" width="16"></i>
                    </button>
                </div>
            `;
            lucide.createIcons();
        });
    }
});
