import { cloneDeep } from "lodash";

export const LocationActions = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

export const locationReducer = (state, action) => {
  switch (action.type) {
    case LocationActions.ADD: {
      const newLocation = {
        code: action.code,
        name: action.name,
        //address: action.address,
        long: action.long,
        lat: action.lat,
        isComplete: false,
      };
      return { locations: [...state.locations, newLocation] };
    }
    case LocationActions.TOGGLE: {
      let newLocations = cloneDeep(state.locations);
      const updatedLocations = newLocations.find(
        (x) => x.code === action.location.code
      );
      updatedLocations.isComplete = !updatedLocations.isComplete;
      return {
        locations: newLocations,
      };
    }
    case LocationActions.DELETE: {
      let newLocations = state.locations.filter(
        (x) => !(x.code === action.location.code)
      );
      return {
        locations: newLocations,
      };
    }
  }
};
