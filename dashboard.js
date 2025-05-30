// Global variables
let notifications = [
    { id: 1, title: 'DBT Credit Successful', message: 'PM-KISAN installment of ₹2,000 credited', time: '2 hours ago', read: false },
    { id: 2, title: 'KYC Update Required', message: 'Please update your Aadhaar details', time: '1 day ago', read: false },
    { id: 3, title: 'New Scheme Available', message: 'You may be eligible for PM Awas Yojana', time: '3 days ago', read: false }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadContent('dashboard');
    updateNotifications();
});

// Load content based on page
function loadContent(page) {
    const mainContent = document.getElementById('mainContent');
    
    // Update active menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('bg-blue-800');
        if (item.dataset.page === page) {
            item.classList.add('bg-blue-800');
        }
    });

    // Destroy existing charts before loading new content
    if (window.Chart) {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.destroy();
        });
    }

    // Load page content
    switch(page) {
        case 'dashboard':
            mainContent.innerHTML = getDashboardContent();
            // Initialize charts after DOM is updated
            requestAnimationFrame(() => {
                initializeCharts();
            });
            break;
        case 'accounts':
            mainContent.innerHTML = getAccountsContent();
            break;
        case 'schemes':
            mainContent.innerHTML = getSchemesContent();
            break;
        case 'applications':
            mainContent.innerHTML = getApplicationsContent();
            break;
        case 'transactions':
            mainContent.innerHTML = getTransactionsContent();
            break;
        case 'documents':
            mainContent.innerHTML = getDocumentsContent();
            break;
        case 'support':
            mainContent.innerHTML = getSupportContent();
            break;
        case 'profile':
            mainContent.innerHTML = getProfileContent();
            break;
        case 'settings':
            mainContent.innerHTML = getSettingsContent();
            break;
    }
}

// Dashboard content
function getDashboardContent() {
    return `
        <!-- Welcome Section -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold mb-2">Welcome back, Madhura!</h2>
            <p>Your financial overview at a glance</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="loadContent('accounts')">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-piggy-bank text-3xl text-blue-600"></i>
                    <span class="text-sm text-green-600">+12%</span>
                </div>
                <h3 class="text-2xl font-bold">₹45,678</h3>
                <p class="text-gray-600">Total Savings</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="loadContent('schemes')">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-shield-alt text-3xl text-green-600"></i>
                    <span class="text-sm text-green-600">Active</span>
                </div>
                <h3 class="text-2xl font-bold">3</h3>
                <p class="text-gray-600">Active Schemes</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-credit-card text-3xl text-purple-600"></i>
                    <span class="text-sm text-gray-600">RuPay</span>
                </div>
                <h3 class="text-2xl font-bold">2</h3>
                <p class="text-gray-600">Active Cards</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="loadContent('transactions')">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-rupee-sign text-3xl text-yellow-600"></i>
                    <span class="text-sm text-green-600">Credited</span>
                </div>
                <h3 class="text-2xl font-bold">₹2,500</h3>
                <p class="text-gray-600">Last DBT Amount</p>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-xl font-semibold mb-4">Transaction Overview</h3>
                <div class="chart-container" style="position: relative; height: 300px;">
                    <canvas id="transactionChart"></canvas>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-xl font-semibold mb-4">Scheme Benefits</h3>
                <div class="chart-container" style="position: relative; height: 300px;">
                    <canvas id="benefitChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
                <h3 class="text-xl font-semibold">Recent Activities</h3>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer" onclick="showTransactionDetail('TXN001')">
                        <div class="flex items-center space-x-4">
                            <div class="bg-green-100 p-3 rounded-full">
                                <i class="fas fa-arrow-down text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold">DBT Credit</h4>
                                <p class="text-sm text-gray-600">PM-KISAN Installment</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-green-600">+₹2,000</p>
                            <p class="text-sm text-gray-600">Mar 10, 2025</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer" onclick="showApplicationDetail('APP001')">
                        <div class="flex items-center space-x-4">
                            <div class="bg-blue-100 p-3 rounded-full">
                                <i class="fas fa-file-alt text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold">Application Submitted</h4>
                                <p class="text-sm text-gray-600">Atal Pension Yojana</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-blue-600">Pending</p>
                            <p class="text-sm text-gray-600">Mar 8, 2025</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer" onclick="showTransactionDetail('TXN002')">
                        <div class="flex items-center space-x-4">
                            <div class="bg-purple-100 p-3 rounded-full">
                                <i class="fas fa-shield-alt text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold">Insurance Premium Paid</h4>
                                <p class="text-sm text-gray-600">PMJJBY Annual Premium</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-red-600">-₹436</p>
                            <p class="text-sm text-gray-600">Mar 5, 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onclick="showApplySchemeModal()" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                    <i class="fas fa-plus-circle text-3xl text-blue-600 mb-2"></i>
                    <p class="font-semibold">Apply for Scheme</p>
                </button>
                <button onclick="downloadStatement()" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                    <i class="fas fa-download text-3xl text-green-600 mb-2"></i>
                    <p class="font-semibold">Download Statement</p>
                </button>
                <button onclick="showKYCModal()" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                    <i class="fas fa-sync text-3xl text-purple-600 mb-2"></i>
                    <p class="font-semibold">Update KYC</p>
                </button>
                <button onclick="loadContent('support')" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                    <i class="fas fa-headset text-3xl text-orange-600 mb-2"></i>
                    <p class="font-semibold">Raise Complaint</p>
                </button>
            </div>
        </div>
    `;
}

// Accounts content
function getAccountsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">My Accounts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">Jan Dhan Account</h3>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                    </div>
                    <div class="space-y-2">
                        <p class="text-gray-600">Account Number: XXXX XXXX 1234</p>
                        <p class="text-gray-600">Bank: State Bank of India</p>
                        <p class="text-2xl font-bold text-blue-600">₹12,456.78</p>
                    </div>
                    <div class="mt-4 flex space-x-2">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
                        <button class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Download Statement</button>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">Sukanya Samriddhi Account</h3>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                    </div>
                    <div class="space-y-2">
                        <p class="text-gray-600">Account Number: XXXX XXXX 5678</p>
                        <p class="text-gray-600">Bank: Post Office</p>
                        <p class="text-2xl font-bold text-blue-600">₹33,221.90</p>
                    </div>
                    <div class="mt-4 flex space-x-2">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
                        <button class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Download Statement</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Schemes content
function getSchemesContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">My Schemes</h2>
            <div class="grid grid-cols-1 gap-6">
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="bg-green-500 text-white p-4">
                        <h3 class="text-xl font-semibold">PM-KISAN</h3>
                        <p class="text-sm">Pradhan Mantri Kisan Samman Nidhi</p>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p class="text-gray-600">Status</p>
                                <p class="font-semibold text-green-600">Active</p>
                            </div>
                            <div>
                                <p class="text-gray-600">Total Received</p>
                                <p class="font-semibold">₹12,000</p>
                            </div>
                            <div>
                                <p class="text-gray-600">Next Installment</p>
                                <p class="font-semibold">June 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="bg-blue-500 text-white p-4">
                        <h3 class="text-xl font-semibold">PMJJBY</h3>
                        <p class="text-sm">Pradhan Mantri Jeevan Jyoti Bima Yojana</p>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p class="text-gray-600">Status</p>
                                <p class="font-semibold text-green-600">Active</p>
                            </div>
                            <div>
                                <p class="text-gray-600">Sum Assured</p>
                                <p class="font-semibold">₹2,00,000</p>
                            </div>
                            <div>
                                <p class="text-gray-600">Premium Due</p>
                                <p class="font-semibold">May 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Applications content
function getApplicationsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">My Applications</h2>
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">APP001</td>
                            <td class="px-6 py-4 whitespace-nowrap">Atal Pension Yojana</td>
                            <td class="px-6 py-4 whitespace-nowrap">Mar 8, 2025</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Pending
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button class="text-blue-600 hover:text-blue-900">View Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">APP002</td>
                            <td class="px-6 py-4 whitespace-nowrap">PM-KISAN</td>
                            <td class="px-6 py-4 whitespace-nowrap">Jan 15, 2025</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Approved
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button class="text-blue-600 hover:text-blue-900">View Details</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Transactions content
function getTransactionsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Transaction History</h2>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="mb-4 flex justify-between items-center">
                    <div class="flex space-x-4">
                        <select class="border rounded px-4 py-2">
                            <option>All Transactions</option>
                            <option>Credits</option>
                            <option>Debits</option>
                        </select>
                        <input type="date" class="border rounded px-4 py-2">
                        <input type="date" class="border rounded px-4 py-2">
                    </div>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        <i class="fas fa-download mr-2"></i>Export
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2">Date</th>
                                <th class="text-left py-2">Description</th>
                                <th class="text-left py-2">Type</th>
                                <th class="text-right py-2">Amount</th>
                                <th class="text-right py-2">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3">Mar 10, 2025</td>
                                <td class="py-3">PM-KISAN Installment</td>
                                <td class="py-3"><span class="text-green-600">Credit</span></td>
                                <td class="py-3 text-right text-green-600">+₹2,000</td>
                                <td class="py-3 text-right">₹45,678</td>
                            </tr>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3">Mar 5, 2025</td>
                                <td class="py-3">PMJJBY Premium</td>
                                <td class="py-3"><span class="text-red-600">Debit</span></td>
                                <td class="py-3 text-right text-red-600">-₹436</td>
                                <td class="py-3 text-right">₹43,678</td>
                            </tr>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3">Feb 28, 2025</td>
                                <td class="py-3">ATM Withdrawal</td>
                                <td class="py-3"><span class="text-red-600">Debit</span></td>
                                <td class="py-3 text-right text-red-600">-₹5,000</td>
                                <td class="py-3 text-right">₹44,114</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Documents content
function getDocumentsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">My Documents</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer">
                    <i class="fas fa-file-pdf text-4xl text-red-600 mb-4"></i>
                    <h3 class="font-semibold mb-2">Aadhaar Card</h3>
                    <p class="text-sm text-gray-600 mb-4">Uploaded: Jan 15, 2025</p>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-download mr-2"></i>Download
                    </button>
                </div>
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer">
                    <i class="fas fa-file-pdf text-4xl text-red-600 mb-4"></i>
                    <h3 class="font-semibold mb-2">PAN Card</h3>
                    <p class="text-sm text-gray-600 mb-4">Uploaded: Jan 15, 2025</p>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-download mr-2"></i>Download
                    </button>
                </div>
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer">
                    <i class="fas fa-file-pdf text-4xl text-red-600 mb-4"></i>
                    <h3 class="font-semibold mb-2">Bank Statement</h3>
                    <p class="text-sm text-gray-600 mb-4">Generated: Mar 1, 2025</p>
                    <button class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-download mr-2"></i>Download
                    </button>
                </div>
            </div>
            <div class="mt-8">
                <button onclick="showUploadModal()" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                    <i class="fas fa-cloud-upload-alt mr-2"></i>Upload New Document
                </button>
            </div>
        </div>
    `;
}

// Support content
function getSupportContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Support Center</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-semibold mb-4">Raise a Complaint</h3>
                    <form onsubmit="submitComplaint(event)">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <select class="w-full border rounded px-3 py-2">
                                <option>Account Related</option>
                                <option>Scheme Related</option>
                                <option>Transaction Issue</option>
                                <option>Technical Problem</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                            <input type="text" class="w-full border rounded px-3 py-2" placeholder="Brief description">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea class="w-full border rounded px-3 py-2" rows="4" placeholder="Detailed description"></textarea>
                        </div>
                        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit Complaint</button>
                    </form>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-semibold mb-4">Contact Information</h3>
                    <div class="space-y-4">
                        <div>
                            <i class="fas fa-phone text-blue-600 mr-2"></i>
                            <span class="font-semibold">Toll Free:</span> 1800-XXX-XXXX
                        </div>
                        <div>
                            <i class="fas fa-envelope text-blue-600 mr-2"></i>
                            <span class="font-semibold">Email:</span> support@dfs.gov.in
                        </div>
                        <div>
                            <i class="fas fa-clock text-blue-600 mr-2"></i>
                            <span class="font-semibold">Working Hours:</span> Mon-Fri, 9 AM - 6 PM
                        </div>
                    </div>
                    <div class="mt-6">
                        <h4 class="font-semibold mb-2">Recent Tickets</h4>
                        <div class="space-y-2">
                            <div class="border rounded p-3">
                                <p class="font-semibold">#TKT001 - Account verification issue</p>
                                <p class="text-sm text-gray-600">Status: Resolved</p>
                            </div>
                            <div class="border rounded p-3">
                                <p class="font-semibold">#TKT002 - DBT not received</p>
                                <p class="text-sm text-gray-600">Status: In Progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Profile content
function getProfileContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">My Profile</h2>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center mb-6">
                    <img src="https://ui-avatars.com/api/?name=Madhura+Sanap&background=0D8ABC&color=fff&size=100" alt="Profile" class="w-24 h-24 rounded-full mr-6">
                    <div>
                        <h3 class="text-xl font-semibold">Madhura Sanap</h3>
                        <p class="text-gray-600">Consumer ID: DFS2025001234</p>
                        <button class="mt-2 text-blue-600 hover:text-blue-800">Change Photo</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input type="text" value="Madhura Sanap" class="w-full border rounded px-3 py-2" readonly>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" value="madhura.sanap@vit.edu" class="w-full border rounded px-3 py-2">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                        <input type="tel" value="+91 98765 43210" class="w-full border rounded px-3 py-2">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Aadhaar Number</label>
                        <input type="text" value="XXXX XXXX 1234" class="w-full border rounded px-3 py-2" readonly>
                    </div>
                </div>
                <div class="mt-6">
                    <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update Profile</button>
                </div>
            </div>
        </div>
    `;
}

