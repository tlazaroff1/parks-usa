import { cloneDeep } from "lodash";

export const LocationActions = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

export const locationReducer = (state, action) => {
  switch (action.type) {
    case LocationActions.ADD: {
      return { locations: [...state.locations, action.location] };
    }
    case LocationActions.TOGGLE: {
      let newLocations = cloneDeep(state.locations);
      const updatedLocations = newLocations.find(
        (x) => x.title === action.todo.title
      );
      updatedLocations.isComplete = !updatedLocations.isComplete;
      return {
        locations: newLocations,
      };
    }
    case LocationActions.DELETE: {
      let newLocations = state.locations.filter(
        (x) => !(x.title === action.todo.title)
      );
      return {
        locations: newLocations,
      };
    }
  }
};
