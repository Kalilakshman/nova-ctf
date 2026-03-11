export default function handler(req, res) {
    const userAgent = req.headers['user-agent'];
    const cookies = req.headers['cookie'] || '';
    
    // Advanced Validation
    if (userAgent !== 'NovaBot/4.0-Enterprise' || !cookies.includes('auth_level=admin')) {
        return res.status(403).json({
            status: "error",
            message: "Unauthorized Agent. Access restricted to internal crawlers.",
            code: 403,
            hint: "Only authorized 'NovaBot' can access this resource."
        });
    }

    const keyHeader = req.headers['x-novatech-key'];
    if (!keyHeader) {
        return res.status(401).json({
            status: "error",
            message: "Encryption Key Required.",
            hint: "The key is encoded in the primary visual stylesheet."
        });
    }

    const flagPart1 = "FLAG{NOVATECH_";
    
    const xorEncrypt = (str, key) => {
        return Array.from(str).map((c, i) => 
            (c.charCodeAt(0) ^ key.charCodeAt(i % key.length)).toString(16).padStart(2, '0')
        ).join('');
    };

    return res.status(200).json({
        status: "active",
        module: "nova_core_v5_pro",
        data_checksum: "md5:5d41402abc4b2a76b9719d911017c592",
        payload: xorEncrypt(flagPart1, keyHeader),
        integrity_check: "PARTIAL_SUCCESS",
        hint: "Payload contains PART 1. PART 2 is computed via logical shift in security.js."
    });
}
