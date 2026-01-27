import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';

const animatedComponents = makeAnimated();


type Option = {
  value: string;
  label: string;
};

type ColourOption = {
  value: string;
  label: string;
  color: string;
};


const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'mint', label: 'Mint' },
  { value: 'cookies', label: 'Cookies and Cream' },
];

const colourOptions: ColourOption[] = [
  { value: 'chocolate', label: 'Chocolate', color: '#7c3aed' },
  { value: 'strawberry', label: 'Strawberry', color: '#ec4899' },
  { value: 'vanilla', label: 'Vanilla', color: '#f59e0b' },
  { value: 'mint', label: 'Mint', color: '#10b981' },
  { value: 'cookies', label: 'Cookies & Cream', color: '#6366f1' },
];


const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 1,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 12,
    width: 12,
  },
});


const SelectorsPage: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';


  const baseSelectStyles = {
    control: (base: unknown) => ({
      ...base as object,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      borderColor: isDark ? '#374151' : '#d1d5db',
      color: isDark ? '#fff' : '#000',
      minHeight: 44,
    }),
    menu: (base: unknown) => ({
      ...base as object,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      zIndex: 1300,
    }),
    option: (base: unknown, state: { isFocused: boolean }) => ({
      ...base as object,
      backgroundColor: state.isFocused
        ? isDark
          ? '#374151'
          : '#f3f4f6'
        : 'transparent',
      color: isDark ? '#fff' : '#000',
      cursor: 'pointer',
    }),
    singleValue: (base: unknown) => ({
      ...base as object,
      color: isDark ? '#fff' : '#000',
    }),
    multiValue: (base: unknown) => ({
      ...base as object,
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
    }),
    multiValueLabel: (base: unknown) => ({
      ...base as object,
      color: isDark ? '#fff' : '#000',
    }),
    input: (base: unknown) => ({
      ...base as object,
      color: isDark ? '#fff' : '#000',
    }),
  };


  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      borderColor: isDark ? '#374151' : '#d1d5db',
    }),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        ...dot(data.color),
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.15).css()
          : undefined,
        color: isDisabled
          ? '#9ca3af'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? '#fff'
            : '#000'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },

    input: (styles) => ({
      ...styles,
      ...dot(),
      color: isDark ? '#fff' : '#000',
    }),

    placeholder: (styles) => ({
      ...styles,
      ...dot(isDark ? '#9ca3af' : '#cbd5e1'),
      color: isDark ? '#9ca3af' : '#6b7280',
    }),

    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(data.color),
      color: data.color,
      fontWeight: 500,
    }),

    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.15).css(),
      };
    },

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      ...dot(data.color),
      color: data.color,
      fontWeight: 500,
    }),

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: '#fff',
      },
    }),
  };


  const cardStyle = {
    p: 3,
    flex: '1 1 48%',
    minWidth: 300,
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Advanced Selectors
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Single Select
          </Typography>
          <Select options={options} styles={baseSelectStyles} />
        </Paper>

        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Multi Select
          </Typography>
          <Select isMulti options={options} styles={baseSelectStyles} />
        </Paper>

        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Creatable Select
          </Typography>
          <CreatableSelect
            isClearable
            options={options}
            styles={baseSelectStyles}
          />
        </Paper>

        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Animated Select
          </Typography>
          <Select
            isMulti
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={options}
            styles={baseSelectStyles}
          />
        </Paper>

        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Multi (Color) Select
          </Typography>
          <Select
            isMulti
            options={colourOptions}
            styles={colourStyles}
            placeholder="Select colorful options..."
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SelectorsPage;
