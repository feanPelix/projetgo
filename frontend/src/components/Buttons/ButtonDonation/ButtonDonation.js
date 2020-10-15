import React from 'react';
import ButtonPG from '../ButtonPG/ButtonPG';
import './ButtonDonation.css';

export function ButtonDonation() {
  const handleClick = () => {};

  return (
    <ButtonPG
      text="Faire un don"
      variant="orange"
      onClick={handleClick}
    />
  );
}

export default ButtonDonation;