import React from "react";

export default function Spinner() {
  return (
    <div>
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
    </div>
  );
}
