import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import PublicService from '../../../api/service/public/public.api';


const initialState: any[] = [];

export const dropTypesSlice = createSlice({
    name: 'dropTypes',
    initialState,
    reducers: {
        setDropTypesStore: (state: any[], action: PayloadAction<any[]>) => {
            return action.payload
        },
    },
})

export const { setDropTypesStore } = dropTypesSlice.actions

export default dropTypesSlice.reducer


export const getDropTypes = createAsyncThunk(
  'public/getDropTypes',
  async (params, ThunkAPI) => {
	const data = await PublicService.getDropTypes();

    ThunkAPI.dispatch(setDropTypesStore(data||[]));
  }
)
