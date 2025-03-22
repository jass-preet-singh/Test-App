import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from './userTypes'

interface UserState {
    users: User[],
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

const famousCompanies = [
    "Google", "Microsoft", "Apple", "Amazon", "Tesla",
    "Facebook", "Netflix", "Adobe", "Intel", "IBM",
    "Salesforce", "Oracle", "Uber", "Airbnb", "Spotify"
];

// Async Thunk to Fetch Users
export const fetchUsers = createAsyncThunk<User[], void>(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();

            // Map API response to extract only required fields
            return data.map((user: any, index: number) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                company: famousCompanies[index % famousCompanies.length], // Assign company from list
            }));
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },

})

export default UserSlice.reducer

