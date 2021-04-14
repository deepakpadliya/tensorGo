import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:4444';

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('/users');
});

export const getUser = createAsyncThunk('/user/getUser', (id) => {
    return axios.get(`/user/${id}`);
});

export const deleteUser = createAsyncThunk('/user/deleteUser',(id)=>{
    return axios.delete(`/user/${id}`);
})

export const addUser = createAsyncThunk('/user',(payload)=>{
    return axios.post('/user',payload);
});

export const updateUser = createAsyncThunk('/user',(payload)=>{
    let id = payload._id;
    return axios.put(`/user/${id}`,payload);
});

export const user = createSlice({
    name: 'user',
    initialState: {
        list: [],
        status: 'idle',
        user:null
    },
    reducers: {
        changeStatus:(state,action)=>{
            state.status=action.payload;
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'pending';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'success';
            state.list = action.payload.data;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed';
        },
        [getUser.pending]:(state,action)=>{
            
        },
        [getUser.fulfilled]:(state,action)=>{
            state.user = action.payload.data;
        },
        [getUser.rejected]:(state,action)=>{

        },
        [deleteUser.pending]:(state,action)=>{

        },
        [deleteUser.fulfilled]:(state,actin)=>{

        },
        [deleteUser.rejected]:(state,action)=>{
            
        }
    }
});
export const getUserState = (state,action) =>{
    return state.user;
}

export const { changeStatus } = user.actions;

export default user.reducer;