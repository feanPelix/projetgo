import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPG.css';

/*
  BUTTON for projet Go
  Takes a string: as text on the button
  Takes a variant: orange or teal
  Takes a size: sm, md or lg
  Takes a function: as onClick
*/
export default function ButtonPG({text, variant, size, onClick}) {  
  //Set defaults values if missing props
  text = text || 'Button';
  size = size || 'md';
  variant = variant || 'orange';

  return (
    <Button
      className={size}
      variant={variant}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}