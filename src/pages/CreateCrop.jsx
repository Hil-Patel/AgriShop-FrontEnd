import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const CreateCrop = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    unit: 'quintal',
    minBid: '',
    endDate: '',
    images: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  return (
    <></>
    
  );
};

export default CreateCrop;
