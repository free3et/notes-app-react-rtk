import { useSelector } from "../../node_modules/react-redux/es/index";
import { useDispatch } from "../../node_modules/react-redux/es/hooks/useDispatch";
import { TypedUseSelectorHook } from "../../node_modules/react-redux/es/types";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
