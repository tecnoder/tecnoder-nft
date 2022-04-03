import { combineReducers } from "redux";

import counter from "./slices/counter";
import misc from "./slices/misc";
import dropTypes from "./slices/misc/dropTypes";
import coinList from "./slices/misc/coinList";
import user from "./slices/user";
import loaders from "./slices/loader";
import athletes from "./slices/athletes";
import topDrops from "./slices/topdrops";
import kycStatus from "./slices/kycstatus";
import myCurrencies from "./slices/user/myCurrencies";

const rootReducer = combineReducers({ misc, user, loaders, athletes, topDrops, dropTypes, kycStatus, coinList, myCurrencies });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
