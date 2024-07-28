import { createContext,useContext,useReducer } from "react";
import { RecoilRoot } from "recoil";

export const DataLayerContext = createContext();

export const DataLayer =({
    initialState,reducer,children
}) => (
    <DataLayerContext.Provider value={useReducer(reducer,initialState)}>
        <RecoilRoot>
        {children}
        </RecoilRoot>
    </DataLayerContext.Provider>
)

export const useDataLayerValue = () => useContext(DataLayerContext);