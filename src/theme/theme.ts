interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number; 
  space_32: number;
  space_36: number;
  space_40: number,
  space_80: number,
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
  space_40: 40,
  space_80: 80,

};

interface Color {
  Black: string;
  BlackRGB10: string;
  Orange: string;
  OrangeRGBA0: string;
  Grey: string;
  DarkGrey: string;
  Yellow: string;
  White: string;
  WhiteRGBA75: string;
  WhiteRGBA50: string;
  WhiteRGBA32: string;
  WhiteRGBA15: string;
  primary: string;  // Thêm thuộc tính mới vào đây
  title: string;
  white: string;
  lightGrey: string;
  grey: string;
  blue: string;
  yellow: string;
  Background: string; // Thêm thuộc tính Background
  Red: string;
  BackgroundGray: string, 
  Green: string,
  Gray: string,
}

export const COLORS: Color = {
  Black: '#000000',
  BlackRGB10: 'rgba(0,0,0,0.1)',
  Orange: '#FF5524',
  OrangeRGBA0: 'rgba(255,85,36,0)',
  Grey: '#333333',
  DarkGrey: '#0b0b0b',
  Yellow: '#E1CD17',
  White: '#FFFFFF',
  WhiteRGBA75: 'rgba(255,255,255,0.75)',
  WhiteRGBA50: 'rgba(255,255,255,0.50)',
  WhiteRGBA32: 'rgba(255,255,255,0.32)',
  WhiteRGBA15: 'rgba(255,255,255,0.15)',
  primary: '#f52d56',
  title: '#072F4A',
  white: '#FFFFFF',
  lightGrey: '#D3D6D6',
  grey: '#C1C0C9',
  blue: '#087BB6',
  yellow: '#F4D03F',
  Background: '#F5F5F5',
  Red: '#FF0000',
  BackgroundGray: '#F0F0F0', 
  Green: '#00FF00',
  Gray: '',
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_30: number;
  size_32: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_30: 30,
  size_32: 32,
};

interface BorderRadius {
  radius_4: number;
  radius_5: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
  radius_30: number;
  radius_16: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_5: 5,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
  radius_30: 30,
  radius_16:16
};

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,

  width,
  height,
}