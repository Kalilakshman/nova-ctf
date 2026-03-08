// In-memory store for session (Vercel functions may reset this on cold start)
// For a production-ready scoreboard, connect Vercel KV.
global.ctfStats = global.ctfStats || {
    participants: {}
};

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const { path } = req.body;

    if (!global.ctfStats.participants[ip]) {
        global.ctfStats.participants[ip] = {
            ip: ip,
            pagesVisited: [],
            attempts: 0,
            flagFound: false,
            solveTime: null,
            startTime: new Date()
        };
    }

    const participant = global.ctfStats.participants[ip];
    if (!participant.pagesVisited.includes(path)) {
        participant.pagesVisited.push(path);
    }

    return res.status(200).json({ success: true });
}
