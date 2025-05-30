// Who We Are Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initWhoWeArePage();
});

function initWhoWeArePage() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initTimelineInteractions();
    initOrgChartInteractions();
    initLeadershipCards();
    initValueCards();
    
    // Track page view
    dfsAnalytics.track('who_we_are_page_view');
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                
                if (entry.target.classList.contains('mission-item')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .mission-item, .value-card, section').forEach(el => {
        observer.observe(el);
    });
}

// Initialize timeline interactions
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Expand timeline item with more details
            const isExpanded = this.classList.contains('expanded');
            
            // Close all other items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('expanded');
            });
            
            if (!isExpanded) {
                this.classList.add('expanded');
                showTimelineDetails(this, index);
            }
            
            // Track interaction
            dfsAnalytics.track('timeline_item_clicked', {
                year: this.querySelector('.timeline-dot').textContent,
                index: index
            });
        });
    });
}

// Show timeline details
function showTimelineDetails(item, index) {
    const detailsData = [
        {
            year: 2008,
            title: "Department Established",
            details: "The Department of Financial Services was carved out from the Department of Economic Affairs to provide focused attention to the financial sector including banking, insurance, and pension reforms.",
            achievements: [
                "Established dedicated divisions for banking, insurance, and financial inclusion",
                "Set up framework for coordinated policy making",
                "Created infrastructure for monitoring financial sector performance"
            ]
        },
        {
            year: 2014,
            title: "Pradhan Mantri Jan Dhan Yojana",
            details: "Launched the world's largest financial inclusion program with a vision to provide universal access to banking facilities.",
            achievements: [
                "Opened 55+ crore bank accounts",
                "Provided RuPay debit cards to account holders",
                "Enabled Direct Benefit Transfer",
                "Created foundation for digital payments ecosystem"
            ]
        },
        {
            year: 2015,
            title: "Jan Suraksha Schemes",
            details: "Launched affordable insurance and pension schemes for the unorganized sector.",
            achievements: [
                "PMJJBY: Life insurance coverage of ₹2 lakh at ₹436/year",
                "PMSBY: Accident insurance of ₹2 lakh at ₹20/year",
                "APY: Guaranteed pension scheme for unorganized sector",
                "Combined enrollment of over 40 crore"
            ]
        },
        {
            year: 2020,
            title: "PSB Consolidation",
            details: "Mega merger of public sector banks to create banks of scale and enhance capacity.",
            achievements: [
                "Merged 10 PSBs into 4 large banks",
                "Enhanced operational efficiency",
                "Improved risk management capabilities",
                "Strengthened balance sheets"
            ]
        },
        {
            year: 2022,
            title: "Digital Banking Units",
            details: "Launched 75 Digital Banking Units in 75 districts to provide digital banking services.",
            achievements: [
                "24x7 digital banking services",
                "Paperless and efficient operations",
                "Enhanced customer experience",
                "Bridged urban-rural digital divide"
            ]
        }
    ];

    const data = detailsData[index];
    if (!data) return;

    // Create or update details panel
    let detailsPanel = item.querySelector('.timeline-details');
    if (!detailsPanel) {
        detailsPanel = document.createElement('div');
        detailsPanel.className = 'timeline-details mt-4 p-4 bg-blue-50 rounded-lg';
        item.appendChild(detailsPanel);
    }

    detailsPanel.innerHTML = `
        <h4 class="font-bold text-lg mb-2">${data.title}</h4>
        <p class="text-gray-700 mb-3">${data.details}</p>
        <h5 class="font-semibold mb-2">Key Achievements:</h5>
        <ul class="space-y-1">
            ${data.achievements.map(achievement => `
                <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                    <span class="text-sm">${achievement}</span>
                </li>
            `).join('')}
        </ul>
    `;

    // Smooth scroll to the expanded item
    setTimeout(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Initialize organization chart interactions
function initOrgChartInteractions() {
    const orgBoxes = document.querySelectorAll('.org-box');
    
    orgBoxes.forEach(box => {
        // Add hover effect
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '10';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        // Add click interaction
        box.addEventListener('click', function() {
            const title = this.querySelector('h3, h4, h5').textContent;
            const role = this.querySelector('p')?.textContent || '';
            
            showOrgDetails(title, role);
            
            // Track interaction
            dfsAnalytics.track('org_chart_clicked', {
                position: title,
                level: this.className.includes('level-1') ? 1 : 
                       this.className.includes('level-2') ? 2 : 
                       this.className.includes('level-3') ? 3 : 4
            });
        });
    });
}

// Show organization details
function showOrgDetails(title, role) {
    const modal = createModal('org-details-modal', `
        <div class="p-6">
            <h3 class="text-2xl font-bold mb-4">${title}</h3>
            ${role ? `<p class="text-lg text-gray-600 mb-4">${role}</p>` : ''}
            <div class="space-y-4">
                <div>
                    <h4 class="font-semibold mb-2">Key Responsibilities</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        <li>Policy formulation and implementation</li>
                        <li>Monitoring and evaluation of programs</li>
                        <li>Stakeholder coordination and management</li>
                        <li>Strategic planning and execution</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">Contact Information</h4>
                    <p class="text-gray-700">
                        <i class="fas fa-phone mr-2"></i>+91-11-2374xxxx<br>
                        <i class="fas fa-envelope mr-2"></i>office-dfs@nic.in
                    </p>
                </div>
            </div>
            <button onclick="closeModal('org-details-modal')" class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Close
            </button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// Initialize leadership cards
function initLeadershipCards() {
    const leaderCards = document.querySelectorAll('.leader-card');
    
    leaderCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const position = this.querySelector('p').textContent;
            
            showLeaderProfile(name, position);
            
            // Track interaction
            dfsAnalytics.track('leader_profile_viewed', {
                name: name,
                position: position
            });
        });
    });
}

// Show leader profile
function showLeaderProfile(name, position) {
    // In a real application, this would fetch data from API
    const profileData = {
        name: name,
        position: position,
        bio: "Distinguished civil servant with over 30 years of experience in public administration and financial sector reforms.",
        education: [
            "MBA from Indian Institute of Management",
            "BA (Hons) Economics from St. Stephen's College",
            "Certified Public Policy Professional"
        ],
        achievements: [
            "Led implementation of major banking reforms",
            "Instrumental in financial inclusion initiatives",
            "Recipient of Excellence in Public Service Award"
        ],
        tenure: "2023 - Present"
    };

    const modal = createModal('leader-profile-modal', `
        <div class="p-6 max-w-2xl">
            <div class="flex items-start mb-6">
                <img src="assets/images/leader-placeholder.jpg" alt="${name}" class="w-32 h-32 rounded-full mr-6">
                <div>
                    <h3 class="text-2xl font-bold">${name}</h3>
                    <p class="text-lg text-gray-600">${position}</p>
                    <p class="text-sm text-gray-500 mt-1">Tenure: ${profileData.tenure}</p>
                </div>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h4 class="font-semibold text-lg mb-2">Biography</h4>
                    <p class="text-gray-700">${profileData.bio}</p>
                </div>
                
                <div>
                    <h4 class="font-semibold text-lg mb-2">Education</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        ${profileData.education.map(edu => `<li>${edu}</li>`).join('')}
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-semibold text-lg mb-2">Key Achievements</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        ${profileData.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="mt-6 flex justify-end space-x-4">
                <button onclick="closeModal('leader-profile-modal')" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    Close
                </button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// Initialize value cards
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function() {
            const value = this.querySelector('h3').textContent;
            expandValueDetails(this, value);
            
            // Track interaction
            dfsAnalytics.track('core_value_clicked', {
                value: value
            });
        });
    });
}

