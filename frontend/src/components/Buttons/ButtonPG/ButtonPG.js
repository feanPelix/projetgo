import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonPG.css';

/*
  BUTTON for projet Go
  Takes a string: as text on the button
  Takes a variant: orange(default) or teal
  Takes a size: sm, md(default) or lg
  Takes a function: as onClick
  Takes a type: submit, reset, button(default)
*/
export default function ButtonPG({className, text, children, variant, size, onClick, type, disabled, style}) {  
  return (
    <Button
      size={size || 'md'}
      variant={variant || 'orange'}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
      className={className}
      style={style}
    >
      {text || children}
    </Button>
  );
}