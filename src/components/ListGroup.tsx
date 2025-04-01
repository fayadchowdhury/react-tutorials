// A component in React cannot return more than one element
// One way around this is to wrap everything in a div so it becomes a single component
// But this creates and renders a separate div element in the DOM
// A better way to do this is using Fragment

import { Fragment, useState } from "react";
import { MouseEvent } from "react";

function ListGroup() {
  // class is a reserved keyword in TS/JS; use className instead
  // Example of Fragment
  // Also possible to use empty angle brackets like so <> to avoid importing

  const items: string[] = ["Item 1", "Item 2", "Item 3", "Item 4"];

  // const items: string[] = [];

  // Implemented later
  // if (items.length === 0) {
  //   return (
  //     <>
  //       <h1>List Group</h1>
  //       <p>Empty</p>
  //     </>
  //   );
  // }

  // const message = items.length === 0 ? <p>Empty</p> : null;

  const getMessage = () => {
    // Useful to do functions if we're going to parameterize it somehow
    // return items.length === 0 ? <p>Empty</p> : null;
    return items.length === 0 && <p>Empty</p>; // Equivalent to the above expression
  };

  // let selectedIndex: number = 0; // With this implementation, the selectedIndex will be reset to 0 every time the component is re-rendered
  // Furthermore, React cannot track changes to the variable and update the UI accordingly
  // Use a state variable to keep track of the selected index
  // We use the useState React hook to create a state variable
  // The useState function returns an array with two elements: the current state and a function to update it
  // The useState function takes an initial value as an argument
  // The initial value is used to set the state variable when the component is first rendered
  // The state variable is updated using the function returned by useState
  // The function takes the new value as an argument and updates the state variable
  // The component is re-rendered with the new state variable
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // Use state to keep track of the selected index

  const handleClick = (event: MouseEvent, item: string, index: number) => {
    console.log(event);
    console.log(item);
    setSelectedIndex(index);
  };

  return (
    <Fragment>
      <h1>List</h1>
      {/* {message} Same as below */}
      {getMessage()}
      <ul className="list-group">
        {/* <li className="list-group-item">First item</li>
        <li className="list-group-item">Second item</li>
        <li className="list-group-item">Third item</li>
        <li className="list-group-item">Fourth item</li>
        <li className="list-group-item">Fifth item</li> */}
        {
          /* Wrap in curly braces to compile and render based on code */
          items.map((item, index) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item}
              // onClick={() => alert(`Clicked ${item}`)}
              onClick={(event) => handleClick(event, item, index)}
            >
              {item}
            </li> // Important to assign key so that React knows how to update DOM
          ))
        }
      </ul>
    </Fragment>
  );
}

export default ListGroup;
