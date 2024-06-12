import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataState {
  name: string;
  email: string;
  password: string;
}

const initialState: FormDataState = {
  name: '',
  email: '',
  password: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
