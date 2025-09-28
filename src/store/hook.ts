import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from ".";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
