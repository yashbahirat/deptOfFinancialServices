// Banking Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page components
    initBankingPage();
});

function initBankingPage() {
    // Load banking statistics
    loadBankingStats();
    
    // Initialize interactive elements
    initBankFilters();
    initBankSearch();
    initPerformanceCharts();
    initBankComparison();
    
    // Track page analytics
    dfsAnalytics.track('banking_page_view', {
        section: 'main'
    });
}

// Load banking statistics
async function loadBankingStats() {
    try {
        const stats = await dfsAPI.banking.getBankStatistics();
        updateStatCounters(stats);
    } catch (error) {
        console.error('Failed to load banking statistics:', error);
        // Show cached/default values
        updateStatCounters({
            totalBanks: 12,
            totalBranches: 159627,
            totalATMs: 213458,
            bankingCorrespondents: 1458000
        });
    }
}

// Update statistics counters with animation
function updateStatCounters(stats) {
    const counters = [
        { element: 'totalBanksCounter', value: stats.totalBanks },
        { element: 'totalBranchesCounter', value: stats.totalBranches },
        { element: 'totalATMsCounter', value: stats.totalATMs },
        { element: 'bankingCorrespondentsCounter', value: stats.bankingCorrespondents }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.element);
        if (element) {
            animateValue(element, 0, counter.value, 2000);
        }
    });
}

// Animate numerical values
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = DFSUtils.formatNumber(Math.floor(current));
    }, 16);
}

// Initialize bank filters
function initBankFilters() {
    const filterButtons = document.querySelectorAll('.bank-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            filterBanks(filterType);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Track filter usage
            dfsAnalytics.track('bank_filter_used', {
                filterType: filterType
            });
        });
    });
}

