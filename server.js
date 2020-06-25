const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  server.get('/api/info', async (req, res) => {
    const {url} = req.query;
    let info = await ytdl(url).on('info', info => res.json({ info }));
    return {info};
  });

  server.get('/api/download', async (req, res) => {
    const {url, vname, itag, format} = req.query;
    res.setHeader("Content-Disposition", `attachment; filename="${vname}.${format}`);
    return await ytdl(url, {itag, format}).pipe(res);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
})