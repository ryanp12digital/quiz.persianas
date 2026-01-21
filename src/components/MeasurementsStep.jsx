import React, { useState } from 'react';

const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    if (phoneNumberLength < 11) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
};

export default function MeasurementsStep({ question, subtext, inputs = [], onNext, onBack, canGoBack, formId, initialValues = {} }) {
    const [inputValues, setInputValues] = useState(() => {
        const initial = {};
        inputs.forEach(input => {
            initial[input.id] = initialValues[input.id] || '';
        });
        return initial;
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e, fieldId, mask) => {
        let value = e.target.value;
        if (mask === 'phone') {
            value = formatPhoneNumber(value);
        }
        setInputValues(prev => ({ ...prev, [fieldId]: value }));
        if (errors[fieldId]) {
            setErrors(prev => ({ ...prev, [fieldId]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        inputs.forEach(input => {
            // Apenas validar campos obrigatórios (required: true ou não especificado)
            const isRequired = input.required !== false;
            if (isRequired) {
                const value = inputValues[input.id];
                if (!value || value.toString().trim() === '') {
                    newErrors[input.id] = 'Este campo é obrigatório.';
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validate()) {
            if (onNext) {
                onNext(inputValues);
            }
        }
    };

    return (
        <div className="step-container relative">
            {canGoBack && (
                <button 
                    onClick={onBack}
                    className="absolute -top-8 sm:-top-12 left-0 flex items-center text-gray-400 hover:text-[#4CAF50] transition-colors group text-sm sm:text-base"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar
                </button>
            )}

            <h2 className="step-title">{question}</h2>
            
            {/* Diagramas de Medidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Medida dentro do vão */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs mb-3">
                        <img 
                            src="/medidas/Medida de dentro do vão.png" 
                            alt="Medida dentro do vão"
                            className="w-full h-auto rounded-lg"
                            onError={(e) => {
                                // Fallback se a imagem não existir
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                        <div style={{ display: 'none' }} className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            Diagrama: Dentro do vão
                        </div>
                    </div>
                    <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 w-full max-w-xs">
                        <p className="text-xs sm:text-sm text-orange-900 font-medium">
                            <strong>Largura:</strong> considerar 1 cm a menos que a janela
                        </p>
                        <p className="text-xs sm:text-sm text-orange-900 font-medium mt-1">
                            <strong>Altura:</strong> mesma medida da janela
                        </p>
                    </div>
                </div>

                {/* Medida fora do vão */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs mb-3">
                        <img 
                            src="/medidas/Medida fora do vão.png" 
                            alt="Medida fora do vão"
                            className="w-full h-auto rounded-lg"
                            onError={(e) => {
                                // Fallback se a imagem não existir
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                        <div style={{ display: 'none' }} className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            Diagrama: Fora do vão
                        </div>
                    </div>
                    <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 w-full max-w-xs">
                        <p className="text-xs sm:text-sm text-orange-900 font-medium">
                            <strong>Largura:</strong> considerar 20cm a mais que a janela
                        </p>
                        <p className="text-xs sm:text-sm text-orange-900 font-medium mt-1">
                            <strong>Altura:</strong> considerar 25cm a mais que a janela
                        </p>
                    </div>
                </div>
            </div>

            {/* Campos de entrada */}
            <form id={formId} onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="w-full mx-auto mb-6 max-w-md">
                <div className="flex flex-wrap gap-4" style={{ height: '300px' }}>
                    {/* Campos de medida (largura e altura) */}
                    {inputs.filter(input => input.id === 'largura' || input.id === 'altura').map((input) => {
                        const isRequired = input.required !== false;
                        
                        return (
                            <div key={input.id} className="text-left flex-1 min-w-[140px]">
                                {input.label && (
                                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                        {input.label} {isRequired && <span className="text-red-500">*</span>}
                                    </label>
                                )}
                                <div className="relative flex items-center">
                                    <input
                                        type={input.type || 'text'}
                                        placeholder={input.placeholder}
                                        className={`w-full p-3 sm:p-4 ${input.suffix ? 'pr-10 sm:pr-12' : ''} border rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all text-sm sm:text-[0.9rem] ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
                                        value={inputValues[input.id] || ''}
                                        onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                        maxLength={input.mask === 'phone' ? 15 : undefined}
                                    />
                                    {input.suffix && (
                                        <span className="absolute right-3 sm:right-4 text-gray-400 font-medium pointer-events-none text-sm sm:text-base">
                                            {input.suffix}
                                        </span>
                                    )}
                                </div>
                                {errors[input.id] && (
                                    <p className="text-red-500 text-xs ml-1 mt-1 animate-fadeIn">{errors[input.id]}</p>
                                )}
                            </div>
                        );
                    })}
                    
                    {/* Aviso amarelo acima do campo de urgência */}
                    {subtext && inputs.some(input => input.id === 'urgencia') && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 w-full mb-0">
                            <p className="text-sm sm:text-base text-amber-800 text-center" style={{ fontSize: '11px' }}>
                                {subtext}
                            </p>
                        </div>
                    )}
                    
                    {/* Outros campos (incluindo Nível de Urgência) */}
                    {inputs.filter(input => input.id !== 'largura' && input.id !== 'altura').map((input) => {
                        const isRequired = input.required !== false;
                        
                        return (
                            <div key={input.id} className="text-left w-full">
                                {input.label && (
                                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                        {input.label} {isRequired && <span className="text-red-500">*</span>}
                                    </label>
                                )}
                                <div className="relative flex items-center">
                                    {input.type === 'select' ? (
                                        <select
                                            className={`w-full p-3 sm:p-4 border rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all text-sm sm:text-[0.9rem] bg-white ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
                                            value={inputValues[input.id] || ''}
                                            onChange={(e) => handleInputChange(e, input.id)}
                                        >
                                            <option value="">Selecione...</option>
                                            {input.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <>
                                            <input
                                                type={input.type || 'text'}
                                                placeholder={input.placeholder}
                                                className={`w-full p-3 sm:p-4 ${input.suffix ? 'pr-10 sm:pr-12' : ''} border rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all text-sm sm:text-[0.9rem] ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
                                                value={inputValues[input.id] || ''}
                                                onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                                maxLength={input.mask === 'phone' ? 15 : undefined}
                                            />
                                            {input.suffix && (
                                                <span className="absolute right-3 sm:right-4 text-gray-400 font-medium pointer-events-none text-sm sm:text-base">
                                                    {input.suffix}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                                {errors[input.id] && (
                                    <p className="text-red-500 text-xs ml-1 mt-1 animate-fadeIn">{errors[input.id]}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </form>

            {/* Botão Continuar */}
            <div className="mt-6 sm:mt-8">
                <button onClick={handleNext} className="bg-[#4CAF50] text-white font-bold py-2.5 px-8 sm:py-3 sm:px-10 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:-translate-y-1 text-sm sm:text-base">
                    Continuar
                </button>
            </div>

            {/* Seção Instalações mais comuns */}
            <div className="mt-8 sm:mt-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center">Instalações mais comuns:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Dentro do vão */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Dentro do vão</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana Rolo</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Horizontal de Alumínio</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Horizontal de Madeira</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana de Teto</span>
                        </div>
                    </div>

                    {/* Fora do vão */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Fora do vão</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana Painel</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana Vertical</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Cortina</span>
                        </div>
                    </div>

                    {/* Ambos */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Ambos</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana Romana</span>
                            <span className="bg-black text-white text-xs px-3 py-1.5 rounded-md">Persiana Double Vision</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
