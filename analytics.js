// Analytics Module for DFS Website
class DFSAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.pageLoadTime = performance.now();
        this.events = [];
        this.init();
    }

    init() {
        // Track page view
        this.trackPageView();

        // Track page performance
        this.trackPagePerformance();

        // Track user interactions
        this.trackInteractions();

        // Track errors
        this.trackErrors();

        // Send analytics data periodically
        this.startDataSync();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserId() {
        let userId = DFSUtils.storage.get('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            DFSUtils.storage.set('analytics_user_id', userId, 365 * 24 * 60); // 1 year
        }
        return userId;
    }

    trackPageView() {
        const pageData = {
            type: 'pageview',
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            device: DFSUtils.getDeviceType(),
            browser: DFSUtils.getBrowserInfo(),
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language
        };

        this.sendEvent(pageData);
    }

    trackPagePerformance() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            const performanceData = {
                type: 'performance',
                page: window.location.pathname,
                metrics: {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
                    totalTime: performance.now()
                },
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            this.sendEvent(performanceData);
        });
    }

    trackInteractions() {
        // Track clicks
        document.addEventListener('click', (e) => {
            const target = e.target;
            const clickData = {
                type: 'click',
                element: target.tagName,
                id: target.id,
                className: target.className,
                text: target.textContent?.substring(0, 50),
                href: target.href,
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            // Special tracking for important elements
            if (target.matches('a[href*="schemes"]')) {
                clickData.category = 'scheme_link';
            } else if (target.matches('button[type="submit"]')) {
                clickData.category = 'form_submit';
            } else if (target.matches('.download-link')) {
                clickData.category = 'download';
            }

            this.sendEvent(clickData);
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            const formData = {
                type: 'form_submit',
                formId: form.id,
                formName: form.name,
                action: form.action,
                method: form.method,
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            this.sendEvent(formData);
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        let scrollTimer;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
                
                if (scrollDepth > maxScrollDepth) {
                    maxScrollDepth = scrollDepth;
                    
                    if (scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                        const scrollData = {
                            type: 'scroll',
                            depth: scrollDepth,
                            page: window.location.pathname,
                            timestamp: new Date().toISOString(),
                            sessionId: this.sessionId
                        };
                        
                        this.sendEvent(scrollData);
                    }
                }
            }, 100);
        });

        // Track time on page
        let timeOnPage = 0;
        let isActive = true;

        setInterval(() => {
            if (isActive) {
                timeOnPage += 1;
                
                // Send time tracking every 30 seconds
                if (timeOnPage % 30 === 0) {
                    const timeData = {
                        type: 'time_on_page',
                        duration: timeOnPage,
                        page: window.location.pathname,
                        timestamp: new Date().toISOString(),
                        sessionId: this.sessionId
                    };
                    
                    this.sendEvent(timeData);
                }
            }
        }, 1000);

        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            isActive = !document.hidden;
        });
    }

    trackErrors() {
        window.addEventListener('error', (e) => {
            const errorData = {
                type: 'error',
                message: e.message,
                source: e.filename,
                line: e.lineno,
                column: e.colno,
                stack: e.error?.stack,
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId,
                userAgent: navigator.userAgent
            };

            this.sendEvent(errorData);
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            const errorData = {
                type: 'unhandled_rejection',
                reason: e.reason?.toString(),
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            this.sendEvent(errorData);
        });
    }

    // Custom event tracking
    track(eventName, data = {}) {
        const eventData = {
            type: 'custom',
            name: eventName,
            data: data,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId
        };

        this.sendEvent(eventData);
    }

    // Track conversions
    trackConversion(conversionType, value = null) {
        const conversionData = {
            type: 'conversion',
            conversionType: conversionType,
            value: value,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId
        };

        this.sendEvent(conversionData);
    }

    // Send event to analytics server
    sendEvent(eventData) {
        // Add to local queue
        this.events.push(eventData);

        // Send immediately for critical events
        if (['error', 'conversion', 'form_submit'].includes(eventData.type)) {
            this.syncData();
        }
    }

    // Batch send analytics data
    async syncData() {
        if (this.events.length === 0) return;

        const eventsToSend = [...this.events];
        this.events = [];

        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    events: eventsToSend,
                    sessionId: this.sessionId,
                    userId: this.userId
                })
            });
        } catch (error) {
            // If sending fails, add events back to queue
            this.events = [...eventsToSend, ...this.events];
            console.error('Analytics sync failed:', error);
        }
    }

    // Start periodic data sync
    startDataSync() {
        // Send data every 10 seconds
        setInterval(() => {
            this.syncData();
        }, 10000);

        // Send data before page unload
        window.addEventListener('beforeunload', () => {
            this.syncData();
        });
    }

    // Get analytics summary
    getSummary() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            eventsCount: this.events.length,
            sessionDuration: Math.round((performance.now() - this.pageLoadTime) / 1000)
        };
    }
}

// Initialize analytics
const dfsAnalytics = new DFSAnalytics();

// Export for use in other modules
window.dfsAnalytics = dfsAnalytics;

