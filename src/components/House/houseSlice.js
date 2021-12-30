import { createSlice, current } from "@reduxjs/toolkit";
import InitialHouse from '../../state/initialHouse.json'

const initial = {
  "houses": [InitialHouse],
  "status": "initial"
}

const initialState = {
  "houses": [],
  "status": "empty"
}

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    setInitialState(state) {
      return initial
    },
    restoreSaved(state, action) {
      state.houses = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    addHouse(state, action) {
      const newHouse = {...InitialHouse, title: action.payload.houseTitle}
      state.houses.push(newHouse)
    },
    delHouse(state, action) {
      state.houses = state.houses.filter((house, index) => index !== action.payload)
    },
    addArea(state, action) {
      state.houses[action.payload.houseIndex].areas.push(action.payload.area)
    },
    delArea(state, action) {
      state.houses[action.payload.house].areas = state.houses[action.payload.house].areas.filter((area) => area.id !== action.payload.area)
    },
    addDevice(state, action) {
      console.log(state, action)
      state.houses[action.payload.houseIndex]
        .areas[action.payload.areaIndex]
        .devices.push(action.payload.device)
    },
    editDevice(state, action) {
      state.houses[action.payload.houseIndex]
        .areas[action.payload.areaId]
        .devices[action.payload.deviceId]
        .watt = action.payload.watt
      state.houses[action.payload.houseIndex]
        .areas[action.payload.areaId]
        .devices[action.payload.deviceId]
        .hours = action.payload.hours
    },
    delDevice(state, action) {
      console.log(current(state.houses[action.payload.house]
        .areas[action.payload.area]
        .devices))
      console.log(action.payload.device)
      state.houses[action.payload.house]
        .areas[action.payload.area]
        .devices = state.houses[action.payload.house]
        .areas[action.payload.area]
        .devices.filter((device, index) => index !== action.payload.device) 
    },
    setPrice(state, action) {
      state.houses[action.payload.houseIndex].cost.price = action.payload.price
    },
    setSymbol(state, action) {
      state.houses[action.payload.houseIndex].cost.symbol = action.payload.symbol
    },    
  }});

export default houseSlice.reducer;

export const {
  setInitialState,
  restoreSaved,
  setStatus,
  delDevice,
  addArea,
  delArea,
  editDevice,
  addDevice,
  addHouse,
  delHouse,
  setPrice,
  setSymbol
} = houseSlice.actions;