// Settings content
function getSettingsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Settings</h2>
            <div class="bg-white rounded-lg shadow p-6">
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Notification Preferences</h3>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" checked class="mr-2">
                                <span>Email notifications for transactions</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" checked class="mr-2">
                                <span>SMS alerts for scheme updates</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2">
                                <span>Push notifications</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Security Settings</h3>
                        <div class="space-y-3">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Change Password</button>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">Enable 2FA</button>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Language Preference</h3>
                        <select class="border rounded px-4 py-2">
                            <option>English</option>
                            <option>हिंदी</option>
                            <option>தமிழ்</option>
                            <option>తెలుగు</option>
                        </select>
                    </div>
                </div>
                <div class="mt-6">
                    <button class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Changes</button>
                </div>
            </div>
        </div>
    `;
}

// Updated initializeCharts function
function initializeCharts() {
    // Ensure previous charts are destroyed
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.destroy();
    });

    // Small delay to ensure DOM is ready
    setTimeout(() => {
        // Transaction Chart
        const transactionCtx = document.getElementById('transactionChart');
        if (transactionCtx) {
            new Chart(transactionCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Credits',
                        data: [3000, 2500, 4000, 3500, 5000, 4500],
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.3
                    }, {
                        label: 'Debits',
                        data: [2000, 1500, 2500, 2000, 3000, 2500],
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 10,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }

        // Benefit Chart
        const benefitCtx = document.getElementById('benefitChart');
        if (benefitCtx) {
            new Chart(benefitCtx, {
                type: 'doughnut',
                data: {
                    labels: ['PM-KISAN', 'PMJJBY', 'PMSBY', 'APY', 'Others'],
                    datasets: [{
                        data: [12000, 436, 20, 5000, 2500],
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(34, 197, 94)',
                            'rgb(251, 146, 60)',
                            'rgb(147, 51, 234)',
                            'rgb(107, 114, 128)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 10,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return label + ': ₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }
    }, 100);
}


// Toggle functions
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('hidden');
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('hidden');
    updateNotifications();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

// Update notifications
function updateNotifications() {
    const notificationList = document.getElementById('notificationList');
    const notificationCount = document.getElementById('notificationCount');
    
    if (notificationList) {
        notificationList.innerHTML = notifications.map(notif => `
            <div class="p-3 hover:bg-gray-50 rounded cursor-pointer ${notif.read ? 'opacity-60' : ''}" onclick="markAsRead(${notif.id})">
                <p class="font-semibold text-sm">${notif.title}</p>
                <p class="text-xs text-gray-600">${notif.message}</p>
                <p class="text-xs text-gray-400 mt-1">${notif.time}</p>
            </div>
        `).join('');
    }
    
    const unreadCount = notifications.filter(n => !n.read).length;
    if (notificationCount) {
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Mark notification as read
function markAsRead(id) {
    const notif = notifications.find(n => n.id === id);
    if (notif) {
        notif.read = true;
        updateNotifications();
    }
}

// Clear all notifications
function clearNotifications() {
    notifications = [];
    updateNotifications();
}

// Show modals
function showApplySchemeModal() {
    alert('Apply for Scheme feature - This would open a modal with available schemes');
}

function showKYCModal() {
    alert('Update KYC feature - This would open a modal to update KYC documents');
}

function showUploadModal() {
    alert('Upload Document feature - This would open a file upload modal');
}

function showTransactionDetail(txnId) {
    alert(`Transaction Detail for ${txnId} - This would show detailed transaction information`);
}

function showApplicationDetail(appId) {
    alert(`Application Detail for ${appId} - This would show detailed application status`);
}

// Action functions
function downloadStatement() {
    alert('Downloading statement... This would generate and download a PDF statement');
}

function submitComplaint(event) {
    event.preventDefault();
    alert('Complaint submitted successfully! Ticket ID: TKT003');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const profileMenu = document.getElementById('profileMenu');
    const profileButton = event.target.closest('button[onclick="toggleProfileMenu()"]');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationButton = event.target.closest('button[onclick="toggleNotifications()"]');
    
    if (!profileButton && profileMenu && !profileMenu.contains(event.target)) {
        profileMenu.classList.add('hidden');
    }
    
    if (!notificationButton && notificationDropdown && !notificationDropdown.contains(event.target)) {
        notificationDropdown.classList.add('hidden');
    }
});

// Search functionality
function addSearchFunctionality() {
    const searchHtml = `
        <div class="mb-4">
            <div class="relative">
                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                <input type="text" id="globalSearch" placeholder="Search schemes, transactions, documents..." 
                       class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            </div>
        </div>
    `;
    return searchHtml;
}

// Real-time data updates
function startDataUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        // Update notification count
        const randomNotif = Math.random() > 0.8;
        if (randomNotif) {
            notifications.unshift({
                id: Date.now(),
                title: 'New Update',
                message: 'You have a new notification',
                time: 'Just now',
                read: false
            });
            updateNotifications();
        }
    }, 30000); // Every 30 seconds
}

// Export functionality
function exportData(format, data) {
    switch(format) {
        case 'pdf':
            alert('Exporting to PDF... This would generate a PDF document');
            break;
        case 'excel':
            alert('Exporting to Excel... This would generate an Excel file');
            break;
        case 'csv':
            // Simple CSV export
            const csv = convertToCSV(data);
            downloadFile(csv, 'export.csv', 'text/csv');
            break;
    }
}

function convertToCSV(data) {
    // Simple CSV conversion
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Enhanced scheme application modal
function showSchemeApplicationModal() {
    const modal = `
        <div id="schemeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Apply for Government Scheme</h2>
                    <button onclick="closeModal('schemeModal')" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <h3 class="font-semibold text-lg">PM Awas Yojana</h3>
                        <p class="text-sm text-gray-600 mb-2">Housing for All scheme</p>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
                    </div>
                    <div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <h3 class="font-semibold text-lg">PM Mudra Yojana</h3>
                        <p class="text-sm text-gray-600 mb-2">Business loan scheme</p>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
                    </div>
                    <div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <h3 class="font-semibold text-lg">Stand Up India</h3>
                        <p class="text-sm text-gray-600 mb-2">Entrepreneurship scheme</p>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

// Language switcher
function switchLanguage(lang) {
    const translations = {
        'en': {
            'dashboard': 'Dashboard',
            'myAccounts': 'My Accounts',
            'mySchemes': 'My Schemes',
            'welcome': 'Welcome back'
        },
        'hi': {
            'dashboard': 'डैशबोर्ड',
            'myAccounts': 'मेरे खाते',
            'mySchemes': 'मेरी योजनाएं',
            'welcome': 'वापसी पर स्वागत है'
        }
    };
    
    // Apply translations
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    startDataUpdates();
});

