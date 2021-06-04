import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = [
    {
        name: "Maus Court",
        latitude: 52.496292,
        longitude: 13.423588,
        coordinates: [13.423588, 52.496292],
        description:
            "Indoor half-court, small with chain baskets. Concrete floor. (Actually my own flat...)",
        checkins: 0,
    },
    {
        name: "Pizza Court",
        latitude: 52.491398,
        longitude: 13.426247,
        coordinates: [13.426247, 52.491398],
        description:
            "Outdoor small fullcourt with chain baskets and playground floor.",
        checkins: 0,
    },
    {
        name: "Reuter Court",
        latitude: 52.48854,
        longitude: 13.429357,
        coordinates: [13.429357, 52.48854],
        description:
            "Outdoor Half-Court, metal rim with what used to be chain baskets",
        checkins: 0,
    },
    {
        name: "Hasenheide Court",
        latitude: 52.480541,
        longitude: 13.417114,
        coordinates: [13.417114, 52.480541],
        description: "Outdoor double half-Court, chain baskets",
        checkins: 0,
    },
    {
        name: "Böcklerpark Court",
        latitude: 52.496655,
        longitude: 13.407493,
        coordinates: [13.407493, 52.496655],
        description: "Outdoor double half-Court, chain baskets",
        checkins: 0,
    },
    {
        name: "Weserstr. Court",
        latitude: 52.486661,
        longitude: 13.434104,
        coordinates: [13.434104, 52.486661],
        description: "Outdoor fullcourt, chain baskets",
        checkins: 0,
    },
    {
        name: "Tempelhofer Feld Court",
        latitude: 52.480248,
        longitude: 13.406458,
        coordinates: [13.406458, 52.480248],
        description: "Outdoor small fullcourt with chain baskets",
        checkins: 0,
    },
];

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
    localStorage.setItem("courts", JSON.stringify(data));

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
        updateCourt(state, action) {
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

export const { addCourt, updateCourt } = courtsSlice.actions;

export default courtsSlice.reducer;
