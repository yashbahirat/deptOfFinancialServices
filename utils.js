// Utility Functions Module
const DFSUtils = {
    // Format currency
    formatCurrency: (amount, currency = 'INR') => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Format number with Indian numbering system
    formatNumber: (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    },

    // Format date
    formatDate: (date, format = 'DD/MM/YYYY') => {
        const d = new Date(date);
        const formats = {
            'DD/MM/YYYY': `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`,
            'DD MMM YYYY': `${d.getDate()} ${d.toLocaleDateString('en-IN', { month: 'short' })} ${d.getFullYear()}`,
            'DD MMMM YYYY': `${d.getDate()} ${d.toLocaleDateString('en-IN', { month: 'long' })} ${d.getFullYear()}`
        };
        return formats[format] || d.toLocaleDateString('en-IN');
    },

    // Validate Aadhaar number
    validateAadhaar: (aadhaar) => {
        const regex = /^[2-9]{1}[0-9]{11}$/;
        return regex.test(aadhaar);
    },

    // Validate PAN
    validatePAN: (pan) => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return regex.test(pan);
    },

    // Validate mobile number
    validateMobile: (mobile) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(mobile);
    },

    // Validate email
    validateEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Local storage wrapper with expiry
    storage: {
        set: (key, value, expiryMinutes = null) => {
            const item = {
                value: value,
                timestamp: new Date().getTime()
            };
            if (expiryMinutes) {
                item.expiry = item.timestamp + (expiryMinutes * 60 * 1000);
            }
            localStorage.setItem(key, JSON.stringify(item));
        },

        get: (key) => {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;

            try {
                const item = JSON.parse(itemStr);
                const now = new Date().getTime();

                if (item.expiry && now > item.expiry) {
                    localStorage.removeItem(key);
                    return null;
                }
                return item.value;
            } catch (e) {
                return null;
            }
        },

        remove: (key) => {
            localStorage.removeItem(key);
        },

        clear: () => {
            localStorage.clear();
        }
    },

    // Session storage wrapper
    session: {
        set: (key, value) => {
            sessionStorage.setItem(key, JSON.stringify(value));
        },

        get: (key) => {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },

        remove: (key) => {
            sessionStorage.removeItem(key);
        },

        clear: () => {
            sessionStorage.clear();
        }
    },

    // Cookie management
    cookie: {
        set: (name, value, days = 7) => {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        },

        get: (name) => {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        delete: (name) => {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        }
    },

    // Generate unique ID
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    smoothScroll: (elementId, offset = 0) => {
        const element = document.getElementById(elementId);
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    },

    // Parse query parameters
    parseQueryParams: () => {
        const params = {};
        const queryString = window.location.search.substring(1);
        const queries = queryString.split('&');
        
        queries.forEach(query => {
            const [key, value] = query.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        
        return params;
    },

    // Build query string
    buildQueryString: (params) => {
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    },

    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    // Download file
    downloadFile: (url, filename) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || url.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    // Convert file to base64
    fileToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    // Validate file size
    validateFileSize: (file, maxSizeMB) => {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    },

    // Validate file type
    validateFileType: (file, allowedTypes) => {
        return allowedTypes.includes(file.type);
    },

    // Format file size
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Browser detection
    getBrowserInfo: () => {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        if (ua.indexOf('Firefox') > -1) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/([0-9.]+)/)[1];
        } else if (ua.indexOf('Chrome') > -1) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/([0-9.]+)/)[1];
        } else if (ua.indexOf('Safari') > -1) {
            browser = 'Safari';
            version = ua.match(/Version\/([0-9.]+)/)[1];
        } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
            browser = 'Internet Explorer';
            version = ua.match(/(?:MSIE |rv:)([0-9.]+)/)[1];
        }

        return { browser, version };
    },

    // Device detection
    getDeviceType: () => {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) {
            return 'tablet';
        }
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }
};

// Export utilities
window.DFSUtils = DFSUtils;

