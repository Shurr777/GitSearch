import {configureStore} from "@reduxjs/toolkit";
import {gitHubApi} from "./githib/github.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import {githubReducer} from "./githib/github.slice";


export const store = configureStore({
    reducer: {
        [gitHubApi.reducerPath]: gitHubApi.reducer,
        github: githubReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gitHubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>