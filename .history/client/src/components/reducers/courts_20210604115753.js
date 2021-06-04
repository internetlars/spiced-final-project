import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    error: "",
    list: {
        page: 0,
        total: 0,
        data: [],
    },
};

export const courtsList = createAsyncThunk("courts/list", async (params) => {
    const response = await courtservices.courtsList(params);
    return response;
});

const courtsSlice = createSlice({
    name: "courts",
    initialState,
    reducers: {
        addCourt(state, action) {
            state.list.data.unshift(action.payload);
        },
        updateDigitalPen(state, action) {
            state.list.data = state.list.data.map((current) =>
                current.id === action.payload.id ? action.payload : current
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(courtsList.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(courtsList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.list = action.payload;
        });
        builder.addCase(courtsList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An unexpected error ocurred";
        });
    },
});

export const { addCourt, updateDigitalPen } = courtsSlice.actions;

export default courtsSlice.reducer;
