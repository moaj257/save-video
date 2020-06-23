const ytdl = require('ytdl-core');

export default async (req, res) => {
  const {url, vname} = req.query;
  res.header("Content-Disposition", `attachment; filename="${vname}.mp4`);
  await ytdl(url, {format: 'mp4'}).pipe(res);
}
