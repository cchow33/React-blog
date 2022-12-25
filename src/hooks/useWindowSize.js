import { useState, useEffect } from 'react'

// 1. Define the custom hook:
const useWindowSize = () => {
  // 2. Set the state:
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  // 3. useEffect: 
  useEffect(() => {

    // this function will only run at load time
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // 4. Call function at load time 
    handleResize();

    // 5. Add event listener so anytime resize event fires, call function again
    window.addEventListener('resize', handleResize);

    // 6. Cleanup function to prevent memory leak by removing the eventListener

    const cleanUp = () => {
      console.log('runs if a useEffect dependency changes');
      window.removeEventListener('resize', handleResize);
    }

    return cleanUp;
  }, [])

  return windowSize;
}

export default useWindowSize;