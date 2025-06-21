import React from 'react';
import Toyota from '../assets/Cars/BrandsSvg/Toyota';
import Honda from '../assets/Cars/BrandsSvg/Honda';
import Mercedes from '../assets/Cars/BrandsSvg/Mercedes';
import Buick from '../assets/Cars/BrandsSvg/Buick'
import { Brand } from '../types';
import Alfaromeo from '../assets/Cars/BrandsSvg/Alfaromeo';
import Lexus from '../assets/Cars/BrandsSvg/Lexus';
import Porsche from '../assets/Cars/BrandsSvg/Porsche';
import Volkswagen from '../assets/Cars/BrandsSvg/Volkswagen';

// Brands data from index.tsx and Brands.tsx
export const brands: Brand[] = [
  {
     name: 'Toyota',
      Svg: Toyota 
    },
  { 
    name: 'Mercedes', 
    Svg: Mercedes 
  },
  { 
    name: 'Honda', 
    Svg: Honda 
  },
  {
    
    Svg: Alfaromeo,
    name: 'Alfaromeo',
  },
  {
    
    Svg:Buick,
    name: 'Buick',
  },
  {
  
    Svg: Porsche,
      name: 'Porsche',
  },{
    
    Svg: Volkswagen,
    name: 'Volkswagen',
  },{
    
    Svg: Lexus,
    name: 'Lexus',
  }
];

// Alternative name for the same data (used in Brands.tsx)
export const carBrands: Brand[] = [
  {
   
    Svg: Toyota,
     name: 'Toyota',
  },
  {
    
    Svg: Honda,
    name: 'Honda',
  },
  {
    
    Svg: Mercedes,
    name: 'Mercedes',
  },
  {
    
    Svg: Alfaromeo,
    name: 'Alfaromeo',
  },
  {
    
    Svg:Buick,
    name: 'Buick',
  },
  {
  
    Svg: Porsche,
      name: 'Porsche',
  },{
    
    Svg: Volkswagen,
    name: 'Volkswagen',
  },{
    
    Svg: Lexus,
    name: 'Lexus',
  }
]; 



export const brandList : Brand[] =[
  {
    name: 'Abarth',
    image: require('../assets/Cars/BrandsSvg/abarth.png')
  },
  {
    name: 'Acura',
    image: require('../assets/Cars/BrandsSvg/acura.png')
  },
  {
    name: 'Alpina',
    image: require('../assets/Cars/BrandsSvg/alpina.png')
  },
  {
    name: ' Audi',
    image: require('../assets/Cars/BrandsSvg/audi.png')
  },
  {
    name: 'Alfaromeo',
    image: require('../assets/Cars/BrandsSvg/alfaromeo.png')
  },
  {
    name: 'Aston Martin',
    image: require('../assets/Cars/BrandsSvg/astonmartin.png'),
  },
  {
    name: 'Arash',
    image: require('../assets/Cars/BrandsSvg/arash.png')
  }
]


export const TABS = [
  { key: 'all', label: 'All' },
  { key: 'sedan', label: 'Sedan' },
  { key: 'suv', label: 'SUV' },
  { key: 'luxury', label: 'Luxury' },
];