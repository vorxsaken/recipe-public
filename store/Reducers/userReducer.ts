import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk('user/fetchUserInfo', async (userId: string, { getState }) => {
        const response = await fetch(`/api/user/read/${userId}`);
        const result = await response.json();
        return result;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            id: '',
            following: []
        },
        collections: [],
        tempCollection: null,
        recipes: [],
        recipeSkip: 0,
        isUserInfoFetched: false
    },
    reducers: {
        setUser(state, actions) {
            state.userInfo = actions.payload;
        },
        mergeRecipes(state, actions) {
            state.recipes = state.recipes.concat(actions.payload);
            state.recipeSkip += 10;
        },
        setFollowing(state, actions) {
            state.userInfo.following = actions.payload
        },
        setTempCollection(state, actions) {
            state.tempCollection = actions.payload;
        },
        resetTempCollection(state, actions){
            state.tempCollection = null;
        },
        resetCollection(state, actions) {
            state.collections = actions.payload.collections;
        },
        mergeCollections(state, actions) {
            state.collections = state.collections.concat(actions.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserInfo.fulfilled, (state, actions) => {
            state.userInfo = actions.payload;
            state.collections = actions.payload.collections;
            state.isUserInfoFetched = true;
        })
    }
})

export const { resetCollection, mergeRecipes, setUser, setTempCollection, resetTempCollection, mergeCollections, setFollowing } = userSlice.actions;
export default userSlice.reducer
