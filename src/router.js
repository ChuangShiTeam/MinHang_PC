import React from "react";
import {Router, Route, IndexRedirect} from "dva/router";
import Main from "./view/Main";
import Index0 from "./view/0/Index";
import Index1 from "./view/1/Index";
import Index2 from "./view/2/Index";

import constant from "./util/constant";

function RouterConfig({history}) {

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to={'/' + constant.id + '/index'}/>
                <Route component={Main}>
                    <Route path="/0/index" component={Index0}/>
                    <Route path="/1/index" component={Index1}/>
                    <Route path="/2/index" component={Index2}/>
                </Route>
            </Route>
        </Router>
    );
}

export default RouterConfig;
