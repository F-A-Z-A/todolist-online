export type ThemeMode = "dark" | "light";

type InitialState = typeof initialState;

const initialState = {
  themeMode: "light" as ThemeMode,
};

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.theme === "light" ? "light" : "dark" };
    default:
      return state;
  }
};

export const changeThemeAC = (payload: { theme: ThemeMode }) => {
  return { type: "CHANGE_THEME", payload } as const;
};

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;

// Action types
type ActionsType = ChangeThemeActionType;
