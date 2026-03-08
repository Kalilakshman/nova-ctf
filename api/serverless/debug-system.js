export default function handler(req, res) {
    const debugHeader = req.headers['x-novatech-debug'];

    if (debugHeader !== 'true') {
        return res.status(403).json({
            status: "error",
            message: "Permission Denied. X-NovaTech-Debug header required.",
            code: 403
        });
    }

    return res.status(200).json({
        status: "active",
        module: "nova_core_v4",
        auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzeXN0ZW0iOiJub3ZhdGVjaCJ9.Signature",
        server_time: new Date().toISOString(),
        debug: "VERBOSE_ENABLED",
        hint: "Internal debug endpoint active at /api/system/debug"
    });
}
