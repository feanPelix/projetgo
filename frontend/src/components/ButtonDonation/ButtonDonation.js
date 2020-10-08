import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonDonation.css';

export function ButtonDonation() {
  const handleClick = () => {};

  return (
    <Button
      variant="donation"
      onClick={handleClick}
    >
      Faire un don
    </Button>
  );
}

export default ButtonDonation;