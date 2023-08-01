import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UISliceReducerState {
  allTodos:any;
  data: string[];
  loading: boolean;
  token:string | null;
  sideBarActiveTab:string;
  theme:{
    dark:boolean
  }
}

const initialState: UISliceReducerState = {
  allTodos:null,
  data: [],
  loading: false,
  token:null,
  sideBarActiveTab:'',
  theme:{
    dark:false
  }
};

const UISliceReducer = createSlice({
  name: 'UI',
  initialState,
  reducers: {
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAllTodos(state,action:PayloadAction<any>){
      state.allTodos = action.payload
    },
    UILogout(state){
      state.allTodos = []
      state.data = []
      state.loading = false
      state.sideBarActiveTab = '';
      state.token = null
    },
    toogleDarkLight(state){
      if(state.theme.dark){
        localStorage.setItem('darkMode','False')
      }else{
        localStorage.setItem('darkMode','True')
      }
      state.theme.dark = !state.theme.dark
    },
    setDarkMode(state,action:PayloadAction<any>){
      state.theme.dark = action.payload
    }
  },
});

export const { setToken, setLoading,setAllTodos ,UILogout,toogleDarkLight,setDarkMode} = UISliceReducer.actions;
export default UISliceReducer.reducer;
