    const debugHeader = req.headers['x-novatech-debug'];
    const keyHeader = req.headers['x-novatech-key'];

    if (debugHeader !== 'true' || !keyHeader) {
        return res.status(403).json({
            status: "error",
            message: "Permission Denied. Required headers missing.",
            code: 403
        });
    }

    const flag = "FLAG{NOVATECH_ROOT_ACCESS}";
    const key = keyHeader;
    
    // XOR Encryption
    const xorEncrypt = (str, key) => {
        return Array.from(str).map((c, i) => 
            (c.charCodeAt(0) ^ key.charCodeAt(i % key.length)).toString(16).padStart(2, '0')
        ).join('');
    };

    const obfuscatedFlag = xorEncrypt(flag, key);

    return res.status(200).json({
        status: "active",
        module: "nova_core_v4",
        auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzeXN0ZW0iOiJub3ZhdGVjaCJ9.Signature",
        server_time: new Date().toISOString(),
        debug: "VERBOSE_ENABLED",
        payload: obfuscatedFlag,
        hint: "Data is XOR encoded. The key is hidden in the internal security module."
    });