// Expand value details
function expandValueDetails(card, value) {
    const valuesData = {
        'Integrity': {
            description: "We maintain the highest standards of ethics and transparency in all our operations.",
            examples: [
                "Regular audits and compliance checks",
                "Transparent decision-making processes",
                "Zero tolerance for corruption",
                "Public disclosure of all policies"
            ]
        },
        'Inclusivity': {
            description: "We ensure financial services reach every citizen regardless of their economic status.",
            examples: [
                "Jan Dhan Yojana reaching rural areas",
                "Multi-lingual banking services",
                "Special schemes for marginalized sections",
                "Accessible banking infrastructure"
            ]
        },
        'Innovation': {
            description: "We embrace technology and new ideas to transform financial services.",
            examples: [
                "Digital Banking Units",
                "UPI and digital payment systems",
                "AI-powered customer service",
                "Blockchain initiatives"
            ]
        },
        'Security': {
            description: "We protect citizens' financial interests and ensure system stability.",
            examples: [
                "Robust cyber security framework",
                "Deposit insurance coverage",
                "Fraud prevention mechanisms",
                "Regular security audits"
            ]
        }
    };

    const data= valuesData[value];
    if (!data) return;

    // Toggle expanded state
    const isExpanded = card.classList.contains('expanded');
    
    // Remove expansion from all cards
    document.querySelectorAll('.value-card').forEach(c => {
        c.classList.remove('expanded');
        const details = c.querySelector('.value-details');
        if (details) details.remove();
    });

    if (!isExpanded) {
        card.classList.add('expanded');
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'value-details mt-4 pt-4 border-t border-gray-200';
        detailsDiv.innerHTML = `
            <p class="text-gray-700 mb-3">${data.description}</p>
            <h4 class="font-semibold mb-2">How we practice this:</h4>
            <ul class="text-sm space-y-1">
                ${data.examples.map(example => `
                    <li class="flex items-start">
                        <i class="fas fa-chevron-right text-blue-500 mt-1 mr-2 text-xs"></i>
                        <span>${example}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        card.appendChild(detailsDiv);
    }
}

