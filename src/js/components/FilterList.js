import React from 'react';
import FilterListItem from './FilterListItem';

const filters = [
  { name: '', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' }
];

export default function FilterList(props) {
  const { currentFilter } = props;

  return (
    <ul className="filters">
      {filters.map(({ name, label }) => (
        <FilterListItem
          key={name}
          name={name}
          label={label}
          selected={name === currentFilter}
        />
      ))}
    </ul>
  );
}
