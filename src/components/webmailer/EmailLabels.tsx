import React from "react";
import { LabelItem } from "@/components/webmailer/LabelItem";

export function EmailLabels({
  onLabelClick,
}: {
  onLabelClick: (label: number) => void;
}) {
  const defaultProps = {
    //Labels will be static for this example.
    labels: [
      {
        id: 1,
        name: "Inbox",
        emailNumber: 4,
      },
      {
        id: 2,
        name: "Important",
        emailNumber: 2,
      },
      {
        id: 3,
        name: "Sent",
        emailNumber: 9,
      },
      {
        id: 4,
        name: "Trash",
        emailNumber: 12,
      },
    ],
  };
  return (
    <ul className="list-group">
      {defaultProps.labels.map((label) => (
        <LabelItem
          key={label.id}
          id={label.id}
          label={label}
          onClick={() => onLabelClick(label.id)}
        />
      ))}
    </ul>
  );
}
