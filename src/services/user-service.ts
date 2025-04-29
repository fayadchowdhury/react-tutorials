import apiClient from "../services/api-client";

export interface User {
    id: number;
    name: string;
}

class UserService
{
    addUser = (user: User) => {
        const request = apiClient.post<User>("/users", user);
        return request;
    }

    getAllUsers = () => {
        const controller = new AbortController();
        const request = apiClient.get<User[]>("/users", {
            signal: controller.signal
        });
        const cancelRequest = () => {
            controller.abort();
        }
        return { request, cancelRequest };
    }

    updateUser = (user: User) => {
        const request = apiClient.patch<User>(`/users/${user.id}`, user);
        return request;
    }

    deleteUserById = (id: number) => {
        const request = apiClient.delete(`/users/${id}`);
        return request;
    }


}

export default new UserService();