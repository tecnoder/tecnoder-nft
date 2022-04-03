import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import UserService from '../../../api/service/user/user.api';


export interface KycStatus {
  isKycNeeded: boolean,
  status: string
}

export type KycState = KycStatus | null;

const initialState = {isKycNeeded: true, status: 'LOADING'} as KycState;

export const kycStatusSlice = createSlice({
  name: 'kycStatus',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setKycStatus: (state: KycState, action: PayloadAction<KycState>) => {
      return action.payload
    },
  },
})

export const {setKycStatus} = kycStatusSlice.actions

export default kycStatusSlice.reducer

export const verifyKycStatus = createAsyncThunk(
  'user/verifyKycStatus',
  async (params, ThunkAPI) => {
    const resp = await UserService.checkKycNeeded();
    ThunkAPI.dispatch(setKycStatus({status: resp? resp.status : "FAILED", isKycNeeded:resp && resp.data===true}));
  }
)
