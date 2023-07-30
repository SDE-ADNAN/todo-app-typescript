import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUrl } from '../context/todoContext';

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
    fetchAllData(state){
      if(state.token != null){
        try {
          if (state.token !== null) {
              fetch(getUrl('/auth/profile'),{
                  method: 'GET',
                  headers: {
                      'Authorization': state.token
                  }
              }).then(
                (res)=>{
                  if(res.ok){
                    return res.json()
                  }
                }
              ).then((jsonData)=>{
                state.allUserData = jsonData.user
              })
          }
      } catch (err) {
          console.error('Error:', err);
      }
      }else{
        throw new Error("Token is not present")
      }
    }
  },
});

export const { setAllUserData,setToken,UserLogout ,fetchAllData} = UserSliceReducer.actions;
export default UserSliceReducer.reducer;
