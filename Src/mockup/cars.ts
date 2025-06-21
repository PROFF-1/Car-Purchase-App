import React from 'react';
import AmgCoupe from '../assets/Cars/CarsSvg/AmgCoupe';
import Ferrari from '../assets/Cars/CarsSvg/Ferrari';
import MorrisGarages from '../assets/Cars/CarsSvg/MorrisGarages';
import Hurracan from '../assets/Cars/CarsSvg/Hurracan';
import Mustang from '../assets/Cars/CarsSvg/Mustang';
import AudiTT from '../assets/Cars/CarsSvg/AudiTT';
import RapidE from '../assets/Cars/CarsSvg/RapidE';
import Lamboghini from '../assets/Cars/CarsSvg/Lamborghini';
import Cadillac from '../assets/Cars/CarsSvg/Cadillac';
import Mazda from '../assets/Cars/CarsSvg/Mazda';
import { Car } from '../types';

// Top deals data from index.tsx
export const topDeals: Car[] = [
  { name: 'Lamborghini', price: '$67,600', Svg: Lamboghini, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Lamborghini/5.2-liter V-10' },
  { name: 'Rapide E', price: '$330,000', Svg: RapidE, colors: ['#fff', '#000', '#f9c'], favorite: true, description: 'Aston Martin/Electric Car' },
  { name: 'Amg GT Coupe', price: '$120,000', Svg: AmgCoupe, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Mercedes-Benz/4.0L AMG V8 biturbo' },
  { name: 'Ferrari 812', price: '$340,000', Svg: Ferrari, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Ferrari/F12berlinetta\'s V12' },
  { name: 'Morris Garages', price: '$45,000', Svg: MorrisGarages, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'MG/1.5-liter four-cylinder' },
  { name: 'Hurracan', price: '$210,000', Svg: Hurracan, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Lamborghini/5.2-liter V-10' },
  { name: 'Mustang', price: '$60,000', Svg: Mustang, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Ford/The 2.3L EcoBoost' },
  { name: 'Audi TT', price: '$50,000', Svg: AudiTT, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Audi/2.0-liter four-cylinder' },
];

// Upcoming cars data from index.tsx
export const upcoming: Car[] = [
  { 
    name: 'Mazda Enclave', 
    price: '$42,700-$48,700', 
    Svg: Mazda, 
    colors: ['#d00', '#000'], 
    favorite: false, 
    description: 'Mazda/Mid-size SUV' 
  },
  { 
    name: 'Cadillac-CT5', 
    price: '$58,600-$58,900', 
    Svg: Cadillac, 
    colors: ['#00f', '#000'], 
    favorite: false, 
    description: 'Cadillac/Luxury Sedan' 
  },
];

// Car data from buy-car.tsx
export const carData: Car[] = [
  {
    name: 'Audi TT RS',
    price: '$67,600',
    image: 'https://images.unsplash.com/photo-1549399542-7ba77334759b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Lamboghini,
    colors: ['#fff', '#000', '#FFD600'],
    favorite: false,
    description: 'Audi/2.0-liter four-cylinder',
  },
  {
    name: 'Mustang',
    price: '$26,670',
    image: 'https://images.unsplash.com/photo-1542362543-b26a6d6d4a5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Mustang,
    colors: ['#FFA500', '#808080', '#008000'],
    favorite: false,
    description: 'Ford/The 2.3L EcoBoost',
  },
  {
    name: 'Huracán',
    price: '$67,600',
    image: 'https://images.unsplash.com/photo-1583121274640-4200d7d2f9d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Hurracan,
    colors: ['#FFD600', '#000', '#fff'],
    favorite: false,
    description: 'Lamborghini/5.2-liter V-10',
  },
  {
    name: 'Morris Garages',
    price: '$14,900',
    image: 'https://images.unsplash.com/photo-1621430076-0f2c8d5b1b1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: MorrisGarages,
    colors: ['#008000', '#fff', '#FF0000'],
    favorite: false,
    description: 'MG/1.5-liter four-cylinder',
  },
  {
    name: 'Ferrari 812',
    price: '$98,800',
    image: 'https://images.unsplash.com/photo-1594955745162-42173160a0a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Ferrari,
    colors: ['#FF0000', '#000', '#FFD600'],
    favorite: false,
    description: 'Ferrari/F12berlinetta\'s V12',
  },
  {
    name: 'AMG GT Coupe',
    price: '$59,800',
    image: 'https://images.unsplash.com/photo-1599434861621-c4d3b0e1b1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: AmgCoupe,
    colors: ['#0000FF', '#fff', '#808080'],
    favorite: false,
    description: 'Benz/4.0L AMG V8 biturbo',
  },
]; 




