import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryContainer, Title } from '@catho/quantum-storybook-ui';
import styled, { css } from 'styled-components';
import Logo from '../../.storybook/static/logo.svg';
import Background from '../../.storybook/static/getting-started-bg.png';
import Introduction from './Introduction';

const StyledTitle = styled(Title)`
  font-size: 50px;
`;

const HeadingWrapper = styled.div`
  position: relative;
  background-image: url(${Background});
  background-color: #f3f3f5;
  padding: 45px 0 !important;
  background-repeat: no-repeat;
`;

const StyledP = styled.p`
  font-size: 17px;
  letter-spacing: initial;
  line-height: initial;
`;

const Image = styled.img`
  margin-right: 20px;
`;

const Heading = ({ name, title, image, children }) => (
  <HeadingWrapper>
    <StoryContainer>
      <StyledTitle>
        {image && <Image alt={title} src={image} width="50" height="50" />}
        {title || name}
      </StyledTitle>
      <StyledP>{children}</StyledP>
      {name && <ViewOnRemote name={name} />}
    </StoryContainer>
  </HeadingWrapper>
);

storiesOf('Introduction', module).add('Getting started', () => (
  <>
    <Heading title="Quantum" className="teste">
      CSS in JS based reusable components, are the core of Quantum
      design-system: a library for developing consistent UI/UX at Catho.
    </Heading>

    <Introduction />
  </>
));
