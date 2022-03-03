import React from "react";

const Winery = (props) => {
   
  const winery = props.winery || [];
  console.log('winer in winery', winery)
  return (<p>{winery.name}</p>);
};

export default Winery;
