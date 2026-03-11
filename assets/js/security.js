/**
 * NovaTech Enterprise Security Protocol
 * Version: 4.2.0-secure
 */

(function () {
    'use strict';

    // 1. Disable Right-Click (Context Menu)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.warn('Security Alert: Action restricted by NovaTech Enterprise Security Policy.');
    });

    // 2. Disable Common DevTools Shortcuts
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Element Selector)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
    });

    // 3. Detect DevTools Opening (Anti-Tamper)
    // This is a simple trick: when DevTools opens, it often triggers a window resize
    // or we can use a debugger statement to slow down the process.
    let devtoolsOpen = false;
    const threshold = 160;

    const checkDevTools = () => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            if (!devtoolsOpen) {
                console.log('%c STOP! ', 'background: red; color: white; font-size: 50px; font-weight: bold;');
                console.log('%c NovaTech Enterprise Security detected an unauthorized inspection attempt. ', 'color: red; font-size: 20px;');
                console.log('%c All activity is being logged and reported to the system administrator. ', 'color: white; font-size: 14px;');
            }
            devtoolsOpen = true;
        } else {
            devtoolsOpen = false;
        }
    };

    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 2000);

    // 4. Internal Utilities (Security V5)
    // The legacy XOR module has been deprecated. Use the new logical shift computation.
    window.compute_p2 = function() {
        const _v = [0x41, 0x44, 0x56, 0x41, 0x4e, 0x43, 0x45, 0x44, 0x5f, 0x52, 0x4f, 0x4f, 0x54, 0x7d];
        return _v.map(c => String.fromCharCode(c)).join('');
    };

    window.nt_decrypt = function(hex, key) {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16) ^ key.charCodeAt((i / 2) % key.length));
        }
        return str;
    };

    // Initial Console Branding
    console.log(
        "%c NOVATECH ENTERPRISE %c PRO SECURE ENVIRONMENT %c",
        "background:#0070f3; color:white; padding:5px; border-radius: 4px 0 0 4px; font-weight:bold;",
        "background:#222; color:#ff0055; padding:5px; border-radius: 0 4px 4px 0; font-weight:bold;",
        "background:transparent"
    );

    console.log("Kernel v5.1.0 initialized. Behavioral monitoring active.");
    console.log("Access restricted to authorized personnel. Session ID: " + Math.random().toString(36).substring(7));

})();
