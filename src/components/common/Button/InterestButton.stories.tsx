import type { Meta, StoryObj } from '@storybook/react';
import InterestButton from './InterestButton';

const meta: Meta<typeof InterestButton> = {
  title: 'Common/Button/InterestButton',
  component: InterestButton,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof InterestButton>;

export const Default: Story = {
  args: {
    label: 'Interest Button',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected Button',
    selected: true,
  },
};
