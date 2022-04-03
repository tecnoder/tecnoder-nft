import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserService from '../../../api/service/user/user.api';


  export type MyCurrenciesState = any[];


  const initialState = [] as MyCurrenciesState;


  export const myCurrenciesSlice = createSlice({
    name: 'myCurrencies',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setMyCurrencies: (state: MyCurrenciesState, action: PayloadAction<MyCurrenciesState>) => {
        return action.payload
      },
    },
  })

  export const {setMyCurrencies} = myCurrenciesSlice.actions;

  export const getMyCurrencies = createAsyncThunk(
    'user/getMyCurrencies',
    async (params, ThunkAPI) => {

      UserService.getMyBalance()
      .then(resp=>{

          if (resp && resp.status === "SUCCESS") {
              ThunkAPI.dispatch(setMyCurrencies(resp.data));
          }
          else{
              ThunkAPI.dispatch(setMyCurrencies([]));
          }

      })
    }
  )

  export default myCurrenciesSlice.reducer
