import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

const isWindow = () => {
  console.log('pegou');
  useEffect(() => typeof window === 'undefined');
};

const IconFont = isWindow()
  ? () => (
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
        rel="stylesheet"
      />
    )
  : createGlobalStyle`
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons&display=block');
  `;

export default IconFont;