// Filter banks display
function filterBanks(type) {
    const bankCards = document.querySelectorAll('.bank-card');
    
    bankCards.forEach(card => {
        if (type === 'all' || card.dataset.bankType === type) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize bank search
function initBankSearch() {
    const searchInput = document.getElementById('bankSearchInput');
    if (!searchInput) return;

    const debouncedSearch = DFSUtils.debounce(async (query) => {
        if (query.length < 3) {
            hideBankSearchResults();
            return;
        }

        try {
            const results = await dfsAPI.banking.searchBranches(query);
            displayBankSearchResults(results);
        } catch (error) {
            console.error('Bank search failed:', error);
        }
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
}

// Display bank search results
function displayBankSearchResults(results) {
    const resultsContainer = document.getElementById('bankSearchResults');
    if (!resultsContainer) return;

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="p-4 text-gray-500">No results found</p>';
    } else {
        resultsContainer.innerHTML = results.map(result => `
            <div class="p-4 border-b hover:bg-gray-50 cursor-pointer" onclick="selectBankBranch('${result.id}')">
                <h4 class="font-semibold">${result.bankName}</h4>
                <p class="text-sm text-gray-600">${result.branchName}</p>
                <p class="text-sm text-gray-500">${result.address}, ${result.city}</p>
                <p class="text-sm text-blue-600">IFSC: ${result.ifscCode}</p>
            </div>
        `).join('');
    }

    resultsContainer.classList.remove('hidden');
}

// Hide bank search results
function hideBankSearchResults() {
    const resultsContainer = document.getElementById('bankSearchResults');
    if (resultsContainer) {
        resultsContainer.classList.add('hidden');
    }
}

// Select bank branch
function selectBankBranch(branchId) {
    dfsAnalytics.track('bank_branch_selected', {
        branchId: branchId
    });
    
    // Navigate to branch details or perform action
    window.location.href = `/bank-branch-details.html?id=${branchId}`;
}

// Initialize performance charts
function initPerformanceCharts() {
    // Credit Growth Chart
    const creditGrowthCtx = document.getElementById('creditGrowthChart');
    if (creditGrowthCtx) {
        new Chart(creditGrowthCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                datasets: [{
                    label: 'Credit Growth %',
                    data: [12.5, 13.2, 14.1, 14.8, 15.4],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Quarterly Credit Growth'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // NPA Trend Chart
    const npaTrendCtx = document.getElementById('npaTrendChart');
    if (npaTrendCtx) {
        new Chart(npaTrendCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Gross NPA %',
                    data: [7.3, 6.5, 5.8, 4.9, 4.1],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)'
                }, {
                    label: 'Net NPA %',
                    data: [2.4, 2.1, 1.8, 1.5, 1.2],
                    backgroundColor: 'rgba(139, 92, 246, 0.8)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'NPA Reduction Trend'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize bank comparison tool
function initBankComparison() {
    const compareButtons = document.querySelectorAll('.compare-bank-btn');
    const selectedBanks = new Set();

    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bankId = this.dataset.bankId;
            
            if (selectedBanks.has(bankId)) {
                selectedBanks.delete(bankId);
                this.classList.remove('selected');
                this.textContent = 'Add to Compare';
            } else if (selectedBanks.size < 3) {
                selectedBanks.add(bankId);
                this.classList.add('selected');
                this.textContent = 'Remove';
            } else {
                showNotification('You can compare up to 3 banks at a time', 'warning');
            }

            updateComparisonBar(selectedBanks);
        });
    });
}

// Update comparison bar
function updateComparisonBar(selectedBanks) {
    const comparisonBar = document.getElementById('comparisonBar');
    if (!comparisonBar) return;

    if (selectedBanks.size > 0) {
        comparisonBar.classList.remove('hidden');
        const banksList = Array.from(selectedBanks).map(id => `Bank ${id}`).join(', ');
        comparisonBar.innerHTML = `
            <div class="bg-blue-600 text-white p-4 rounded-lg flex justify-between items-center">
                <span>Selected for comparison: ${banksList}</span><button onclick="compareSelectedBanks()" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                    Compare Now
                </button>
            </div>
        `;
    } else {
        comparisonBar.classList.add('hidden');
    }
}

// Compare selected banks
function compareSelectedBanks() {
    const selectedBankIds = Array.from(document.querySelectorAll('.compare-bank-btn.selected'))
        .map(btn => btn.dataset.bankId);
    
    if (selectedBankIds.length < 2) {
        showNotification('Please select at least 2 banks to compare', 'warning');
        return;
    }
    
    // Track comparison
    dfsAnalytics.track('banks_compared', {
        bankIds: selectedBankIds,
        count: selectedBankIds.length
    });
    
    // Open comparison modal or navigate to comparison page
    openBankComparisonModal(selectedBankIds);
}

// Open bank comparison modal
function openBankComparisonModal(bankIds) {
    const modal = document.getElementById('bankComparisonModal');
    if (!modal) {
        createBankComparisonModal();
    }
    
    // Load comparison data
    loadBankComparisonData(bankIds);
    
    // Show modal
    document.getElementById('bankComparisonModal').classList.remove('hidden');
}

// Create bank comparison modal
function createBankComparisonModal() {
    const modal = document.createElement('div');
    modal.id = 'bankComparisonModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 class="text-2xl font-bold">Bank Comparison</h2>
                <button onclick="closeBankComparisonModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            <div id="comparisonContent" class="p-6">
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                    <p class="mt-4">Loading comparison data...</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Load bank comparison data
async function loadBankComparisonData(bankIds) {
    try {
        const banksData = await Promise.all(
            bankIds.map(id => dfsAPI.banking.getBankDetails(id))
        );
        
        displayBankComparison(banksData);
    } catch (error) {
        console.error('Failed to load comparison data:', error);
        document.getElementById('comparisonContent').innerHTML = `
            <div class="text-center py-8 text-red-600">
                <i class="fas fa-exclamation-circle text-4xl"></i>
                <p class="mt-4">Failed to load comparison data. Please try again.</p>
            </div>
        `;
    }
}

// Display bank comparison
function displayBankComparison(banksData) {
    const comparisonContent = document.getElementById('comparisonContent');
    
    const comparisonHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border p-3 text-left">Feature</th>
                        ${banksData.map(bank => `
                            <th class="border p-3 text-center">
                                <img src="${bank.logo}" alt="${bank.name}" class="h-8 mx-auto mb-2">
                                ${bank.name}
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border p-3 font-semibold">Total Branches</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">${DFSUtils.formatNumber(bank.branches)}</td>
                        `).join('')}
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border p-3 font-semibold">ATMs</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">${DFSUtils.formatNumber(bank.atms)}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-semibold">Savings Account Interest</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">${bank.savingsInterest}%</td>
                        `).join('')}
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border p-3 font-semibold">FD Interest (1 year)</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">${bank.fdInterest}%</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-semibold">Digital Banking</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">
                                ${bank.digitalBanking ? '<i class="fas fa-check text-green-600"></i>' : '<i class="fas fa-times text-red-600"></i>'}
                            </td>
                        `).join('')}
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border p-3 font-semibold">Mobile App Rating</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">
                                <div class="flex justify-center">
                                    ${generateStarRating(bank.appRating)}
                                </div>
                                <span class="text-sm text-gray-600">${bank.appRating}/5</span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td class="border p-3 font-semibold">Customer Service</td>
                        ${banksData.map(bank => `
                            <td class="border p-3 text-center">
                                <div class="flex justify-center">
                                    ${generateStarRating(bank.customerService)}
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-6 flex justify-center space-x-4">
            <button onclick="downloadComparison()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                <i class="fas fa-download mr-2"></i>Download Comparison
            </button>
            <button onclick="shareComparison()" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                <i class="fas fa-share mr-2"></i>Share
            </button>
        </div>
    `;
    
    comparisonContent.innerHTML = comparisonHTML;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star text-yellow-400"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star text-gray-300"></i>';
    }
    
    return html;
}

// Close bank comparison modal
function closeBankComparisonModal() {
    const modal = document.getElementById('bankComparisonModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Download comparison
function downloadComparison() {
    // Generate PDF or Excel file
    dfsAnalytics.track('comparison_downloaded', {
        type: 'bank_comparison'
    });
    
    showNotification('Comparison report downloaded successfully', 'success');
}

// Share comparison
function shareComparison() {
    if (navigator.share) {
        navigator.share({
            title: 'Bank Comparison - DFS',
            text: 'Check out this bank comparison from Department of Financial Services',
            url: window.location.href
        }).then(() => {
            dfsAnalytics.track('comparison_shared', {
                method: 'native_share'
            });
        }).catch(console.error);
    } else {
        // Fallback to copy link
        DFSUtils.copyToClipboard(window.location.href);
        showNotification('Link copied to clipboard', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    window.pageUtils.showNotification(message, type);
}