// Service Worker for offline functionality (create sw.js file)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registered');
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

// Advanced filtering and sorting
class DataTable {
    constructor(containerId, data, columns) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.columns = columns;
        this.filteredData = [...data];
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }

    render() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageData = this.filteredData.slice(start, end);
        
        let html = `
            <div class="mb-4 flex justify-between items-center">
                <input type="text" placeholder="Search..." onkeyup="dataTables['${this.container.id}'].search(this.value)" 
                       class="border rounded px-3 py-2">
                <select onchange="dataTables['${this.container.id}'].changePageSize(this.value)" class="border rounded px-3 py-2">
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            ${this.columns.map(col => `
                                <th class="text-left py-2 cursor-pointer hover:bg-gray-50" 
                                    onclick="dataTables['${this.container.id}'].sort('${col.key}')">
                                    ${col.label}
                                    ${this.sortColumn === col.key ? 
                                        (this.sortDirection === 'asc' ? '↑' : '↓') : ''}
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${pageData.map(row => `
                            <tr class="border-b hover:bg-gray-50">
                                ${this.columns.map(col => `
                                    <td class="py-3">${this.formatCell(row[col.key], col.type)}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${this.renderPagination()}
        `;
        
        this.container.innerHTML = html;
    }

    formatCell(value, type) {
        switch(type) {
            case 'currency':
                return `₹${value.toLocaleString('en-IN')}`;
            case 'date':
                return new Date(value).toLocaleDateString('en-IN');
            case 'status':
                const colors = {
                    'Active': 'green',
                    'Pending': 'yellow',
                    'Inactive': 'red'
                };
                return `<span class="px-2 py-1 text-xs rounded-full bg-${colors[value]}-100 text-${colors[value]}-800">${value}</span>`;
            default:
                return value;
        }
    }

    search(query) {
        if (!query) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(row => 
                Object.values(row).some(val => 
                    String(val).toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        this.currentPage = 1;
        this.render();
    }

    sort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }
        
        this.filteredData.sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            
            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        this.render();
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const pages = [];
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        
        return `
            <div class="flex justify-between items-center mt-4">
                <div class="text-sm text-gray-600">
                    Showing ${(this.currentPage - 1) * this.itemsPerPage + 1} to 
                    ${Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length)} of 
                    ${this.filteredData.length} entries
                </div>
                <div class="flex space-x-2">
                    <button onclick="dataTables['${this.container.id}'].changePage(${this.currentPage - 1})" 
                            ${this.currentPage === 1 ? 'disabled' : ''} 
                            class="px-3 py-1 border rounded ${this.currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-100'}">
                        Previous
                    </button>
                    ${pages.map(page => 
                        page === '...' ? '<span class="px-2">...</span>' : 
                        `<button onclick="dataTables['${this.container.id}'].changePage(${page})" 
                                class="px-3 py-1 border rounded ${page === this.currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}">
                            ${page}
                        </button>`
                    ).join('')}
                    <button onclick="dataTables['${this.container.id}'].changePage(${this.currentPage + 1})" 
                            ${this.currentPage === totalPages ? 'disabled' : ''} 
                            class="px-3 py-1 border rounded ${this.currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-100'}">
                        Next
                    </button>
                </div>
            </div>
        `;
    }

    changePage(page) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    }

    changePageSize(size) {
        this.itemsPerPage = parseInt(size);
        this.currentPage = 1;
        this.render();
    }
}

// Global data tables registry
const dataTables = {};

// Enhanced transaction data with more details
const transactionData = [
    { id: 'TXN001', date: '2025-03-10', description: 'PM-KISAN Installment', type: 'Credit', amount: 2000, balance: 45678, status: 'Completed' },
    { id: 'TXN002', date: '2025-03-05', description: 'PMJJBY Premium', type: 'Debit', amount: 436, balance: 43678, status: 'Completed' },
    { id: 'TXN003', date: '2025-02-28', description: 'ATM Withdrawal', type: 'Debit', amount: 5000, balance: 44114, status: 'Completed' },
    { id: 'TXN004', date: '2025-02-15', description: 'DBT Transfer', type: 'Credit', amount: 1500, balance: 49114, status: 'Completed' },
    { id: 'TXN005', date: '2025-02-01', description: 'Online Transfer', type: 'Debit', amount: 3000, balance: 47614, status: 'Completed' }
];

// Dashboard Analytics
class DashboardAnalytics {
    constructor() {
        this.events = [];
    }

    track(eventName, properties = {}) {
        const event = {
            name: eventName,
            timestamp: new Date(),
            properties: properties
        };
        this.events.push(event);
        console.log('Analytics Event:', event);
        
        // Send to analytics service in production
        // this.sendToAnalytics(event);
    }

    getUserBehaviorInsights() {
        const insights = {
            totalEvents: this.events.length,
            mostVisitedPages: this.getMostVisitedPages(),
            averageSessionDuration: this.getAverageSessionDuration(),
            featureUsage: this.getFeatureUsage()
        };
        return insights;
    }

    getMostVisitedPages() {
        const pageCounts = {};
        this.events.filter(e => e.name === 'page_view').forEach(event => {
            const page = event.properties.page;
            pageCounts[page] = (pageCounts[page] || 0) + 1;
        });
        return Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);
    }

    getAverageSessionDuration() {
        // Calculate average session duration
        return '15m 32s'; // Placeholder
    }

    getFeatureUsage() {
        const features = {};
        this.events.forEach(event => {
           if (event.name.startsWith('feature_')) {
                const feature = event.name.replace('feature_', '');
                features[feature] = (features[feature] || 0) + 1;
            }
        });
        return features;
    }
}

const analytics = new DashboardAnalytics();

// Biometric Authentication Simulation
class BiometricAuth {
    constructor() {
        this.isSupported = this.checkSupport();
    }

    checkSupport() {
        return 'credentials' in navigator && 'create' in navigator.credentials;
    }

    async authenticate() {
        if (!this.isSupported) {
            return this.fallbackAuth();
        }

        try {
            // Simulate biometric authentication
            const modal = this.showBiometricModal();
            
            // Simulate fingerprint scanning
            await this.simulateScan();
            
            modal.remove();
            return { success: true, method: 'biometric' };
        } catch (error) {
            console.error('Biometric auth failed:', error);
            return this.fallbackAuth();
        }
    }

    showBiometricModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-sm w-full text-center">
                <i class="fas fa-fingerprint text-6xl text-blue-600 mb-4 animate-pulse"></i>
                <h3 class="text-xl font-semibold mb-2">Biometric Authentication</h3>
                <p class="text-gray-600 mb-4">Place your finger on the sensor</p>
                <div class="flex justify-center">
                    <div class="spinner"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    async simulateScan() {
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 2000);
        });
    }

    fallbackAuth() {
        // Fallback to password
        const password = prompt('Enter your password:');
        return { success: password === 'demo123', method: 'password' };
    }
}

// Enhanced Security Features
class SecurityManager {
    constructor() {
        this.sessionTimeout = 15 * 60 * 1000; // 15 minutes
        this.lastActivity = Date.now();
        this.setupActivityMonitoring();
    }

    setupActivityMonitoring() {
        ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
            document.addEventListener(event, () => this.updateActivity());
        });

        // Check for inactivity every minute
        setInterval(() => this.checkInactivity(), 60000);
    }

    updateActivity() {
        this.lastActivity = Date.now();
    }

    checkInactivity() {
        const inactiveTime = Date.now() - this.lastActivity;
        if (inactiveTime > this.sessionTimeout) {
            this.showTimeoutWarning();
        }
    }

    showTimeoutWarning() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full">
                <h3 class="text-xl font-semibold mb-4">Session Timeout Warning</h3>
                <p class="text-gray-600 mb-6">Your session will expire in 60 seconds due to inactivity.</p>
                <div class="flex space-x-4">
                    <button onclick="securityManager.extendSession()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Continue Session
                    </button>
                    <button onclick="logout()" class="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
                        Logout
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Auto logout after 60 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                logout();
            }
        }, 60000);
    }

    extendSession() {
        this.updateActivity();
        document.querySelector('.fixed.inset-0').remove();
        showNotification('Session extended', 'success');
    }
}

const securityManager = new SecurityManager();

// AI-Powered Recommendations
class RecommendationEngine {
    constructor(userData) {
        this.userData = userData;
        this.schemes = [
            { id: 'pmay', name: 'PM Awas Yojana', category: 'housing', eligibility: ['income < 300000', 'no_house'] },
            { id: 'mudra', name: 'PM Mudra Yojana', category: 'business', eligibility: ['business_owner', 'income < 1000000'] },
            { id: 'sukanya', name: 'Sukanya Samriddhi Yojana', category: 'savings', eligibility: ['has_daughter', 'daughter_age < 10'] },
            { id: 'apy', name: 'Atal Pension Yojana', category: 'pension', eligibility: ['age > 18', 'age < 40'] }
        ];
    }

    getRecommendations() {
        const eligible = this.schemes.filter(scheme => 
            this.checkEligibility(scheme.eligibility)
        );

        return eligible.map(scheme => ({
            ...scheme,
            score: this.calculateRelevanceScore(scheme),
            reason: this.getRecommendationReason(scheme)
        })).sort((a, b) => b.score - a.score);
    }

    checkEligibility(criteria) {
        // Simplified eligibility check
        return Math.random() > 0.3; // 70% chance of eligibility for demo
    }

    calculateRelevanceScore(scheme) {
        // Calculate relevance based on user behavior and profile
        return Math.random() * 100;
    }

    getRecommendationReason(scheme) {
        const reasons = {
            'pmay': 'Based on your income level and housing status',
            'mudra': 'Perfect for your business expansion plans',
            'sukanya': 'Secure your daughter\'s future education',
            'apy': 'Start planning for retirement early'
        };
        return reasons[scheme.id] || 'Recommended for you';
    }
}

// Voice Assistant Integration
class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.setupRecognition();
    }

    setupRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.lang = 'en-IN';
            
            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processCommand(command);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateUI();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateUI();
            };
        }
    }

    start() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
            this.updateUI();
            this.speak('How can I help you?');
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateUI();
        }
    }

    processCommand(command) {
        console.log('Voice command:', command);
        
        const commands = {
            'show dashboard': () => loadContent('dashboard'),
            'show accounts': () => loadContent('accounts'),
            'show schemes': () => loadContent('schemes'),
            'check balance': () => this.speak('Your total balance is 45,678 rupees'),
            'recent transactions': () => loadContent('transactions'),
            'apply for scheme': () => showApplySchemeModal(),
            'logout': () => logout()
        };

        // Find matching command
        for (const [key, action] of Object.entries(commands)) {
            if (command.includes(key)) {
                action();
                this.speak('Done');
                return;
            }
        }

        this.speak('Sorry, I didn\'t understand that command');
    }

    speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        this.synthesis.speak(utterance);
    }

    updateUI() {
        const button = document.getElementById('voiceAssistantBtn');
        if (button) {
            button.innerHTML = this.isListening ? 
                '<i class="fas fa-microphone-slash"></i>' : 
                '<i class="fas fa-microphone"></i>';
            button.classList.toggle('bg-red-600', this.isListening);
            button.classList.toggle('bg-blue-600', !this.isListening);
        }
    }
}

// Add Voice Assistant Button to Header
function addVoiceAssistantButton() {
    const header = document.querySelector('.flex.items-center.space-x-4');
    if (header && !document.getElementById('voiceAssistantBtn')) {
        const button = document.createElement('button');
        button.id = 'voiceAssistantBtn';
        button.className = 'bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700';
        button.innerHTML = '<i class="fas fa-microphone"></i>';
        button.onclick = () => voiceAssistant.isListening ? voiceAssistant.stop() : voiceAssistant.start();
        header.insertBefore(button, header.firstChild);
    }
}

const voiceAssistant = new VoiceAssistant();

// QR Code Integration for Mobile App
function showQRCode() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <h3 class="text-xl font-semibold mb-4">Download Mobile App</h3>
            <div class="bg-gray-100 p-4 rounded mb-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://dfs.gov.in/mobile-app" 
                     alt="QR Code" class="mx-auto">
            </div>
            <p class="text-gray-600 mb-4">Scan this QR code to download our mobile app</p>
            <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform z-50`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export Reports Generator
class ReportGenerator {
    constructor() {
        this.templates = {
            'monthly': this.getMonthlyReportTemplate,
            'annual': this.getAnnualReportTemplate,
            'scheme': this.getSchemeReportTemplate,
            'tax': this.getTaxReportTemplate
        };
    }

    async generateReport(type, format = 'pdf') {
        showNotification('Generating report...', 'info');
        
        try {
            const reportData = await this.gatherReportData(type);
            const template = this.templates[type](reportData);
            
            switch(format) {
                case 'pdf':
                    this.generatePDF(template, `${type}_report_${Date.now()}.pdf`);
                    break;
                case 'excel':
                    this.generateExcel(reportData, `${type}_report_${Date.now()}.xlsx`);
                    break;
                case 'csv':
                    this.generateCSV(reportData, `${type}_report_${Date.now()}.csv`);
                    break;
            }
            
            showNotification('Report generated successfully!', 'success');
        } catch (error) {
            showNotification('Failed to generate report', 'error');
            console.error('Report generation error:', error);
        }
    }

    async gatherReportData(type) {
        // Simulate data gathering
        return {
            user: { name: 'Madhura Sanap', id: 'DFS2025001234' },
            period: 'January 2025 - March 2025',
            transactions: transactionData,
            schemes: [
                { name: 'PM-KISAN', amount: 12000, status: 'Active' },
                { name: 'PMJJBY', amount: 436, status: 'Active' }
            ],
            summary: {
                totalCredits: 15500,
                totalDebits: 8436,
                netBalance: 45678
            }
        };
    }

    getMonthlyReportTemplate(data) {
        return `
            <div class="report-container">
                <h1>Monthly Financial Report</h1>
                <p>Period: ${data.period}</p>
                <h2>Transaction Summary</h2>
                <table>
                    <tr><td>Total Credits:</td><td>₹${data.summary.totalCredits}</td></tr>
                    <tr><td>Total Debits:</td><td>₹${data.summary.totalDebits}</td></tr>
                    <tr><td>Net Balance:</td><td>₹${data.summary.netBalance}</td></tr>
                </table>
            </div>
        `;
    }

    generatePDF(content, filename) {
        // In production, use a library like jsPDF
        alert(`PDF Report Generated: ${filename}\n\nThis would download a PDF file with your report.`);
    }

    generateExcel(data, filename) {
        alert(`Excel Report Generated: ${filename}\n\nThis would download an Excel file with your data.`);
    }

    generateCSV(data, filename) {
        const csv = this.convertToCSV(data.transactions);
        this.downloadFile(csv, filename, 'text/csv');
    }

    convertToCSV(data) {
        if (!data.length) return '';
        
        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') ? 
                    `"${value}"` : value;
            }).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
}

