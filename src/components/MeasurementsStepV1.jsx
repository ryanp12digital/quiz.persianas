import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import PrecoInfo from './PrecoInfo';
import { Button } from './ui/button';

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

const scrollToTop = () => {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default function MeasurementsStepV1({ question, subtext, inputs = [], onNext, onBack, canGoBack, formId, initialValues = {} }) {
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
            const isRequired = input.required !== false;
            if (isRequired) {
                const value = inputValues[input.id];
                if (!value || value.toString().trim() === '') {
                    newErrors[input.id] = 'Por favor, preencha este campo.';
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validate()) {
            scrollToTop();
            if (onNext) {
                onNext(inputValues);
            }
        }
    };

    return (
        <div className={`step-container relative ${canGoBack ? 'pt-14 sm:pt-12' : ''}`}>
            {canGoBack && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { scrollToTop(); onBack(); }}
                    className="absolute top-4 sm:top-4 left-0 flex items-center text-gray-400 hover:text-[#4CAF50]"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" strokeWidth={2} />
                    Voltar
                </Button>
            )}

            <h2 className="step-title mb-2">{question}</h2>

            {/* PrecoInfo — texto de pré-orçamento */}
            <PrecoInfo variant="accordion" />

            {/* Legenda de confiança */}
            <p className="text-sm text-gray-600 mb-4 sm:mb-6 text-center">
                Não se preocupe, validaremos cada centímetro na visita técnica.
            </p>
            
            {/* Diagramas de Medidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-8">
                {/* Medida dentro do vão */}
                <div className="flex flex-col items-center bg-white rounded-2xl border-2 border-orange-100 p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-orange-800 mb-3 w-full text-center">Dentro do vão</h3>
                    <div className="w-full max-w-xs mb-4 rounded-xl overflow-hidden bg-gray-50">
                        <img 
                            src="/medidas/medida-dentro-vao.png" 
                            alt="Medida dentro do vão"
                            className="w-full h-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                        <div style={{ display: 'none' }} className="w-full h-48 flex items-center justify-center text-gray-400 text-sm">
                            Diagrama: Dentro do vão
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 w-full max-w-xs">
                        <p className="text-xs sm:text-sm text-orange-900 font-medium leading-relaxed">
                            <strong>Largura:</strong> 1 cm a menos que a janela
                        </p>
                        <p className="text-xs sm:text-sm text-orange-900 font-medium mt-2 leading-relaxed">
                            <strong>Altura:</strong> mesma medida da janela
                        </p>
                    </div>
                </div>

                {/* Medida fora do vão */}
                <div className="flex flex-col items-center bg-white rounded-2xl border-2 border-orange-100 p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-orange-800 mb-3 w-full text-center">Fora do vão</h3>
                    <div className="w-full max-w-xs mb-4 rounded-xl overflow-hidden bg-gray-50">
                        <img 
                            src="/medidas/medida-fora-vao.png" 
                            alt="Medida fora do vão"
                            className="w-full h-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                        <div style={{ display: 'none' }} className="w-full h-48 flex items-center justify-center text-gray-400 text-sm">
                            Diagrama: Fora do vão
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 w-full max-w-xs">
                        <p className="text-xs sm:text-sm text-orange-900 font-medium leading-relaxed">
                            <strong>Largura:</strong> 20 cm a mais que a janela
                        </p>
                        <p className="text-xs sm:text-sm text-orange-900 font-medium mt-2 leading-relaxed">
                            <strong>Altura:</strong> 25 cm a mais que a janela
                        </p>
                    </div>
                </div>
            </div>

            {/* Campos de entrada */}
            <form id={formId} onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="w-full mx-auto max-w-md min-w-0">
                <div className="flex flex-col gap-6">
                    {/* Campos de medida (largura e altura) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {inputs.filter(input => input.id === 'largura' || input.id === 'altura').map((input) => {
                            const isRequired = input.required !== false;
                            const measureSuffix = 'm';
                            const measurePlaceholder = 'Ex: 1,50';

                            return (
                                <div key={input.id} className="text-left w-full min-w-0">
                                    {input.label && (
                                        <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800 mb-2">
                                            {input.label} {isRequired && <span className="text-red-500">*</span>}
                                        </label>
                                    )}
                                    <div className="relative flex items-center">
                                        <input
                                            id={input.id}
                                            name={input.id}
                                            type={input.type || 'text'}
                                            placeholder={measurePlaceholder}
                                            aria-label={input.label}
                                            className={`w-full p-4 sm:py-4 sm:px-5 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all text-base ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                            value={inputValues[input.id] || ''}
                                            onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                            maxLength={input.mask === 'phone' ? 15 : undefined}
                                        />
                                        <span className="absolute right-4 text-gray-500 font-medium pointer-events-none text-sm">
                                            {measureSuffix}
                                        </span>
                                    </div>
                                    {errors[input.id] && (
                                        <p className="text-red-500 text-xs mt-2 font-medium animate-fadeIn">{errors[input.id]}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Aviso amarelo melhorado */}
                    {subtext && (
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
                            <p className="text-sm text-amber-900 text-center leading-relaxed">
                                {subtext}
                            </p>
                        </div>
                    )}

                    {/* Outros campos */}
                    {inputs.filter(input => input.id !== 'largura' && input.id !== 'altura').map((input) => {
                        const isRequired = input.required !== false;
                        
                        return (
                            <div key={input.id} className="text-left w-full">
                                {input.label && (
                                    <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800 mb-2">
                                        {input.label} {isRequired && <span className="text-red-500">*</span>}
                                    </label>
                                )}
                                <div className="relative flex items-center">
                                    {input.type === 'select' ? (
                                        <select
                                            id={input.id}
                                            name={input.id}
                                            className={`w-full p-4 sm:py-4 sm:px-5 border-2 rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all text-base bg-white ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
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
                                                id={input.id}
                                                name={input.id}
                                                type={input.type || 'text'}
                                                placeholder={input.placeholder}
                                                className={`w-full p-4 sm:py-4 sm:px-5 ${input.suffix ? 'pr-14' : ''} border-2 rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all text-base ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                                value={inputValues[input.id] || ''}
                                                onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                                maxLength={input.mask === 'phone' ? 15 : undefined}
                                            />
                                            {input.suffix && (
                                                <span className="absolute right-4 text-gray-500 font-medium pointer-events-none text-sm">
                                                    {input.suffix}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                                {errors[input.id] && (
                                    <p className="text-red-500 text-xs mt-2 font-medium animate-fadeIn">{errors[input.id]}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <Button type="button" onClick={handleNext} size="lg" className="w-full sm:w-auto">
                        Continuar
                    </Button>
                </div>
            </form>

            {/* Seção Instalações mais comuns */}
            <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4 text-center uppercase tracking-wider">Instalações mais comuns</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Dentro do vão</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Persiana Rolô</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Horizontal Alumínio</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Horizontal Madeira</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Persiana de Teto</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Fora do vão</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Persiana Painel</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Persiana Vertical</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Cortina</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Ambos</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Persiana Romana</span>
                            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">Double Vision</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
