// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ytdl = require('ytdl-core');

export default async (req, res) => {
  const {url} = req.query;
  await ytdl(url).on('info', info => res.json({ info }));
}
