import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import { useContext,useReducer } from "react";
export const ChatContext = createContext();

export const ChatContextProvider = ({children}) =>{
    
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE={
        chatId:"null",
        user:{},
        showInput: false, 

    };

    const chatReducer = (state,action)=>{
        switch(action.type){
             case "CHANGE_USER":
                return{
                    ...state,
                    user:action.payload,
                    chatId: currentUser && currentUser.uid > action.payload.uid ?
                    currentUser.uid + action.payload.uid :
                    action.payload.uid + currentUser.uid,
                };
                case 'TOGGLE_INPUT':
                return {
                    ...state,
                 showInput: action.payload,
      };
             default:
                return state;
        }
    };
    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    return(
        <ChatContext.Provider value={{data : state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};