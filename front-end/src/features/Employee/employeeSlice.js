import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeeInfo,
  getAllEmployee,
  updatePassword,
  logot,
  resetPasswordLink,
  setNewPassword,
  deleteEmployee,
} from "./employeeAPI";

const initialState = {
  status: "idle",
  employees: null,
  error: null,
  isLoading: false,
  allemployee: [],
  passwordUpdateMessage: null,
  isLogout: false,
  resetPasswordLinkStatus: null,
  resetPasswordStatus: null,
  deleteEmployee: null,
};

export const getEmployeeInfoAsync = createAsyncThunk(
  "employee/getEmployeeInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeeInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllEmployeeAsync = createAsyncThunk(
  "employee/getAllEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllEmployee();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePasswordAsync = createAsyncThunk(
  "employee/updatePassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await updatePassword(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordLinkAsync = createAsyncThunk(
  "employee/resetPasswordLink",
  async (values, { rejectWithValue }) => {
    try {
      const response = await resetPasswordLink(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setNewPasswordAsync = createAsyncThunk(
  "employee/setNewPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await setNewPassword(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logotAsync = createAsyncThunk(
  "employee/logot",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logot();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteEmployee(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.error = null;
      state.passwordUpdateMessage = null;
      state.isLogout = null;
      state.deleteEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeInfoAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getEmployeeInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.employees = action.payload;
        state.isLoading = false;
      })
      .addCase(getEmployeeInfoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllEmployeeAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getAllEmployeeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allemployee = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllEmployeeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordUpdateMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logotAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(logotAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLogout = action.payload;
        state.isLoading = false;
      })
      .addCase(logotAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPasswordLinkAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(resetPasswordLinkAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPasswordLinkStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPasswordLinkAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(setNewPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(setNewPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPasswordStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(setNewPasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.allemployee.employee.findIndex(
          (item) => item._id === action.payload.id
        );

        state.allemployee.employee.splice(index, 1);

        state.deleteEmployee = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { resetMessages } = employeeSlice.actions;

export const selectEmployees = (state) => state.employee.employees;
export const selectEmployeeStatus = (state) => state.employee.status;
export const selectEmployeeError = (state) => state.employee.error;
export const selectEmployeeIsLoading = (state) => state.employee.isLoading;
export const selectAllEmployee = (state) => state.employee.allemployee;
export const selectPasswordUpdate = (state) =>
  state.employee.passwordUpdateMessage;
export const selectLogout = (state) => state.employee.isLogout;
export const selectResetPasswordLink = (state) =>
  state.employee.resetPasswordLinkStatus;
export const selectResetPasswordStatus = (state) =>
  state.employee.resetPasswordStatus;
export const selectDeleteEmployee = (state) => state.employee.deleteEmployee;

export default employeeSlice.reducer;
