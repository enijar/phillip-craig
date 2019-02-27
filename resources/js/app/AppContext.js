import React, {createContext} from "react";

export const Context = createContext({});

export default Component => props => (
    <Context.Consumer>
        {context => <Component {...props} context={context}/>}
    </Context.Consumer>
);
