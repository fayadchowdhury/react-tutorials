import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  // This is another way of defining props, just destructuring the interface in the paramater itself
  const [products, setProducts] = useState<string[]>([]);

  // Cleanup code to be used in useEffect before the component is unmounted
  const cleanup = () => {
    console.log("Cleanup");
  };

  // Executed after each render if empty array passed for dependencies
  useEffect(() => {
    console.log(`Fetching products in ${category}`);
    setProducts(["Clothing", "Household"]); // This updates the state and calls for a re-render (hence the infinite loop...)
    return () => {
      cleanup();
    }; // Cleanup code to be executed before the component is unmounted (each re-render = unmount and then mount)
  }, [category]); // Effect is dependent on empty array (no variables) so it only runs once; after passing the category variable, it runs every time the category variable changes via state and props

  return <div>ProductList</div>;
};

export default ProductList;
