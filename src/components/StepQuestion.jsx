import React, { useState, useEffect } from 'react';
import MeasurementsStep from './MeasurementsStep';

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

export default function StepQuestion({ question, subtext, options = [], inputs = [], type = 'radio', onOptionSelect, onNext, onBack, canGoBack, formId, initialValues = {}, selectedValue = null }) {
    const [inputValues, setInputValues] = useState(() => {
        const initial = {};
        inputs.forEach(input => {
            initial[input.id] = initialValues[input.id] || '';
        });
        return initial;
    });
    const [errors, setErrors] = useState({});

    // Atualizar valores quando initialValues mudar
    useEffect(() => {
        if (Object.keys(initialValues).length > 0) {
            setInputValues(prev => {
                const updated = { ...prev };
                inputs.forEach(input => {
                    if (initialValues[input.id] !== undefined) {
                        updated[input.id] = initialValues[input.id];
                    }
                });
                return updated;
            });
        }
    }, [initialValues]);

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

    const handleMultiSelectChange = (e, fieldId) => {
        const value = e.target.value;
        if (!value) return;

        setInputValues(prev => {
            const currentValues = prev[fieldId] || [];
            if (!currentValues.includes(value)) {
                return { ...prev, [fieldId]: [...currentValues, value] };
            }
            return prev;
        });

        if (errors[fieldId]) {
            setErrors(prev => ({ ...prev, [fieldId]: null }));
        }
        e.target.value = "";
    };

    const removeMultiSelectItem = (fieldId, itemToRemove) => {
        setInputValues(prev => {
            const currentValues = prev[fieldId] || [];
            return { ...prev, [fieldId]: currentValues.filter(item => item !== itemToRemove) };
        });
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        inputs.forEach(input => {
            // Apenas validar campos obrigatórios (required: true ou não especificado)
            const isRequired = input.required !== false;
            if (!isRequired) return; // Pular validação para campos opcionais

            const value = inputValues[input.id];
            const isMultiSelect = input.type === 'multi-select';

            if (isMultiSelect) {
                if (!value || value.length === 0) {
                    newErrors[input.id] = 'Selecione pelo menos uma opção.';
                    isValid = false;
                }
            } else {
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

    // Se for tipo medidas, usar componente especial
    if (type === 'medidas') {
        return (
            <MeasurementsStep
                question={question}
                subtext={subtext}
                inputs={inputs}
                onNext={onNext}
                onBack={onBack}
                canGoBack={canGoBack}
                formId={formId}
                initialValues={initialValues}
            />
        );
    }

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

            <h2 className="step-title" dangerouslySetInnerHTML={{ __html: question }} />
            {subtext && (
                <div className={`step-subtext ${subtext.startsWith('*') ? 'text-amber-600 font-medium italic text-sm bg-amber-50 p-4 rounded-2xl border border-amber-100 text-left' : type === 'textarea' ? 'text-left mb-4' : ''}`}>
                    {type === 'textarea' && subtext.includes('Ex:') ? (
                        <div className="text-gray-600 text-sm flex flex-col justify-start items-center">
                            <span className="font-medium">Ex:</span>
                            {subtext.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <div key={idx} className="mt-1">{line.replace('Ex:', '').trim()}</div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">{subtext}</p>
                    )}
                </div>
            )}

            {inputs.length > 0 && (
                <form id={formId} onSubmit={(e) => { e.preventDefault(); handleNext(); }} className={`w-full mx-auto mb-8 ${type === 'textarea' ? 'max-w-3xl' : 'max-w-md'}`}>
                    <div className={`flex flex-wrap gap-4 ${type === 'textarea' ? 'flex-col' : ''}`}>
                        {inputs.map((input) => {
                            const isMeasurement = input.id === 'largura' || input.id === 'altura';
                            const isTextarea = input.type === 'textarea';
                            
                            return (
                                <div key={input.id} className={`text-left ${isMeasurement ? 'flex-1 min-w-[140px]' : 'w-full'}`}>
                                    {input.label && (
                                        <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                            {input.label} {input.required !== false && <span className="text-red-500">*</span>}
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
                                        ) : input.type === 'multi-select' ? (
                                            <div className={`w-full p-2 border rounded-2xl bg-white min-h-[56px] flex flex-wrap items-center gap-2 relative ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}>
                                                {(inputValues[input.id] || []).map(item => (
                                                    <span key={item} className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-2 animate-fadeIn">
                                                        {item}
                                                        <button type="button" onClick={() => removeMultiSelectItem(input.id, item)} className="text-gray-500 hover:text-red-500 font-bold leading-none focus:outline-none">&times;</button>
                                                    </span>
                                                ))}
                                                <select
                                                    className="grow p-2 bg-transparent outline-none text-[0.9rem] min-w-[150px] cursor-pointer"
                                                    onChange={(e) => handleMultiSelectChange(e, input.id)}
                                                    value=""
                                                >
                                                    <option value="" disabled>{inputValues[input.id] && inputValues[input.id].length > 0 ? "Adicionar outro..." : input.placeholder}</option>
                                                    {input.options.filter(opt => !(inputValues[input.id] || []).includes(opt)).map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : isTextarea ? (
                                            <textarea
                                                placeholder={input.placeholder}
                                                rows={8}
                                                className={`w-full p-3 sm:p-4 border rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all text-sm sm:text-[0.9rem] resize-none ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
                                                value={inputValues[input.id] || ''}
                                                onChange={(e) => handleInputChange(e, input.id)}
                                            />
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
                    
                    {/* Botão Continuar logo abaixo do campo (textarea) */}
                    {type === 'textarea' && (
                        <div className="mt-6">
                            <button type="button" onClick={handleNext} className="bg-[#4CAF50] text-white font-bold py-2.5 px-8 sm:py-3 sm:px-10 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:-translate-y-1 text-sm sm:text-base">
                                Continuar
                            </button>
                        </div>
                    )}
                    
                    {/* Guias minimalistas para textarea */}
                    {type === 'textarea' && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">Modelos disponíveis:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Rolo</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Double Vision</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Romana</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Horizontal de Madeira</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Horizontal de Alumínio</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Vertical</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Teto</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Painel</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Cortina</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">Tipos:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Blackout: Bloqueio 100%</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Semi Blackout</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Translúcido</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Tela Solar 1%</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Tela Solar 3%</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Tela Solar 5%</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Decorativo</span>
                                        <span className="text-[10px] text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">Outros</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            )}

            <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-2xl mx-auto">
                {options.map((option, index) => {
                    const isSelected = selectedValue === option.value;
                    return (
                    <button
                        key={index}
                        onClick={() => onOptionSelect(option)}
                        className={`group relative bg-white border rounded-2xl p-3 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95 text-xs sm:text-[0.9rem] font-medium ${
                            isSelected 
                                ? 'border-[#4CAF50] bg-green-50 shadow-md' 
                                : 'border-gray-200 hover:border-[#4CAF50] text-gray-800'
                        }`}
                    >
                        {option.image && (
                            <div className="w-full h-24 sm:h-40 mb-2 sm:mb-4 overflow-hidden rounded-xl bg-gray-50">
                                <img 
                                    src={option.image} 
                                    alt={option.label} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                        <span className="font-bold mb-1">{option.label}</span>
                        {option.description && (
                            <span className="text-[10px] sm:text-xs text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>
                                {option.description}
                            </span>
                        )}
                    </button>
                    );
                })}
            </div>

            {(inputs.length > 0 || type === 'mixed') && !(type === 'textarea') && (
                <div className="mt-6 sm:mt-8">
                    <button onClick={handleNext} className="bg-[#4CAF50] text-white font-bold py-2.5 px-8 sm:py-3 sm:px-10 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:-translate-y-1 text-sm sm:text-base">
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
}
