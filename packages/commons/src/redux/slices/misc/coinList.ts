import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import PublicService from '../../../api/service/public/public.api';


  export type CoinListState = any | null;


  const initialState = null as CoinListState;


  export const coinListSlice = createSlice({
    name: 'coinList',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setCoinList: (state: CoinListState, action: PayloadAction<CoinListState>) => {
        return action.payload
      },
    },
  })

  const {setCoinList} = coinListSlice.actions;

  export const getCoinList = createAsyncThunk(
    'user/getCoinList',
    async (params, ThunkAPI) => {

      const response = await PublicService.getCoinList();
      if ((response && response.status === "SUCCESS")) {
          ThunkAPI.dispatch(setCoinList(response.data));
      } else {
          ThunkAPI.dispatch(setCoinList({}));
      }

    }
  )

  export default coinListSlice.reducer
