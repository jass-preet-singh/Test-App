import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TabType = "CAROUSEL" | "USERS";

interface TabState {
    activeTab: TabType
}
const initialState: TabState = {
    activeTab: "USERS"
}
const TabsSlice = createSlice({
    name: "tabs",
    initialState: initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<TabType>) => {
            state.activeTab = action.payload
        }
    }

})

export const { setActiveTab } = TabsSlice.actions
export default TabsSlice.reducer
