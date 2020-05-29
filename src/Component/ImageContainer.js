import React from "react";

export default ({ url }) => {
  return url ? (
    <img
      className='rounded'
      style={{
        width: "640px",
        height: "400px",
      }}
      src={url}
      alt=''
    />
  ) : (
    <div
      className='flex justify-center items-center bg-gray-300 rounded'
      style={{
        width: "640px",
        height: "400px",
      }}
    >
      Press Play to load images
    </div>
  );
};
