import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

const hasWindow = win => typeof win === 'undefined';

// custom hooks
const useWindow = () => {
  const [win, setWindow] = useState(window);

  useEffect(() => {
    setWindow(window);
  });

  return hasWindow(win);
};

const IconFont = () => {
  const isSSR = useWindow();

  return isSSR ? (
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
      rel="stylesheet"
    />
  ) : (
    createGlobalStyle`@import url('https://fonts.googleapis.com/icon?family=Material+Icons&display=block');`
  );
};

export default IconFont;
