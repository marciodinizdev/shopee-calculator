// src/app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [productPrice, setProductPrice] = useState('');
  const [shippingType, setShippingType] = useState<'buyer' | 'free'>('buyer');
  type FeeDetails =
  | {
      price: string;
      percentageFee: string;
      fixedFee: string;
      totalFees: string;
      netAmount: string;
      shippingType: string;
      type: 'success';
    }
  | {
      message: string;
      type: 'error' | 'info';
    };

const [feeDetails, setFeeDetails] = useState<FeeDetails | null>(null);

  const calculateFees = () => {
    const price = parseFloat(productPrice);

    if (isNaN(price) || price <= 0) {
      setFeeDetails({
        message: 'Por favor, insira um preço de produto válido e maior que zero.',
        type: 'error'
      });
      return;
    }

    if (price < 19.00) {
      setFeeDetails({
        message: 'Para produtos abaixo de R$ 19,00, as taxas específicas não se aplicam.',
        type: 'info'
      });
      return;
    }

    const totalFeePercentage = shippingType === 'free' ? 0.14 + 0.06 : 0.14;
    const fixedFee = 4.00;
    const percentageFee = price * totalFeePercentage;
    const totalFees = percentageFee + fixedFee;
    const netAmount = price - totalFees;

    setFeeDetails({
      price: price.toFixed(2),
      percentageFee: percentageFee.toFixed(2),
      fixedFee: fixedFee.toFixed(2),
      totalFees: totalFees.toFixed(2),
      netAmount: netAmount.toFixed(2),
      shippingType: shippingType === 'free' ? 'Frete Grátis' : 'Frete para o Comprador',
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Calculadora de Taxas Shopee
        </h1>

        <div className="mb-5">
          <label htmlFor="productPrice" className="block text-gray-700 text-sm font-semibold mb-2">
            Preço do Produto (R$)
          </label>
          <input
            type="number"
            id="productPrice"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
            placeholder="Ex: 100.00"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Tipo de Frete
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-purple-600"
                name="shippingType"
                value="buyer"
                checked={shippingType === 'buyer'}
                onChange={() => setShippingType('buyer')}
              />
              <span className="ml-2 text-gray-800">Comprador Paga</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-purple-600"
                name="shippingType"
                value="free"
                checked={shippingType === 'free'}
                onChange={() => setShippingType('free')}
              />
              <span className="ml-2 text-gray-800">Frete Grátis</span>
            </label>
          </div>
        </div>

        <button
          onClick={calculateFees}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
        >
          Calcular Taxas
        </button>

        {feeDetails && (
          <div
            className={`mt-6 p-5 rounded-lg border-l-4 ${
              feeDetails.type === 'error'
                ? 'bg-red-100 border-red-500 text-red-800'
                : feeDetails.type === 'info'
                ? 'bg-blue-100 border-blue-500 text-blue-800'
                : 'bg-green-100 border-green-500 text-green-800'
            } transition-all duration-300 ease-in-out`}
          >
            {feeDetails.type !== 'success' ? (
              <p className="font-semibold text-lg">{feeDetails.message}</p>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-3">Detalhes do Cálculo:</h2>
                <p className="mb-1">
                  <span className="font-semibold">Preço do Produto:</span> R$ {feeDetails.price}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Tipo de Frete:</span> {feeDetails.shippingType}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Taxa Percentual:</span> R$ {feeDetails.percentageFee}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Taxa Fixa:</span> R$ {feeDetails.fixedFee}
                </p>
                <p className="text-lg font-bold mt-2">
                  <span className="text-purple-700">Total de Taxas:</span> R$ {feeDetails.totalFees}
                </p>
                <p className="text-xl font-bold mt-3">
                  <span className="text-purple-900">Valor Líquido:</span> R$ {feeDetails.netAmount}
                </p>
              </>
            )}
          </div>
        )}

        <p className="text-gray-600 text-xs text-center mt-6">
          *Válido para produtos acima de R$ 19,00.
        </p>
      </div>
    </div>
  );
}
