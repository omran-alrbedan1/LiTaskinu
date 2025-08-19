import { createSlice,PayloadAction } from "@reduxjs/toolkit";

declare type InitialState= {
    value:AuthState;
}

declare type AuthState = {
    isAuth:boolean;
    isModerator:boolean;
    username:string;
    id:string;
}

const initialState ={
    value:{
        isAuth:false,
        isModerator:false,
        username:'',
        id:'',
    }as AuthState,
}as InitialState


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOut :()=>{
            return initialState;
        },
        logIn :(state , action:PayloadAction<string>)=>{
            return{
                value:{
                    username:action.payload,
                    id:'12345',
                    isAuth:true,
                    isModerator:false,
                }
            }
        },
        toggleModerator:(state)=>{
            state.value.isModerator=!state.value.isModerator;
        }
}})

export const {logIn,logOut,toggleModerator}=authSlice.actions;
export default authSlice.reducer;