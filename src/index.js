import dva from "dva";
import Router from "./router";
import io from 'socket.io-client';
import FastClick from 'fastclick';

import constant from './util/constant';
import notification from './util/notification';

import "./view/Style.css";
import 'react-html5video/dist/styles.css';
import './css/slick.min.css';
import './css/slick-theme.min.css';
import './view/sound_player/main.css';
import 'highlight.js/styles/github.css';
import 'basscss/css/basscss.css';
FastClick.attach(document.body);

window.socket = io(constant.socket);

window.socket.on('connect', function () {
    window.socket.emit('login', {
        id: constant.id
    }, function (response) {
        if (response.code === 200) {
            notification.on('sendMessage', this, function (data) {
                window.socket.emit('sendMessage', {
                    targetId: data.targetId,
                    action: data.action,
                    content: data.content
                }, function (response) {

                });
            });
            window.socket.on('receiveMessage', function (data) {
                notification.emit(data.data.action, {content: data.data.content});
            });
        }
    });
});

const app = dva();

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');