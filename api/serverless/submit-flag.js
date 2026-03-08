global.ctfStats = global.ctfStats || {
    participants: {}
};

const CORRECT_FLAG = "FLAG{NOVATECH_ROOT_ACCESS}";

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const { flag } = req.body;

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
    participant.attempts += 1;

    if (flag === CORRECT_FLAG) {
        if (!participant.flagFound) {
            participant.flagFound = true;
            const diff = new Date() - new Date(participant.startTime);
            const mins = Math.floor(diff / 60000);
            const secs = ((diff % 60000) / 1000).toFixed(0);
            participant.solveTime = `${mins}m ${secs}s`;
        }
        return res.status(200).json({
            success: true,
            message: "Correct Flag – Root Access Granted"
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "Incorrect Flag – Try Again"
        });
    }
}
