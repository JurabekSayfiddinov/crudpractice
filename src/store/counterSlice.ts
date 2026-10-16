import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../components/types";
import axios from "axios";
import { api } from "../utils/api";


export let initialState:InitialState={
    data:[],
    loading:false,
    error:[]
}

export let getUsers=createAsyncThunk('data/dataUsers',async()=>{
    try {
        let {data}=await axios.get(api)
        return data
    } catch (error) {
        console.log(error);
    }
})

export let deleteUser=createAsyncThunk('data/deleteUsers',async(id,{dispatch})=>{
    try {
        await axios.delete(`${api}?id=${id}`)
        dispatch((getUsers()))
    } catch (error) {
        console.log(error);
    }
})

export const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.loading=true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload.data
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    
    }
})

export const {  } = dataSlice.actions
export default dataSlice.reducer


