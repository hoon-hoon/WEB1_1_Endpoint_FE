import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['fill', 'unfill'],
    },
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'orange'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'long'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'fill',
    color: 'blue',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'unfill',
    color: 'gray',
    size: 'medium',
  },
};

export const LargeFill: Story = {
  args: {
    label: 'Large Button',
    variant: 'fill',
    color: 'green',
    size: 'large',
  },
};

export const LongUnfill: Story = {
  args: {
    label: 'Full Width Button',
    variant: 'unfill',
    color: 'orange',
    size: 'long',
  },
};
