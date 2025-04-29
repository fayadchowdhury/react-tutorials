// This file is going to form the base of all HTTP request-based services

import apiClient from "../services/api-client";

// This is no longer needed since we are going to use a generic
// export interface User {
//     id: number;
//     name: string;
// }

interface Entity {
    id: number;
}

class HttpService
{
    // To define the endpoint for different business units
    endpoint: string;

    // Initialize the HTTP service with a specific endpoint
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    addEntity<T>(entity: T) {
        const request = apiClient.post<T>(`/${this.endpoint}`, entity);
        return request;
    }

    getAllEntities<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(`/${this.endpoint}`, {
            signal: controller.signal
        });
        const cancelRequest = () => {
            controller.abort();
        }
        return { request, cancelRequest };
    }

    // Make a generic extend an interface since that will have the ID property defined
    updateEntity<T extends Entity>(entity: T) {
        const request = apiClient.patch<T>(`/${this.endpoint}/${entity.id}`, entity);
        return request;
    }

    deleteEntityById(id: number) {
        const request = apiClient.delete(`${this.endpoint}/${id}`);
        return request;
    }


}

// Return by default a function that can create a HTTP service instance
const create = (endpoint: string) => new HttpService(endpoint);

export default create;
