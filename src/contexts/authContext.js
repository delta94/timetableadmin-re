import React,{Component, createContext} from "react"

export const AuthContext = createContext()

class AuthContextProvider extends Component {
    state={
        auth: false
    }

    render(){
        return (
            <AuthContext.Provider value={{...this.state}}>
                {this.props.children}    
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;