import dummyCategories from "../data/dummy-categories";

interface ExpenseFilterProps {
  onFilterChange: (category: string) => void;
}

const ExpenseFilter = ({ onFilterChange }: ExpenseFilterProps) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onFilterChange(event.target.value)}
    >
      <option value=""></option>
      {dummyCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
