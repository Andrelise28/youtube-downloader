const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server Works !!! At port ${PORT}`);
});

app.get('/downloadmp3', async (req, res, next) => {
    try {
        const url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }

        const info = await ytdl.getBasicInfo(url, {
            format: 'mp4'
        });

        const title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        
        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
        }).pipe(res);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/downloadmp4', async (req, res, next) => {
    try {
        const url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }

        const info = await ytdl.getBasicInfo(url, {
            format: 'mp4'
        });

        const title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, {
            format: 'mp4',
        }).pipe(res);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
