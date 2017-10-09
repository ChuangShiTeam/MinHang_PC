import React from "react";
import {Router, Route, IndexRedirect} from "dva/router";
import Main from "./view/Main";
import Index0 from "./view/0/Index";
import Index2 from "./view/2/Index";
import Index3 from "./view/3/Index";
import Index4 from "./view/4/Index";
import Index5 from "./view/5/Index";

import constant from "./util/constant";

function RouterConfig({history}) {

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to={'/' + constant.id + '/index'}/>
                <Route component={Main}>
                    <Route path="/0/index" component={Index0}/>
                    <Route path="/2/index" component={Index2}/>
                    <Route path="/3/index" component={Index3}/>
                    <Route path="/4/index" component={Index4}/>
                    <Route path="/5/index" component={Index5}/>
                </Route>
            </Route>
        </Router>
    );
}

export default RouterConfig;
