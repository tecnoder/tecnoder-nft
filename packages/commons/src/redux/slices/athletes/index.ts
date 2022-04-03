import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import PublicService from '../../../api/service/public/public.api';

export const normalizeAthleteAttribute = (athlete:any)=>{
    athlete.athleteAttributeList.forEach(attr=>{
        athlete[attr.attributeName] = attr.attributeValue;
    });
    return athlete;
}

const initialState: any[] = [];

export const athletesSlice = createSlice({
    name: 'athletes',
    initialState,
    reducers: {
        setAthletesStore: (state: any[], action: PayloadAction<any[]>) => {
            return action.payload
        },
        updateAthlete: (state: any[], action: PayloadAction<any>) => {
            if(!action.payload||!action.payload.athleteId){
                return state;
            }

            let found = false; 
            let list: any[] = state.map(item=>{
                if(item.athleteId===action.payload.athleteId){
                    found = true;
                    return action.payload;
                }
                else{
                    return item;
                }
            });
            if(found===false){
                list.unshift(action.payload);
            }
            return list;
        },
        updateAthleteDropCount:(state: any[], action: PayloadAction<any>)=>{            
            if(!state||state.length===0)
                return state;

            const countData = action.payload||{};
            
            return state.map((item:any)=>{
                item.activeDrop = countData[item.athleteId];
                return item;
            });
        },
        deleteAthlete: (state: any[], action: PayloadAction<any>) => {
            return state.filter(item=>item.athleteId!==action.payload.athleteId);
        }
    },
})

export const { setAthletesStore, updateAthleteDropCount, updateAthlete, deleteAthlete } = athletesSlice.actions

export default athletesSlice.reducer


export const getAllAthletes = createAsyncThunk(
  'athletes/getAllAthletes',
  async (params, ThunkAPI) => {
	Promise.all([
        PublicService.getAllAthletesDetails(),
        PublicService.getAthletesDropCount(),
    ])
    .then(resp=>{
        let data = resp[0]||[], countData = resp[1]||{};
        data = (data||[]).map((item:any)=>{
            item.activeDrop = countData[item.athleteId];
            return normalizeAthleteAttribute(item)
        });
        ThunkAPI.dispatch(setAthletesStore(data));        
    })
  }
)

export const updateAtheleteDrops = createAsyncThunk(
  'athletes/updateAtheleteDrops',
  async (params, ThunkAPI) => {
    PublicService.getAthletesDropCount()
    .then(resp=>{
        ThunkAPI.dispatch(updateAthleteDropCount(resp));
    })
  }
)

export const updateAthleteById = createAsyncThunk(
  'athletes/updateAthleteById',
  async (athleteId:any, ThunkAPI) => {
    let data = await PublicService.getAthleteById(athleteId);

    if(data){
        data = normalizeAthleteAttribute(data);
        ThunkAPI.dispatch(athletesSlice.actions.updateAthlete(data));
    }
    else{
        ThunkAPI.dispatch(athletesSlice.actions.deleteAthlete(athleteId));
    }
  }
)

export const deleteAthleteById = createAsyncThunk(
  'athletes/deleteAthleteById',
  async (athleteId, ThunkAPI) => {
    ThunkAPI.dispatch(athletesSlice.actions.deleteAthlete(athleteId));
  }
)
