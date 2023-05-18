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
        code: action.location.code,
        name: action.location.name,
        long: action.location.long,
        lat: action.location.lat,
        isComplete: false,
      };
      return { locations: [...state.locations, newLocation] };
    }
    case LocationActions.TOGGLE: {
      const updatedLocations = state.locations.map((location) => {
        if (location.code === action.location.code) {
          return { ...location, isComplete: !location.isComplete };
        }
        return location;
      });
      return {
        locations: updatedLocations.filter((location) => location.isComplete),
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
