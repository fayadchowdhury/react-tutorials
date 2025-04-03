import { useRef } from "react";

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

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (nameRef.current) {
      person.name = nameRef.current.value;
    }
    if (ageRef.current) {
      person.age = parseInt(ageRef.current.value);
    }
    console.log(person);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" ref={nameRef} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" ref={ageRef} type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
