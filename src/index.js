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

document.addEventListener('DOMContentLoaded', function (event) {
    // chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
    document.body.style.zoom = 'reset';
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey === true || event.metaKey === true)
            && (event.which === 61 || event.which === 107
                || event.which === 173 || event.which === 109
                || event.which === 187  || event.which === 189))
        {
            event.preventDefault();
        }
    }, false);
    document.addEventListener('mousewheel DOMMouseScroll', function (event) {
        if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
        }
    }, false);
}, false);

const app = dva();

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');