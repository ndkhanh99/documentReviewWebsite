import { createAsyncThunk } from "@reduxjs/toolkit";
import userServices from '../../services/userServices';

export const userLogin = createAsyncThunk(
    'auth/login',
    async (data,thunkAPI) => {
        const {email,password} = data
        const res = await userServices.login(email,password)
        return res
    }
)