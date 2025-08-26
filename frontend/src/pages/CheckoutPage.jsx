import React, { useState } from 'react';
import PersonalDetails from '../components/checkout/PersonalDetails';
import ShippingAddress from '../components/checkout/ShippingAddress';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';

const STEPS = {
  DETAILS: 1,
  SHIPPING: 2,
  PAYMENT: 3,
  SUMMARY: 4,
};

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.DETAILS);
  const [checkoutData, setCheckoutData] = useState({
    personal: {},
    shipping: {},
    payment: {},
  });
  const navigate = useNavigate();

  const handleNext = (data) => {
    if (currentStep === STEPS.DETAILS) {
      setCheckoutData({ ...checkoutData, personal: data });
      setCurrentStep(STEPS.SHIPPING);
    } else if (currentStep === STEPS.SHIPPING) {
      setCheckoutData({ ...checkoutData, shipping: data });
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT) {
      setCheckoutData({ ...checkoutData, payment: data });
      setCurrentStep(STEPS.SUMMARY);
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.DETAILS) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleConfirmedFromServer = (serverOrder) => {
    navigate('/order-confirmation', { state: { order: { ...checkoutData, id: serverOrder?.id } } });
  };


  const renderStep = () => {
    switch (currentStep) {
      case STEPS.DETAILS:
        return <PersonalDetails onNext={handleNext} />;
      case STEPS.SHIPPING:
        return <ShippingAddress onNext={handleNext} onBack={handleBack} />;
      case STEPS.PAYMENT:
        return <PaymentMethod onNext={handleNext} onBack={handleBack} />;
      case STEPS.SUMMARY:
        return <OrderSummary data={checkoutData} onBack={handleBack} onConfirmed={handleConfirmedFromServer} />;
      default:
        return <PersonalDetails onNext={handleNext} />;
    }
  };

  const stepTitles = ['Personal Details', 'Shipping Address', 'Payment', 'Summary'];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Checkout
        </h1>
        
        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {stepTitles.map((title, index) => (
                    <React.Fragment key={index}>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                {index + 1}
                            </div>
                            <p className={`ml-2 ${index + 1 <= currentStep ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>{title}</p>
                        </div>
                        {index < stepTitles.length - 1 && <div className="flex-1 h-1 bg-gray-300 mx-4"></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