const reportGenerator = new ReportGenerator();

// Add Report Generation UI
function getReportsContent() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Generate Reports</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-semibold mb-4">Financial Reports</h3>
                    <div class="space-y-3">
                        <button onclick="reportGenerator.generateReport('monthly', 'pdf')" 
                                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-left px-4">
                            <i class="fas fa-file-pdf mr-2"></i>Monthly Statement
                        </button>
                        <button onclick="reportGenerator.generateReport('annual', 'pdf')" 
                                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-left px-4">
                            <i class="fas fa-file-pdf mr-2"></i>Annual Report
                        </button>
                        <button onclick="reportGenerator.generateReport('tax', 'pdf')" 
                                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-left px-4">
                            <i class="fas fa-file-pdf mr-2"></i>Tax Certificate
                        </button>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-semibold mb-4">Scheme Reports</h3>
                    <div class="space-y-3">
                        <button onclick="reportGenerator.generateReport('scheme', 'excel')" 
                                class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-left px-4">
                            <i class="fas fa-file-excel mr-2"></i>Scheme Benefits Summary
                        </button>
                        <button onclick="showCustomReportModal()" 
                                class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-left px-4">
                            <i class="fas fa-cog mr-2"></i>Custom Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Multi-language Support Enhancement
const translations = {
    en: {
        dashboard: 'Dashboard',
        welcome: 'Welcome back',
        totalSavings: 'Total Savings',
        activeSchemes: 'Active Schemes',
        recentActivities: 'Recent Activities',
        myAccounts: 'My Accounts',
        mySchemes: 'My Schemes',
        applications: 'Applications',
        transactionHistory: 'Transaction History',
        documents: 'Documents',
        support: 'Support',
        logout: 'Logout'
    },
    hi: {
        dashboard: 'डैशबोर्ड',
        welcome: 'वापसी पर स्वागत है',
        totalSavings: 'कुल बचत',
        activeSchemes: 'सक्रिय योजनाएं',
        recentActivities: 'हाल की गतिविधियां',
        myAccounts: 'मेरे खाते',
        mySchemes: 'मेरी योजनाएं',
        applications: 'आवेदन',
        transactionHistory: 'लेनदेन इतिहास',
        documents: 'दस्तावेज़',
        support: 'सहायता',
        logout: 'लॉग आउट'
    },
    ta: {
        dashboard: 'டாஷ்போர்டு',
        welcome: 'மீண்டும் வருக',
        totalSavings: 'மொத்த சேமிப்பு',
        activeSchemes: 'செயல்பாட்டில் உள்ள திட்டங்கள்',
        recentActivities: 'சமீபத்திய நடவடிக்கைகள்',
        myAccounts: 'எனது கணக்குகள்',
        mySchemes: 'எனது திட்டங்கள்',
        applications: 'விண்ணப்பங்கள்',
        transactionHistory: 'பரிவர்த்தனை வரலாறு',
        documents: 'ஆவணங்கள்',
        support: 'ஆதரவு',
        logout: 'வெளியேறு'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    showNotification(`Language changed to ${lang.toUpperCase()}`, 'success');
}

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Enhanced Mobile App Features
function initializeMobileFeatures() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Running as PWA');
        
        // Add mobile-specific features
        addMobileGestures();
        enablePushNotifications();
    }
}

function addMobileGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right - show sidebar
                document.getElementById('sidebar').classList.remove('hidden');
            } else {
                // Swipe left - hide sidebar
                document.getElementById('sidebar').classList.add('hidden');
            }
        }
    }
}

async function enablePushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            console.log('Push notifications enabled');
            
            // Subscribe to push notifications
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
            });
            
            // Send subscription to server
            console.log('Push subscription:', subscription);
        }
    }
}

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    loadContent('dashboard');
    updateNotifications();
    startDataUpdates();
    addVoiceAssistantButton();
    initializeMobileFeatures();
    applyTranslations();
    
    // Track page views
    analytics.track('page_view', { page: 'dashboard' });
});

// Add custom CSS for new features
const additionalStyles = `
<style>
    /* Report styles */
    .report-container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .report-container h1 {
        color: #1e40af;
        border-bottom: 2px solid #1e40af;
        padding-bottom: 10px;
    }
    
    .report-container table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    
    .report-container td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    
    /* Voice assistant animation */
    @keyframes pulse-red {
        0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
        }
    }
    
    #voiceAssistantBtn.bg-red-600 {
        animation: pulse-red 1.5s infinite;
    }
    
    /* Dark mode styles */
    .dark-mode {
        background-color: #1a202c;
        color: #e2e8f0;
    }
    
    .dark-mode .bg-white {
        background-color: #2d3748;
        color: #e2e8f0;
    }
    
    .dark-mode .text-gray-600 {
        color: #cbd5e0;
    }
    
    .dark-mode .bg-gray-50 {
        background-color: #374151;
    }
    
    .dark-mode .border {
        border-color: #4a5568;
    }
    
    /* Accessibility improvements */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
    
    .focus-visible:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
    
    /* Print optimization */
    @media print {
        .no-print {
            display: none !important;
        }
        
        .print-break {
            page-break-after: always;
        }
        
        body {
            font-size: 12pt;
            line-height: 1.5;
        }
    }
    
    /* Loading skeleton */
    .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
    
    /* Custom scrollbar for dark mode */
    .dark-mode::-webkit-scrollbar-track {
        background: #2d3748;
    }
    
    .dark-mode::-webkit-scrollbar-thumb {
        background: #4a5568;
    }
    
    .dark-mode::-webkit-scrollbar-thumb:hover {
        background: #718096;
    }
</style>
`;

