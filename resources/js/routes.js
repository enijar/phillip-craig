import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import Loading from "./Components/Loading";

const SubscriptionScreen = lazy(() => import('./Screens/SubscriptionScreen'));
const NotFoundScreen = lazy(() => import('./Screens/NotFoundScreen'));

const Screen = Component => props => <Component {...props}/>;

export default () => (
    <Suspense fallback={<Loading/>}>
        <Switch>
            <Route exact path="/" component={Screen(SubscriptionScreen)}/>
            <Route component={Screen(NotFoundScreen)}/>
        </Switch>
    </Suspense>
);
