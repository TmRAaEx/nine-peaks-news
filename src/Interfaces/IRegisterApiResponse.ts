import { IUser } from "@/models/User";

export default interface IRegisterApiResponse{
    error?: string;
    data: IUser;
}