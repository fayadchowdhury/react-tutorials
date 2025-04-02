interface InfoProps {
  personCount: number;
}

const Info = ({ personCount }: InfoProps) => {
  return (
    <div>
      <h1>Person Count</h1>
      {personCount === 0 ? (
        <p>Empty</p>
      ) : (
        <p>
          {personCount} {personCount > 1 ? "people" : "person"} found
        </p>
      )}
    </div>
  );
};

export default Info;
