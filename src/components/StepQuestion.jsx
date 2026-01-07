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

export default function StepQuestion({ question, subtext, options = [], inputs = [], type = 'radio', onOptionSelect, onNext }) {
    const [inputValues, setInputValues] = useState({});
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

    return (
        <div className="step-container">
            <h2 className="step-title">{question}</h2>
            {subtext && <p className="step-subtext">{subtext}</p>}

            {inputs.length > 0 && (
                <div className="w-full max-w-md mx-auto mb-8 flex flex-col gap-4">
                    {inputs.map((input) => (
                        <div key={input.id} className="text-left w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                {input.label} <span className="text-red-500">*</span>
                            </label>

                            <div className="relative flex items-center">
                                {input.type === 'select' ? (
                                    <select
                                        className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[0.9rem] bg-white ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
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
                                                <button onClick={() => removeMultiSelectItem(input.id, item)} className="text-gray-500 hover:text-red-500 font-bold leading-none focus:outline-none">&times;</button>
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
                                ) : (
                                    <>
                                        <input
                                            type={input.type || 'text'}
                                            placeholder={input.placeholder}
                                            className={`w-full p-4 ${input.suffix ? 'pr-12' : ''} border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-[0.9rem] ${errors[input.id] ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300'}`}
                                            value={inputValues[input.id] || ''}
                                            onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                            maxLength={input.mask === 'phone' ? 15 : undefined}
                                        />
                                        {input.suffix && (
                                            <span className="absolute right-4 text-gray-400 font-medium pointer-events-none">
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
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onOptionSelect(option)}
                        className="group relative bg-white border border-gray-200 rounded-2xl p-6 min-h-[100px] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-black active:scale-95 text-[0.9rem] font-medium text-gray-800"
                    >
                        <span className="font-bold mb-1">{option.label}</span>
                        {option.description && (
                            <span className="text-xs text-gray-500 font-normal leading-tight">
                                {option.description}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {(inputs.length > 0 || type === 'mixed') && (
                <div className="mt-8">
                    <button onClick={handleNext} className="bg-[#4CAF50] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
}
