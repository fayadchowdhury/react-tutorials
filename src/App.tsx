// import Message from "./Message";
// import { useState } from "react";
import { useState } from "react";
import ListGroup from "./components/ListGroup";
import Info from "./components/Info";
import InfoDisplay from "./components/InfoDisplay";
// import Button from "./components/Button";
// import Alert from "./components/Alert";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  // To share state between components it is recommended to pass the state up to the nearest parent
  // and then pass it down to the child components as props
  // It is also important to note that props are immutable but state is and state should be entirely
  // managed by the component that owns it
  let johnDoe = {
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
    },
  };
  let janeDoe = {
    name: "Jane Doe",
    age: 26,
    address: {
      street: "456 Second St",
      city: "New Jersey",
    },
  };
  const [persons, setPersons] = useState([johnDoe, janeDoe]);

  // const [alertVisiblity, setAlertVisibility] = useState(false);

  return (
    <div>
      {/* Update ListGroup to include props (they are destructured)*/}
      {/* {alertVisiblity && (
        <Alert onCloseClick={() => setAlertVisibility(false)}>
          <p>ALERT!!!!</p>
        </Alert>
      )} */}
      <ListGroup
        items={["Item 1", "Item 2", "Item 3", "Item 4"]}
        // header={"Items"}
        onSelectItem={handleSelectItem} // Pass handler function as a prop
      >
        {/* Update the ListGroup element to accept a child element */}
        <div>
          {/* Any HTML element can be passed in here */}
          <p>ITEMS</p>
        </div>
      </ListGroup>
      <Info personCount={persons.length} />
      {/* When passing in an array as a state, you need to pass in the entire modified array */}
      <InfoDisplay
        persons={persons}
        addJohnDoe={() => setPersons([...persons, johnDoe])}
        modifyJaneDoe={() =>
          setPersons(
            persons.map((person) =>
              person.name === "Jane Doe"
                ? {
                    ...person,
                    address: { ...person.address, street: "789 Third St" },
                  }
                : person
            )
          )
        }
      />
      {/* <Button color="secondary" onClick={() => setAlertVisibility(true)}>
        <h1>CLICK ME TO SHOW AN ALERT!</h1>
      </Button> */}
    </div>
  );
}

export default App;
