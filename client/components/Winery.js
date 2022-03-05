import React from "react";

const Winery = (props) => {
  const winery = props.winery || [];
  return <p>{winery.name}</p>;
};

export default Winery;
