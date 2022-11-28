import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "redux/store";

const useDispatch = () => useReduxDispatch<AppDispatch>();
export default useDispatch;
