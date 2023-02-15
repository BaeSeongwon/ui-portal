import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiPortalThumbnailPalette } from '../components/thumbnail/UiPortalThumbnailPalette';

export default {
  title: 'Example/Portal Palette'
} as ComponentMeta<typeof UiPortalThumbnailPalette>;

const Template: ComponentStory<typeof UiPortalThumbnailPalette> = (args) => <UiPortalThumbnailPalette {...args}/>;

export const props = Template.bind({});
props.args = {
  thumbNails: []
}