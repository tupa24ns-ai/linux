const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1561358631721500734/omFj5gzTMA_5kkMjlw_gzPJhIrt1lW2eX8167MwE3UCYsMJ-Qp9ZJJikM8q95DcmTGiZ';

let topBannerMessage = "Chào mừng bạn đến với trang giới thiệu cá nhân của Phạm Anh Tú - 24NS067!";

app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, msg: 'Nội dung trống!' });

    try {
        await axios.post(DISCORD_WEBHOOK_URL, { content: `📩 **[Khách gửi lời nhắn từ Web]**: ${message}` });
        res.json({ success: true, msg: 'Đã gửi thành công đến điện thoại Phạm Anh Tú!' });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Lỗi gửi thông báo!' });
    }
});

app.get('/api/get-banner', (req, res) => res.json({ banner: topBannerMessage }));

app.get('/api/update-banner', (req, res) => {
    const { secret, msg } = req.query;
    if (secret !== 'admin123') return res.status(403).send('Không có quyền!');
    if (msg) topBannerMessage = msg;
    res.send(`Cập nhật Top Banner thành công: "${topBannerMessage}"`);
});

app.listen(3000, () => console.log('Server Phạm Anh Tú đang chạy cổng 3000'));
