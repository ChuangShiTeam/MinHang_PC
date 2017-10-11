import dva from "dva";
import Router from "./router"
import io from 'socket.io-client';

import constant from './util/constant';
import notification from './util/notification';

import "./view/Style.css";
import 'react-html5video/dist/styles.css';

window.socket = io(constant.socket);

window.socket.on('connect', function () {
    window.socket.emit('login', {
        id: constant.id
    }, function (response) {
        if (response.code === 200) {
            window.socket.on('receiveMessage', function (data) {
                console.log(data);
                notification.emit('event', {});
            });
        }
    });
});

const app = dva();

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');