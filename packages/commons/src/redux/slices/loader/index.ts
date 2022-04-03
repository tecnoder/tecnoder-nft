import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type NotificationState = any | null;

const initialState = [] as NotificationState;

export const notificationDataSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader: (state: NotificationState, action: PayloadAction<NotificationState>) => {
            return [
                ...current(state),
                action.payload
            ]
        },
        removeLoader: (state: NotificationState, action: PayloadAction<NotificationState>) => {
            return current(state).filter((x: any) => x !== action.payload)
        },
    },
})
export const { setLoader, removeLoader } = notificationDataSlice.actions

export default notificationDataSlice.reducer