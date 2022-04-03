import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import moment from 'moment';
import PublicService from '../../../api/service/public/public.api';

const initialState: any[] = [];

export const filterAndSortTopPacksDrops = (topDrops:any[])=>{
    const now = moment.utc();
    topDrops = topDrops.filter(dp=> moment.utc(dp.auctionEndTime, 'YYYY-MM-DD HH:mm:ss').isAfter(now));
    return topDrops.sort((a, b) => moment.utc(a.auctionStartTime, 'YYYY-MM-DD HH:mm:ss').valueOf() - moment.utc(b.auctionStartTime, 'YYYY-MM-DD HH:mm:ss').valueOf());
}

export const topDropsSlice = createSlice({
    name: 'topDrops',
    initialState,
    reducers: {
        setTopPacksDropsStore: (state: any[], action: PayloadAction<any[]>) => {
            return filterAndSortTopPacksDrops(action.payload)
        },
        updateTopPackOrDrop: (state: any[], action: PayloadAction<any>) => {
            if(!action.payload||!action.payload.dropId||!action.payload.packId){
                return state;
            }

            let found = false;
            let list: any[] = state.map(item=>{
                if(action.payload.isPack === 'N' && item.dropId===action.payload.dropId){
                    found = true;
                    return action.payload;
                }
                else if(action.payload.isPack === 'Y' && item.packId===action.payload.packId){
                    found = true;
                    return action.payload;
                }
                else{
                    return item;
                }
            });
            if(found===false){
                list.push(action.payload);
            }
            return filterAndSortTopPacksDrops(found? list : (list.unshift(action.payload) && list))
        },
        deleteTopPackOrDrop: (state: any[], action: PayloadAction<any>) => {
            if(action.payload.isPack==='Y'){
                return state.filter(item=>item.packId!==action.payload.packId);
            }
            else{
                return state.filter(item=>item.dropId!==action.payload.dropId);
            }
        }        
    },
})

export const { setTopPacksDropsStore, updateTopPackOrDrop } = topDropsSlice.actions

export default topDropsSlice.reducer

export const getAllTopDrops = createAsyncThunk(
  'topDrops/getAllTopDrops',
  async (params, ThunkAPI) => {
	const response = await PublicService.getPacksAndDropsForSale(1, 20, 'DATE', 'DESC');
	if (response && response.status === "SUCCESS") {
	  ThunkAPI.dispatch(setTopPacksDropsStore(response.data||[]))
    } else {
      console.log(response.errorDesc);
    }
  }
)

export const updatePackOrDropById = createAsyncThunk(
  'athletes/updatePackOrDropById',
  async (params:any, ThunkAPI) => {
    let data: any = null;
    
    if(params.isPack==='Y')
        data = await PublicService.getDropsByPackId(params.packId);
    else
        data = await PublicService.getDropByDropId(params.dropId);

    if(data){
        ThunkAPI.dispatch(topDropsSlice.actions.updateTopPackOrDrop(data));
    }
    else{
        ThunkAPI.dispatch(topDropsSlice.actions.deleteTopPackOrDrop(params));
    }
  }
)

export const deleteTopPackOrDropById = createAsyncThunk(
  'athletes/deleteTopPackOrDropById',
  async (params, ThunkAPI) => {
    ThunkAPI.dispatch(topDropsSlice.actions.deleteTopPackOrDrop(params));
  }
)

