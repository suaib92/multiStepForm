import React, { useState, useEffect } from 'react';

const MultiStepForm = () => {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // Load data from localStorage if available
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('multiStepFormData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
          errors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
          errors.phone = 'Phone number must be 10 digits';
        }
        break;
      case 2:
        if (!formData.addressLine1.trim()) {
          errors.addressLine1 = 'Address Line 1 is required';
        }
        if (!formData.city.trim()) {
          errors.city = 'City is required';
        }
        if (!formData.state.trim()) {
          errors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
          errors.zipCode = 'Zip Code is required';
        } else if (!/^\d{6}$/.test(formData.zipCode)) {
          errors.zipCode = 'Zip Code must be 6 digits';
        }
        break;
      default:
        break;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Handle final submission or API call
        alert('Form submitted successfully!');
        console.log('Form submitted successfully:', formData);
        localStorage.removeItem('multiStepFormData'); // Clear localStorage
        setFormData(initialFormData); // Reset formData state
        setErrors({}); // Clear errors state
        setCurrentStep(1); // Reset to first step
      }
    }
  };

  const navigateToNextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const navigateToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 3;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-md">
      <div className="mb-4">
        <div className="flex justify-between mb-4">
          <div className={`tab ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-l-md p-2 cursor-pointer`}>Step 1</div>
          <div className={`tab ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} p-2 cursor-pointer`}>Step 2</div>
          <div className={`tab ${currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-r-md p-2 cursor-pointer`}>Step 3</div>
        </div>

        {currentStep === 1 && (
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm    "
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
            <br />
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm  "
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
            <br />
            <label className="block mb-2">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
            <br />
            <button
              type="button"
              disabled={isFirstStep}
              onClick={navigateToPreviousStep}
              className="btn-primary mr-2"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={navigateToNextStep}
              className="btn-primary  hover:to-blue-600 "
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label className="block mb-2">Address Line 1:</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            {errors.addressLine1 && <span className="text-red-500">{errors.addressLine1}</span>}
            <br />
            <label className="block mb-2">Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            <br />
            <label className="block mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            {errors.city && <span className="text-red-500">{errors.city}</span>}
            <br />
            <label className="block mb-2">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            {errors.state && <span className="text-red-500">{errors.state}</span>}
            <br />
            <label className="block mb-2">Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="input-field rounded-md border-black-300 shadow-sm "
            />
            {errors.zipCode && <span className="text-red-500">{errors.zipCode}</span>}
            <br />
            <button
              type="button"
              onClick={navigateToPreviousStep}
              className="btn-primary mr-2  hover:to-blue-600"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={isLastStep}
              onClick={navigateToNextStep}
              className="btn-primary  hover:to-blue-600"
            >
              {isLastStep ? 'Submit' : 'Next'}
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl mb-2">Review Entered Data:</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address Line 1:</strong> {formData.addressLine1}</p>
            <p><strong>Address Line 2:</strong> {formData.addressLine2}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Zip Code:</strong> {formData.zipCode}</p>
            <button
              type="button"
              onClick={navigateToPreviousStep}
              className="btn-primary mr-2  hover:to-blue-600"
            >
              Previous
            </button>
            <button
              type="submit"
              className="btn-primary hover:to-blue-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
