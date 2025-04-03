import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  // useRef is used to get a reference to a DOM element
  // It is similar to useState but it does not cause a re-render when the value changes
  // It has to be initialized to null since React does not have access to the DOM element when the component is first rendered
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const person = {
    name: "",
    age: 0,
  };

  // Also possible to use React Hook Form to grab form inputs
  const { register, handleSubmit } = useForm();

  //   const handleFormSubmit = (event: React.FormEvent) => {
  //     event.preventDefault(); // Prevent the default form submission behavior
  //     if (nameRef.current) {
  //       person.name = nameRef.current.value;
  //     }
  //     if (ageRef.current) {
  //       person.age = parseInt(ageRef.current.value);
  //     }
  //     console.log(person);
  //   };

  const handleFormSubmit = (data: FieldValues) => {
    // Access the values of the form inputs using the data parameter and the registered names
    if (data.name) {
      person.name = data.name;
    }
    if (data.age) {
      person.age = parseInt(data.age);
    }
    console.log(person);
  };

  return (
    // <form onSubmit={handleFormSubmit}>
    // Handle submission of the form using React Hook Form by passing the ()(data) function to handleSubmit
    // The data parameter will contain the values (FieldValues) of the form inputs
    // <form onSubmit={handleSubmit((data) => console.log(data))}>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        {/* <input id="name" ref={nameRef} type="text" className="form-control" /> */}
        {/* Spread the register object and register a new hook named "name" on the name input field */}
        <input
          id="name"
          {...register("name")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        {/* <input id="age" ref={ageRef} type="number" className="form-control" /> */}
        {/* Spread the register object and register a new hook named "age" on the age input field */}
        <input
          id="age"
          {...register("age")}
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