// Add styles to document
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update chart colors for dark mode
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = isDarkMode ? '#e2e8f0' : '#666';
    }
}

// Check and apply saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Advanced Search with Filters
class AdvancedSearch {
    constructor() {
        this.filters = {
            dateRange: { start: null, end: null },
            amountRange: { min: null, max: null },
            type: 'all',
            status: 'all',
            scheme: 'all'
        };
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Advanced Search</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Date Range</label>
                        <input type="date" id="searchStartDate" class="w-full border rounded px-3 py-2 mb-2">
                        <input type="date" id="searchEndDate" class="w-full border rounded px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Amount Range</label>
                        <input type="number" id="searchMinAmount" placeholder="Min" class="w-full border rounded px-3 py-2 mb-2">
                        <input type="number" id="searchMaxAmount" placeholder="Max" class="w-full border rounded px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Transaction Type</label>
                        <select id="searchType" class="w-full border rounded px-3 py-2">
                            <option value="all">All Types</option>
                            <option value="credit">Credits Only</option>
                            <option value="debit">Debits Only</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Scheme</label>
                        <select id="searchScheme" class="w-full border rounded px-3 py-2">
                            <option value="all">All Schemes</option>
                            <option value="pmkisan">PM-KISAN</option>
                            <option value="pmjjby">PMJJBY</option>
                            <option value="apy">APY</option>
                        </select>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-4">
                    <button onclick="advancedSearch.resetFilters()" class="px-6 py-2 border rounded hover:bg-gray-100">
                        Reset
                    </button>
                    <button onclick="advancedSearch.applyFilters()" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Search
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    applyFilters() {
        // Gather filter values
        this.filters.dateRange.start = document.getElementById('searchStartDate').value;
        this.filters.dateRange.end = document.getElementById('searchEndDate').value;
        this.filters.amountRange.min = document.getElementById('searchMinAmount').value;
        this.filters.amountRange.max = document.getElementById('searchMaxAmount').value;
        this.filters.type = document.getElementById('searchType').value;
        this.filters.scheme = document.getElementById('searchScheme').value;
        
        // Apply filters to data
        const filteredData = this.filterData(transactionData);
        
        // Update display
        this.displayResults(filteredData);
        
        // Close modal
        document.querySelector('.fixed.inset-0').remove();
    }

    filterData(data) {
        return data.filter(item => {
            // Date filter
            if (this.filters.dateRange.start && new Date(item.date) < new Date(this.filters.dateRange.start)) return false;
            if (this.filters.dateRange.end && new Date(item.date) > new Date(this.filters.dateRange.end)) return false;
            
            // Amount filter
            if (this.filters.amountRange.min && item.amount < parseFloat(this.filters.amountRange.min)) return false;
            if (this.filters.amountRange.max && item.amount > parseFloat(this.filters.amountRange.max)) return false;
            
            // Type filter
            if (this.filters.type !== 'all' && item.type.toLowerCase() !== this.filters.type) return false;
            
            return true;
        });
    }

    displayResults(data) {
        showNotification(`Found ${data.length} matching results`, 'info');
        // Update the current view with filtered data
        if (document.getElementById('transactionTable')) {
            const table = new DataTable('transactionTable', data, [
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'description', label: 'Description' },
                { key: 'type', label: 'Type' },
                { key: 'amount', label: 'Amount', type: 'currency' },
                { key: 'balance', label: 'Balance', type: 'currency' }
            ]);
            table.render();
        }
    }

    resetFilters() {
        this.filters = {
            dateRange: { start: null, end: null },
            amountRange: { min: null, max: null },
            type: 'all',
            status: 'all',
            scheme: 'all'
        };
        document.getElementById('searchStartDate').value = '';
        document.getElementById('searchEndDate').value = '';
        document.getElementById('searchMinAmount').value = '';
        document.getElementById('searchMaxAmount').value = '';
        document.getElementById('searchType').value = 'all';
        document.getElementById('searchScheme').value = 'all';
    }
}

const advancedSearch = new AdvancedSearch();

// Help Tour Feature
class HelpTour {
    constructor() {
        this.steps = [
            {
                element: '.menu-item[data-page="dashboard"]',
                title: 'Dashboard',
                content: 'View your financial overview and recent activities here',
                position: 'right'
            },
            {
                element: '.bg-gradient-to-r',
                title: 'Welcome Section',
                content: 'Quick overview of your account status',
                position: 'bottom'
            },
            {
                element: '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4',
                title: 'Stats Cards',
                content: 'Click on these cards for detailed information',
                position: 'top'
            }
        ];
        this.currentStep = 0;
    }

    start() {
        this.currentStep = 0;
        this.showStep();
    }

    showStep() {
        if (this.currentStep >= this.steps.length) {
            this.end();
            return;
        }

        const step = this.steps[this.currentStep];
        const element = document.querySelector(step.element);
        
        if (element) {
            // Highlight element
            element.classList.add('tour-highlight');
            
            // Show tooltip
            this.showTooltip(element, step);
        }
    }

    showTooltip(element, step) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <h3 class="font-bold mb-2">${step.title}</h3>
                <p class="text-sm text-gray-600 mb-4">${step.content}</p>
                <div class="flex justify-between">
                    <button onclick="helpTour.skip()" class="text-gray-500 hover:text-gray-700">Skip</button>
                    <div>
                        <span class="text-sm text-gray-500">${this.currentStep + 1}/${this.steps.length}</span>
                        <button onclick="helpTour.next()" class="ml-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                            ${this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
                // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.zIndex = '9999';
        
        switch(step.position) {
            case 'right':
                tooltip.style.left = rect.right + 20 + 'px';
                tooltip.style.top = rect.top + 'px';
                break;
            case 'bottom':
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = rect.bottom + 20 + 'px';
                break;
            case 'top':
                tooltip.style.left = rect.left + 'px';
                tooltip.style.bottom = (window.innerHeight - rect.top + 20) + 'px';
                break;
        }
        
        document.body.appendChild(tooltip);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9998;';
        document.body.appendChild(overlay);
    }

    next() {
        this.cleanup();
        this.currentStep++;
        this.showStep();
    }

    skip() {
        this.cleanup();
        this.end();
    }

    cleanup() {
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        document.querySelectorAll('.tour-tooltip').forEach(el => el.remove());
        document.querySelectorAll('.tour-overlay').forEach(el => el.remove());
    }

    end() {
        this.cleanup();
        showNotification('Tour completed! Need help? Click the help button anytime.', 'success');
        localStorage.setItem('tourCompleted', 'true');
    }
}

const helpTour = new HelpTour();

