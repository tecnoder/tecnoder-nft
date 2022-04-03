import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postData } from '../../../api/api';
import UserService from '../../../api/service/user/user.api';

import { getSessionUserUrl } from '@sindric-lib-ui/endpoints';


export interface UserData {
    userId?: number;
    firstName: string;
    lastName: string;
    emailId: string;
    access: string;
    isAdmin: string;
    jwtId: string;
    profileName: string;
    gaSecret: string;
    isTwoFactor: string,
    currentPlatform: string;
    currentPlatformId: string;
    registeredPlatformId: string;
    kycCallBackUrl: string;
    kycCheckId: string;
    kycIdCheckId: string;
    kycDocStatus: string;
    kycIdStatus: string;
    profileImageFileUri: string;
    authProvider: string;
    dateOfBirth: string;
    isReadOnly: string;
    lastLoginDate: string;
    hasUserDetail: boolean;
  }

  export type UserState = UserData | null;


  const initialState = null as UserState;


  export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setUser: (state: UserState, action: PayloadAction<UserState>) => {
        return action.payload
      },
      updateUserDetails: (state: UserState, action: PayloadAction<any>) => {
        if(action.payload && action.payload.access==="")
          return Object.assign({}, state, action.payload, {access: state.access});
        else
          return Object.assign({}, state, action.payload);
      },
    },
  })

  const {setUser, updateUserDetails} = userSlice.actions;

  export const setUserSession = (data: any)=>{
    if(!data){
      return setUser(null);
    }
    const userData = {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      access: data.access,
      jwtId: data.jwtId,
      isAdmin: data.isAdmin,
      profileName: data.profileName,
      gaSecret: data.gaSecret,
      isTwoFactor: data.isTwoFactor,
      currentPlatformId: data.currentPlatformId,
      currentPlatform: data.currentPlatform,
      registeredPlatformId: data.registeredPlatformId,
      kycCallBackUrl: data.kycCallBackUrl,
      kycCheckId: data.kycCheckId,
      kycIdCheckId: data.kycIdCheckId,
      kycDocStatus: data.kycDocStatus,
      kycIdStatus: data.kycIdStatus, 
      profileImageFileUri: data.profileImageFileUri,
      authProvider: data.authProvider,
      dateOfBirth: data.dateOfBirth,
      isReadOnly: data.isReadOnly,
      lastLoginDate: data.lastLoginDate,
      hasUserDetail: data.hasUserDetail
    };
    return setUser(userData);
  }

  export const getUserSession = createAsyncThunk(
    'user/getUserSession',
    async (params, ThunkAPI) => {
      const response = await postData(getSessionUserUrl)
      if (response.status === 'SUCCESS') {
        ThunkAPI.dispatch(setUserSession(response.data));
      } else {
        ThunkAPI.dispatch(setUser(null));
      }
      return response.data;
    }
  )

  export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (params, ThunkAPI) => {
      const response = await UserService.getUserDetails()
      if (response.status === 'SUCCESS') {
        ThunkAPI.dispatch(updateUserDetails(Object.assign({hasUserDetail: true},response.data)));
      //} else {
      //  ThunkAPI.dispatch(setUser(null));
      }
      return response.data;
    }
  )

  export default userSlice.reducer
