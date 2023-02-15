import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiPortal } from '../UiPortal';

export default {
  title: 'Example/Portal'
} as ComponentMeta<typeof UiPortal>;

const Template: ComponentStory<typeof UiPortal> = () => <UiPortal />;
export const props = Template.bind({});