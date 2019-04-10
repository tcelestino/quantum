import React from 'react';
import { storiesOf } from '@storybook/react';
import { AutoExample } from '@catho/quantum-storybook-ui';
import { Alert } from '../../components';

const description = `Alerts are used for items that need to be labeled,
categorized, or organized using keywords that describe them.`;

storiesOf('Alert', module).add('Alert', () => (
  <AutoExample
    description={description}
    component={Alert}
    componentProps={{
      children: `This is awesome!`,
      onClose: () => {},
      icon: 'info',
    }}
  />
));
