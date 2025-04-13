import { configureStore } from "@reduxjs/toolkit"
import userreducer from "../reducers/usersidereducer"
import adminreducer from "../reducers/adminsidereducer"
export const store=configureStore({
    reducer:{

        user:userreducer,
        admin:adminreducer,

    }
})


export type RootState= ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch