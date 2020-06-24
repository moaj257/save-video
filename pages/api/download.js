const ytdl = require('ytdl-core');

export default async (req, res) => {
  const {url, vname, itag, format} = req.query;
  res.setHeader("Content-Disposition", `attachment; filename="${vname}.${format}`);
  await ytdl(url, {itag, format}).pipe(res);
}
