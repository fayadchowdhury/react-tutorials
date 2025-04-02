interface InfoDisplayProps {
  persons: {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
    };
  }[];
  addJohnDoe: () => void;
  modifyJaneDoe: () => void;
}

const InfoDisplay = ({
  persons,
  addJohnDoe,
  modifyJaneDoe,
}: InfoDisplayProps) => {
  return (
    <div>
      <h1>Persons</h1>
      {persons.map((person, index) => (
        <div key={index}>
          <h2>{person.name}</h2>
          <p>Age: {person.age}</p>
          <p>Addresses:</p>
          {person.address.street}, {person.address.city}
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={addJohnDoe}>
        Add another John Doe
      </button>
      <button type="button" className="btn btn-primary" onClick={modifyJaneDoe}>
        Modify Jane Doe's address
      </button>
    </div>
  );
};

export default InfoDisplay;
