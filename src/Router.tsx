import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
const IndexPage = React.lazy(() => import(/* webpackPrefetch: true */"./Pages/Home/index"));




function Routes() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Carregando... // Loading...</div>}>
                <Switch>
                    <Route path="/" component={IndexPage} exact />

                    <Route path="*" component={IndexPage} />

                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default Routes;