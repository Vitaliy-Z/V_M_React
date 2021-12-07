import React from "react";

export default function Qualitie({ color, name }) {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
}
