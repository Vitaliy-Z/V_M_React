import React from "react";

export default function SearchStatus({ length }) {
  let title = `${length} человек тусaнет с тобой сегодня`;

  if (length === 0) {
    title = "Никто НЕ тусaнет с тобой сегодня";
  }
  if (1 < length && length < 5) {
    title = `${length} человекa тусaнет с тобой сегодня`;
  }
  if (length > 20 && 1 < length % 10 && length % 10 < 5) {
    title = `${length} человекa тусaнет с тобой сегодня`;
  }

  return (
    <h1>
      <span className={length === 0 ? "badge bg-warning" : "badge bg-primary"}>
        {title}
      </span>
    </h1>
  );
}
