import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  _id: string;
  title: string;
  user: string;
  description: string;
  todo: Todo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  userName: string;
  password: string;
  email: string;
  picUrl: string;
  todos: Todo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface ApiResponse {
//   user: User;
// }

interface UISliceReducerState {
  allUserData:Partial<User>;
  token:string | null;
}

const initialState: UISliceReducerState = {
    allUserData:{},
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
      state.allUserData ={};
    },
    // 
  },
});

export const { setAllUserData,setToken,UserLogout} = UserSliceReducer.actions;
export default UserSliceReducer.reducer;
