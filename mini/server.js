const { v4: uuidv4 } = require('uuid');
const redis = require('redis');
const express = require('express');
const path = require('path');
const app = express();


//#region node setting
// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

const urlMap = {};
app.listen(4000, () => {
    console.log('Backend server is running on http://localhost:4000');
});
app.use(express.json())
//#endregion node setting

//#region redis
const client = redis.createClient({
    host: 'localhost',  // Redis 서버 주소. 필요시 변경하세요.
    port: 6379,         // Redis 서버 포트. 기본 포트는 6379입니다.
    database: 3,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // 연결 거부된 경우, 재시도 하지 않도록 null 반환
            return null;
        }
        // 연결 시간 초과의 경우 재시도 하지 않도록 null 반환
        if (options.total_retry_time > 1000 * 60 * 60) {
            return null;
        }
        // 최대 재시도 횟수 초과 시 재시도 하지 않도록 null 반환
        if (options.attempt > 10) {
            return null;
        }
        // 다른 경우에는 재시도 횟수를 고려하여 재시도
        return Math.min(options.attempt * 100, 3000);
    }
});

let isConnected = false;

client.on('connect', () => {
    isConnected = true;
});

client.on('error', (error) => {
    isConnected = false;
});

const redisSet = async (key, value) => {
    if(!isConnected) {
        urlMap[key] = value;
        return;
    }
    return client.set(key, value);
}

const redisGet = async (key) => {
    if(!isConnected) {
        return urlMap[key];
    }
    return client.get(key);
}
//#endregion redis

//#region api
const changeUrl = async (req, res) => {
    const hash = uuidv4().split('-')[0]
    const { url } = req.body;

    if (!url.startsWith("http")) {
        return res.json({ error: '잘못된 주소 형식 입니다. http 또는 https 로 시작하는 주소를 입력해 주세요.' });
    }

    const domain = req.headers.host;

    await redisSet(hash, url);
    res.json({ url: `${domain}/${hash}` })
};

const getUrl = async (req, res) => {
    const hash = req.params.param;
    const url = await redisGet(hash);
    if (!url) {
        return res.json({ error: '저장되지 않은 주소입니다.' })
    }

    res.redirect(url);
};

const ping = async (req, res) => {
    res.send('pong')
};
//#endregion api

//#region server start
const apiRegister = () => {
    app.post("/changeUrl", changeUrl);
    app.get('/ping', ping);
    app.get('/:param', getUrl);

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './build/index.html'));
    });
}

(async () => {
    try {
        apiRegister();
        await client.connect();
    } catch (e) {
        console.error(e);
    }
})();
//#endregion server start