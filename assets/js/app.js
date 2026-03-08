// NovaTech Security Module Loaded
console.log("NovaTech Security Module Loaded");

// Developer Note
// authentication service relocated
// path: /internal-auth

/**
 * Activity Tracker
 * Logs page visits for security audits
 */
async function logActivity() {
    const path = window.location.pathname;
    try {
        await fetch('/api/log-scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: path,
                timestamp: new Date().toISOString()
            })
        });
    } catch (err) {
        // Silent fail for logs
    }
}

// Initialize activity tracking
document.addEventListener('DOMContentLoaded', () => {
    logActivity();
});
