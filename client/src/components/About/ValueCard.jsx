// components/ValueCard.js
import React from 'react';

function ValueCard({ icon, title, description }) {
  return (
    <div class="text-center max-w-sm my-5 sm:my-20 sm:mb-30">
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'lightgray', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ValueCard;