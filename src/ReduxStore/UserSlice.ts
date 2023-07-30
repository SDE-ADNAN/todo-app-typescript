import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UISliceReducerState {
  allUserData:any;
  token:string | null;
}

const initialState: UISliceReducerState = {
    allUserData:null,
    token:null,
};

const UserSliceReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setAllUserData(state, action: PayloadAction<any>) {
      state.allUserData = action.payload;
    },
    setToken(state,action:PayloadAction<string>) {
      state.token = action.payload
      let isTokenPresent = localStorage.getItem('Token');
      if(!isTokenPresent){
        localStorage.setItem('Token',action.payload)
      }else{
        localStorage.removeItem('Token')
        localStorage.setItem('Token',action.payload)
      }
    },
    UserLogout(state){
      state.token = null;
      state.allUserData = [];
    },
    // 
  },
});

export const { setAllUserData,setToken,UserLogout} = UserSliceReducer.actions;
export default UserSliceReducer.reducer;
