// A component in React cannot return more than one element
// One way around this is to wrap everything in a div so it becomes a single component
// But this creates and renders a separate div element in the DOM
// A better way to do this is using Fragment

import { Fragment } from "react";
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

  const message = items.length === 0 ? <p>Empty</p> : null;

  const getMessage = () => {
    // Useful to do functions if we're going to parameterize it somehow
    // return items.length === 0 ? <p>Empty</p> : null;
    return items.length === 0 && <p>Empty</p>; // Equivalent to the above expression
  };

  const handleClick = (event: MouseEvent, item: string) => {
    console.log(event);
    console.log(item);
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
          items.map((item) => (
            <li
              className="list-group-item"
              key={item}
              // onClick={() => alert(`Clicked ${item}`)}
              onClick={(event) => handleClick(event, item)}
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
