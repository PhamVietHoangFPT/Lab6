import { useState } from 'react';

// Custom hook useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Function to toggle the state value
  const toggle = () => {
    setValue(currentValue => !currentValue);
  };

  return [value, toggle];
}

export default useToggle;