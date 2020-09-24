import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonDonation({onClick}) {
  return(
    <Button
      onClick={onClick}
    >
      Faire un don
    </Button>
  );
}

export default ButtonDonation;