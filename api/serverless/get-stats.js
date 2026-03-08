global.ctfStats = global.ctfStats || {
    participants: {}
};

export default function handler(req, res) {
    // Convert status object to array for the dashboard table
    const participantsList = Object.values(global.ctfStats.participants);

    // Sort so winners are at the top
    participantsList.sort((a, b) => {
        if (a.flagFound && !b.flagFound) return -1;
        if (!a.flagFound && b.flagFound) return 1;
        return 0;
    });

    return res.status(200).json({
        participants: participantsList
    });
}
