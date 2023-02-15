import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiPortalBackground } from '../components/background/UiPortalBackground';

export default {
  title: 'Example/Portal Backgroud'
} as ComponentMeta<typeof UiPortalBackground>;

const Template: ComponentStory<typeof UiPortalBackground> = (args) => <UiPortalBackground {...args} />;

export const props = Template.bind({});
props.args = {
  colSize: 13,
  rowSize: 13,
  style: {
    backgroud: {
      backgroudTdWidth: '70px',
      backgroudTdHeight: '70px'
    }
  }
}