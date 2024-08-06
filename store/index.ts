import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './Reducers/recipeReducer'
import userReducer from './Reducers/userReducer'
import commentsReducer from './Reducers/commentsReducer'

export default configureStore({
    reducer: {
        recipe: recipeReducer,
        user: userReducer,
        comment: commentsReducer
    }
})