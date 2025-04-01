// import Message from "./Message";
import { useState } from "react";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisiblity, setAlertVisibility] = useState(false);

  return (
    <div>
      {/* Update ListGroup to include props (they are destructured)*/}
      {alertVisiblity && (
        <Alert onCloseClick={() => setAlertVisibility(false)}>
          <p>ALERT!!!!</p>
        </Alert>
      )}
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
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>
        <h1>CLICK ME TO SHOW AN ALERT!</h1>
      </Button>
    </div>
  );
}

export default App;
