import "./filters.css";
import { useId } from "react";
import { useFilters } from "../hooks/useFilters";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    const value = event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      minPrice: value,
    }));
  };

  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setFilters((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input type="range" id={minPriceFilterId} min="0" max="1000" onChange={handleChangeMinPrice} value={filters.minPrice} />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">todas</option>
          <option value="laptops">portatiles</option>
          <option value="smartphones">celulares</option>
        </select>
      </div>
    </section>
  );
}
