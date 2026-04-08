import {useDispatch, useSelector} from "react-redux";
import {store} from "../redux/store";

const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();


export {useAppDispatch, useAppSelector}