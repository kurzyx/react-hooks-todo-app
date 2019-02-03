import React, { useContext } from 'react';
import { useLocationHashChange } from '../hooks';
import { changeFilter } from '../store/actions';
import StoreContext from '../store/StoreContext';
import FilterListItem from './FilterListItem';

const filters = [
  { name: '', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' }
];

function useLocationHashFilter(callback) {
  useLocationHashChange(hash => {
    let newFilter;

    switch (hash) {
      case '#/active':
      case '#active':
        newFilter = 'active';
        break;
      case '#/completed':
      case '#completed':
        newFilter = 'completed';
        break;
      default:
        newFilter = '';
        break;
    }

    callback(newFilter);
  });
}

export default function FilterList(props) {
  const { currentFilter } = props;

  const [, dispatch] = useContext(StoreContext);

  useLocationHashFilter(newFilter => {
    const action = changeFilter(newFilter);
    dispatch(action);
  });

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
