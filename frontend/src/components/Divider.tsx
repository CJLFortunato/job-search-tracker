import React from 'react';

function Divider({ text }: { text: string }) {
  return (
    <div className="divider">
      {text}
      <hr />
    </div>
  );
}

export default Divider;
