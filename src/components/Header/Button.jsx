import React from 'react'


// sometimes when we are creating login forms then instead of creating different input forms
// we make one component(input form) now whenever this component is used then we need reference 
// between login form and input form, here  

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  ) 
}

export default Button