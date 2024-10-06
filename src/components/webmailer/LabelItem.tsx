import React from "react";

export function LabelItem(props: {
  key: number;
  id: number;
  label: { id: number; name: string; emailNumber: number };
  onClick: (id: number) => void;
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={() => props.onClick(props.id)}
    >
      {props.label.name}
      <span className="badge badge-default badge-pill">
        {props.label.emailNumber}
      </span>
    </li>
  );
}
