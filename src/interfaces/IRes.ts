import type {AxiosResponse} from "axios";

export type IRes <T> = Promise <AxiosResponse<T>>