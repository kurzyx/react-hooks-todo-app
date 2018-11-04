import React from 'react';

export default function FilterListItem(props) {
  const { name, label, selected, onClick } = props;

  return (
    <li>
      <a
        className={selected ? 'selected' : undefined}
        href={'#/' + name}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
}
