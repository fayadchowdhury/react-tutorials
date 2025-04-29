// import axios, { AxiosError, CanceledError } from "axios";
import apiClient, { CanceledError } from "../services/api-client";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";

interface User {
  id: number;
  name: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // This is an optimistic update where the UI is updated before a server request is made and then refreshed depending on server response
  const deleteUserOptimistically = (id: number) => {
    const prevUsers = users;
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);

    apiClient.delete(`/users/${id}`).catch((err) => {
      setError(err.message);
      setUsers(prevUsers); // Revert the users list back to the original state
    });
  };

  const deleteUserPessimistically = (id: number) => {
    const prevUsers = users;

    apiClient
      .delete(`/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newUsers = users.filter((user) => user.id !== id);
          setUsers(newUsers);
        } else {
          setError("Failed to delete user");
          setUsers(prevUsers); // Revert the users list back to the original state
        }
      })
      .catch((err) => {
        setError(err.message);
        setUsers(prevUsers); // Revert the users list back to the original state
      });
  };

  const addUserPessimistically = () => {
    let user = {
      id: users.length + 1,
      name: "John Doe",
    };
    // This is a static user that is added to the list of users

    const prevUsers = users;

    apiClient
      .post("/users", user)
      .then((response) => {
        if (response.status === 201) {
          setUsers([response.data, ...users]);
        } else {
          setError("Failed to add user");
          setUsers(prevUsers); // Revert the users list back to the original state
        }
      })
      .catch((err) => {
        setError(err.message);
        setUsers(prevUsers); // Revert the users list back to the original state
      });
  };

  const updateUser = (user: User) => {
    const prevUsers = users;
    const newUser = { ...user, name: user.name + " (updated)" };

    // Use patch to update certain attributes of an object if backend supports it
    // Put is normally used to delete and recreate an objecyt in the backend
    apiClient
      .patch(`/users/${user.id}`, newUser)
      .then((res) => {
        if (res.status === 200) {
          const newUsers = users.map((u) => (u.id === user.id ? newUser : u));
          setUsers(newUsers);
        } else {
          setError("Failed to update user");
          setUsers(prevUsers); // Revert the users list back to the original state
        }
      })
      .catch((err) => {
        setError(err.message);
        setUsers(prevUsers); // Revert the users list back to the original state
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/users", {
        signal: controller.signal,
      }) // The signal is used to abort the request if the component unmounts
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false); // Set loading to false when the data is fetched
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return; // If the request was canceled, do nothing
        }
        setError(err.message);
        setIsLoading(false); // Set loading to false when there is an error
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when the request is completed
      }); // This doesn't work in strict mode but this is the correct way to do it

    return () => controller.abort(); // Cleanup function to abort the request if the component unmounts
  }, []);

  // Alternative way to do the above with async/await
  //   useEffect(() => {
  //     const controller = new AbortController(); // Create a new AbortController instance
  //     const fetchUsers = async () => {
  //       // Need to use an async funtion within useEffect since useEffect cannot be async
  //       try {
  //         const response = await axios.get(
  //           "https://jsonplaceholder.typicode.com/users",
  //           { signal: controller.signal }
  //         ); // If the promise resolves, the response will be returned
  //         setUsers(response.data);
  //       } catch (err) {
  //         if (err instanceof CanceledError) {
  //           return; // If the request was canceled, do nothing
  //         setError((err as AxiosError).message); // If the promise rejects, the error will be returned (it also then needs to be cast to AxiosError)
  //       }
  //     };

  //     fetchUsers(); // Call the async function
  //     return () => controller.abort(); // Cleanup function to abort the request if the component unmounts
  //   }, []);

  return (
    <div>
      <h1>Users List</h1>
      {isLoading && <div className="spinner-border"></div>}
      {/* A pathway to  add a user - a button that adds a statically defined user*/}
      <button className="btn btn-primary mb-3" onClick={addUserPessimistically}>
        Add user
      </button>
      {error && <p className="text-danger">Error: {error}</p>}
      <ul className="list-group mb-3 mt-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-warning"
                onClick={() => updateUser(user)}
              >
                Update user
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUserOptimistically(user.id)}
              >
                Optimistically Delete
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUserPessimistically(user.id)}
              >
                Pessimistically Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Users Count: {users.length}</h2>
    </div>
  );
};

export default UsersList;