// Check if first time user
if (!localStorage.getItem('tourCompleted')) {
    setTimeout(() => {
        if (confirm('Would you like a quick tour of the dashboard?')) {
            helpTour.start();
        }
    }, 2000);
}

// Feedback Widget
class FeedbackWidget {
    constructor() {
        this.ratings = {
            ease: 0,
            features: 0,
            performance: 0
        };
    }

    show() {
        const widget = document.createElement('div');
        widget.className = 'fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-6 max-w-sm z-50';
        widget.innerHTML = `
            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">How's your experience?</h3>
                <p class="text-sm text-gray-600">Your feedback helps us improve</p>
            </div>
            
            <div class="space-y-3">
                <div>
                    <label class="text-sm font-medium">Ease of Use</label>
                    <div class="flex space-x-1 mt-1" id="rating-ease">
                        ${[1,2,3,4,5].map(n => `
                            <button onclick="feedbackWidget.rate('ease', ${n})" class="text-2xl text-gray-300 hover:text-yellow-400 focus:text-yellow-400">
                                <i class="fas fa-star"></i>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <label class="text-sm font-medium">Features</label>
                    <div class="flex space-x-1 mt-1" id="rating-features">
                        ${[1,2,3,4,5].map(n => `
                            <button onclick="feedbackWidget.rate('features', ${n})" class="text-2xl text-gray-300 hover:text-yellow-400 focus:text-yellow-400">
                                <i class="fas fa-star"></i>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <label class="text-sm font-medium">Performance</label>
                    <div class="flex space-x-1 mt-1" id="rating-performance">
                        ${[1,2,3,4,5].map(n => `
                            <button onclick="feedbackWidget.rate('performance', ${n})" class="text-2xl text-gray-300 hover:text-yellow-400 focus:text-yellow-400">
                                <i class="fas fa-star"></i>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="mt-4">
                <textarea placeholder="Additional comments (optional)" class="w-full border rounded px-3 py-2 text-sm" rows="3"></textarea>
            </div>
            
            <div class="mt-4 flex justify-between">
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">Cancel</button>
                <button onclick="feedbackWidget.submit()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    rate(category, rating) {
        this.ratings[category] = rating;
        
        // Update visual
        const container = document.getElementById(`rating-${category}`);
        container.querySelectorAll('button').forEach((btn, index) => {
            if (index < rating) {
                btn.querySelector('i').classList.remove('text-gray-300');
                btn.querySelector('i').classList.add('text-yellow-400');
            } else {
                btn.querySelector('i').classList.remove('text-yellow-400');
                btn.querySelector('i').classList.add('text-gray-300');
            }
        });
    }

    submit() {
        const comments = document.querySelector('textarea').value;
        const feedback = {
            ratings: this.ratings,
            comments: comments,
            timestamp: new Date(),
            userAgent: navigator.userAgent
        };
        
        console.log('Feedback submitted:', feedback);
        showNotification('Thank you for your feedback!', 'success');
        
        // Analytics
        analytics.track('feedback_submitted', feedback);
        
        // Close widget
        document.querySelector('.fixed.bottom-20').remove();
        
        // Reset ratings
        this.ratings = { ease: 0, features: 0, performance: 0 };
    }
}

const feedbackWidget = new FeedbackWidget();

// Add floating help button
const helpButton = document.createElement('button');
helpButton.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-40';
helpButton.innerHTML = '<i class="fas fa-question"></i>';
helpButton.onclick = () => {
    const menu = document.createElement('div');
    menu.className = 'fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-4 z-50';
    menu.innerHTML = `
        <div class="space-y-2">
            <button onclick="helpTour.start(); this.closest('.fixed').remove()" class="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                <i class="fas fa-route mr-2"></i>Take a Tour
            </button>
            <button onclick="loadContent('support'); this.closest('.fixed').remove()" class="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                <i class="fas fa-headset mr-2"></i>Contact Support
            </button>
            <button onclick="feedbackWidget.show(); this.closest('.fixed').remove()" class="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                <i class="fas fa-comment mr-2"></i>Give Feedback
            </button>
            <button onclick="window.open('https://dfs.gov.in/help', '_blank'); this.closest('.fixed').remove()" class="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                <i class="fas fa-book mr-2"></i>Help Documentation
            </button>
        </div>
    `;
    
    // Remove existing menu if any
    const existingMenu = document.querySelector('.fixed.bottom-20.right-4');
    if (existingMenu && existingMenu !== menu) {
        existingMenu.remove();
    }
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== helpButton) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
};

document.body.appendChild(helpButton);

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            apiResponseTimes: [],
            renderTimes: []
        };
        this.initializeMonitoring();
    }

    initializeMonitoring() {
        // Page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.metrics.pageLoadTime = loadTime;
            console.log(`Page loaded in ${loadTime}ms`);
        });

        // Monitor API calls
        this.monitorFetch();
    }

    monitorFetch() {
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            const startTime = performance.now();
            
            return originalFetch.apply(this, args).then(response => {
                const endTime = performance.now();
                const duration = endTime - startTime;
                
                this.metrics.apiResponseTimes.push({
                    url: args[0],
                    duration: duration,
                    status: response.status,
                    timestamp: new Date()
                });
                
                if (duration > 1000) {
                    console.warn(`Slow API response: ${args[0]} took ${duration}ms`);
                }
                
                return response;
            });
        };
    }

    trackRender(componentName, renderTime) {
        this.metrics.renderTimes.push({
            component: componentName,
            time: renderTime,
            timestamp: new Date()
        });
    }

    getReport() {
        const avgApiTime = this.metrics.apiResponseTimes.length > 0 
            ? this.metrics.apiResponseTimes.reduce((sum, item) => sum + item.duration, 0) / this.metrics.apiResponseTimes.length 
            : 0;
            
        return {
            pageLoadTime: this.metrics.pageLoadTime,
            avgApiResponseTime: avgApiTime,
            totalApiCalls: this.metrics.apiResponseTimes.length,
            slowApiCalls: this.metrics.apiResponseTimes.filter(item => item.duration > 1000).length
        };
    }
}

const performanceMonitor = new PerformanceMonitor();

// Error Handling and Logging
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Log to analytics
    analytics.track('error_occurred', {
        message: event.error.message,
        stack: event.error.stack,
        url: window.location.href
    });
    
    // Show user-friendly error message
    if (!event.error.message.includes('Script error')) {
        showNotification('Something went wrong. Please try again.', 'error');
    }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    analytics.track('promise_rejection', {
        reason: event.reason,
        promise: event.promise
    });
});

// Final initialization
console.log('Dashboard fully loaded and initialized');
showNotification('Welcome to your Financial Dashboard!', 'info');

// Export for use in other modules
window.dashboardAPI = {
    loadContent,
    showNotification,
    analytics,
    reportGenerator,
    advancedSearch,
    helpTour,
    feedbackWidget,
    performanceMonitor,
    voiceAssistant,
    securityManager
};