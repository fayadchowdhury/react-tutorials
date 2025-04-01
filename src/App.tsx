// import Message from "./Message";
import ListGroup from "./components/ListGroup";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      {/* Update ListGroup to include props (they are destructured)*/}
      <ListGroup
        items={["Item 1", "Item 2", "Item 3", "Item 4"]}
        header={"Items"}
        onSelectItem={handleSelectItem} // Pass handler function as a prop
      />
    </div>
  );
}

export default App;
