// Banking Page Specific Functions
if (window.location.pathname.includes('banking.html')) {
    // Animated Counter for Statistics
    function animateCounter() {
        const counters = document.querySelectorAll('[data-count]');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / speed;
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Progress Bar Animation
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = width;
            }, 100);
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        animateCounter();
        animateProgressBars();
    });
}

// Who We Are Page Specific Functions
if (window.location.pathname.includes('who-we-are.html')) {
    // Timeline Animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Org Chart Hover Effects
    function initOrgChart() {
        const orgBoxes = document.querySelectorAll('.org-chart-box');
        
        orgBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        animateTimeline();
        initOrgChart();
    });
}

// Common Functions for Both Pages
// Dynamic Header/Footer Loading
function loadCommonElements() {
    // Load header
    if (document.getElementById('header-placeholder')) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                initHeaderScripts();
            });
    }

    // Load footer
    if (document.getElementById('footer-placeholder')) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
                initFooterScripts();
            });
    }
}

// Initialize header scripts after loading
function initHeaderScripts() {
    // Rerun any header-specific scripts
    initDateTime();
    initThemeToggle();
    initSearch();
}

// Initialize footer scripts after loading
function initFooterScripts() {
    // Initialize visitor counter
    initVisitorCounter();
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Newsletter subscription handler
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show success message
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    // Set color based on type
    const colors = {
        'success': 'bg-green-500 text-white',
        'error': 'bg-red-500 text-white',
        'info': 'bg-blue-500 text-white',
        'warning': 'bg-yellow-500 text-black'
    };
    
    notification.classList.add(...colors[type].split(' '));
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} mr-3"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Print functionality
function initPrintFunction() {
    const printButtons = document.querySelectorAll('.print-button');
    
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
}

// Download functionality
function initDownloadTracking() {
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track download
            const fileName = this.href.split('/').pop();
            console.log('Download tracked:', fileName);
            
            // Google Analytics tracking (if implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'file_name': fileName,
                    'file_type': fileName.split('.').pop()
                });
            }
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    // Skip to main content
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.getElementById('main-content');
            if (main) {
                main.tabIndex = -1;
                main.focus();
            }
        });
    }
    
    // Keyboard navigation for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menu.classList.toggle('hidden');
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // Show error message
                    let error = input.nextElementSibling;
                    if (!error || !error.classList.contains('error-message')) {
                        error = document.createElement('span');
                        error.className = 'error-message text-red-500 text-sm mt-1';
                        error.textContent = 'This field is required';
                        input.parentNode.insertBefore(error, input.nextSibling);
                    }
                } else {
                    input.classList.remove('border-red-500');
                    const error = input.nextElementSibling;
                    if (error && error.classList.contains('error-message')) {
                        error.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });
}

// Search functionality enhancement
function enhanceSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length >= 3) {
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        }
    });
}

// Perform search
async function performSearch(query) {
    try {
        // In a real implementation, this would call an API
        const results = await mockSearchAPI(query);
        displaySearchResults(results);
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Mock search API
function mockSearchAPI(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResults = [
                { title: 'Jan Dhan Yojana', url: '/schemes/jan-dhan.html', snippet: 'Financial inclusion program...' },
                { title: 'Banking Services', url: '/banking.html', snippet: 'Comprehensive banking solutions...' },
                { title: 'Insurance Schemes', url: '/insurance.html', snippet: 'Government insurance programs...' }
            ].filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.snippet.toLowerCase().includes(query.toLowerCase())
            );
            
            resolve(mockResults);
        }, 200);
    });
}

// Display search results
function displaySearchResults(results) {
    let dropdown = document.getElementById('searchDropdown');
    
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'searchDropdown';
        dropdown.className = 'absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 hidden z-50';
        document.getElementById('searchInput').parentElement.appendChild(dropdown);
    }
    
    if (results.length === 0) {
        dropdown.innerHTML = '<p class="p-4 text-gray-500">No results found</p>';
    } else {
        dropdown.innerHTML = results.map(result => `
            <a href="${result.url}" class="block p-4 hover:bg-gray-100 border-b">
                <h4 class="font-semibold">${result.title}</h4>
                <p class="text-sm text-gray-600">${result.snippet}</p>
            </a>
        `).join('');
    }
    
    dropdown.classList.remove('hidden');
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function hideDropdown(e) {
        if (!e.target.closest('#searchInput') && !e.target.closest('#searchDropdown')) {
            dropdown.classList.add('hidden');
            document.removeEventListener('click', hideDropdown);
        }
    });
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCommonElements();
    initSmoothScroll();
    initLazyLoading();
    initPrintFunction();
    initDownloadTracking();
    initAccessibility();
    initFormValidation();
    enhanceSearch();
});

// Export functions for use in other scripts
window.pageUtils = {
    showNotification,
    animateCounter,
    animateProgressBars,
    initFormValidation
};