// Create modal helper
function createModal(id, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById(id);
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 class="text-xl font-bold">Details</h2>
                <button onclick="closeModal('${id}')" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            ${content}
        </div>
    `;

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(id);
        }
    });

    return modal;
}

// Close modal helper
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    }
}

// Vision/Mission interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to vision and mission cards
    const visionCard = document.querySelector('.vision-card');
    const missionCard = document.querySelector('.mission-card');

    if (visionCard) {
        visionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(5deg) rotateX(-5deg) scale(1.02)';
        });

        visionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0) rotateX(0) scale(1)';
        });
    }

    if (missionCard) {
        missionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(-5deg) rotateX(5deg) scale(1.02)';
        });

        missionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0) rotateX(0) scale(1)';
        });
    }

    // Add click tracking for mission items
    document.querySelectorAll('.mission-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const missionText = this.querySelector('h3').textContent;
            
            dfsAnalytics.track('mission_item_clicked', {
                mission: missionText,
                index: index
            });

            // Highlight the clicked item
            this.classList.add('highlight');
            setTimeout(() => this.classList.remove('highlight'), 1000);
        });
    });
});

// Partner organization interactions
document.addEventListener('DOMContentLoaded', function() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            const partnerName = this.getAttribute('title');
            showPartnerInfo(partnerName);
            
            dfsAnalytics.track('partner_logo_clicked', {
                partner: partnerName
            });
        });
    });
});

// Show partner information
function showPartnerInfo(partnerName) {
    const partners = {
        'Reserve Bank of India': {
            role: 'Central Banking Authority',
            website: 'https://www.rbi.org.in',
            description: 'Regulates the monetary and financial system of India'
        },
        'IRDAI': {
            role: 'Insurance Regulator',
            website: 'https://www.irdai.gov.in',
            description: 'Regulates and develops the insurance industry in India'
        },
        'PFRDA': {
            role: 'Pension Regulator',
            website: 'https://www.pfrda.org.in',
            description: 'Regulates and develops the pension sector in India'
        },
        'NABARD': {
            role: 'Rural Development Bank',
            website: 'https://www.nabard.org',
            description: 'Promotes sustainable rural development'
        },
        'NPCI': {
            role: 'Payment Systems Organization',
            website: 'https://www.npci.org.in',
            description: 'Operates retail payment systems in India'
        }
    };

    const partner = partners[partnerName];
    if (!partner) return;

    showNotification(
        `${partnerName}: ${partner.role}. Click to visit their website.`,
        'info'
    );

    // Open partner website in new tab after 2 seconds
    setTimeout(() => {
        window.open(partner.website, '_blank');
    }, 2000);
}

// Print functionality for org chart
function printOrgChart() {
    window.print();
    
    dfsAnalytics.track('org_chart_printed');
}

// Download org chart as PDF
function downloadOrgChart() {
    // In a real application, this would generate a PDF
    dfsAnalytics.track('org_chart_downloaded', {
        format: 'pdf'
    });
    
    showNotification('Organization chart PDF downloaded successfully', 'success');
}

// Search functionality within the page
function initPageSearch() {
    const searchBox = document.getElementById('pageSearchBox');
    if (!searchBox) return;

    searchBox.addEventListener('input', DFSUtils.debounce((e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 3) {
            clearHighlights();
            return;
        }

        highlightSearchTerms(query);
    }, 300));
}

// Highlight search terms
function highlightSearchTerms(query) {
    clearHighlights();
    
    const textNodes = getTextNodes(document.getElementById('main-content'));
    let matchCount = 0;

    textNodes.forEach(node => {
        const text = node.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        
        if (regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(regex, '<mark class="highlight">$1</mark>');
            node.parentNode.replaceChild(span, node);
            matchCount++;
        }
    });

    if (matchCount > 0) {
        showNotification(`Found ${matchCount} matches`, 'info');
        
        // Scroll to first match
        const firstMatch = document.querySelector('.highlight');
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        showNotification('No matches found', 'warning');
    }
}

// Clear search highlights
function clearHighlights() {
    document.querySelectorAll('.highlight').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// Get all text nodes
function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
            textNodes.push(node);
        }
    }

    return textNodes;
}

// Show notification helper
function showNotification(message, type = 'info') {
    if (window.pageUtils && window.pageUtils.showNotification) {
        window.pageUtils.showNotification(message, type);
    } else {
        console.log(`${type}: ${message}`);
    }
}

// Export functions for use in other scripts
window.whoWeAreFunctions = {
    showOrgDetails,
    showLeaderProfile,
    expandValueDetails,
    showPartnerInfo,
    printOrgChart,
    downloadOrgChart
};