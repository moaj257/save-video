const ytdl = require('ytdl-core');

export default async (req, res) => {
    const {url} = req.query;
    await ytdl(url).on('info', info => res.status(200).json({ info }));
}