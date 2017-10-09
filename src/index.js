import dva from "dva";
import Router from "./router"
import "./view/Style.css";
import "video-react/dist/video-react.css";

const app = dva();

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');