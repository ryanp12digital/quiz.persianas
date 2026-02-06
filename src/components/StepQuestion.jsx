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

export default function StepQuestion({ question, subtext, options = [], inputs = [], type = 'radio', onOptionSelect, onNext, onBack, canGoBack, formId, initialValues = {}, selectedValue = null, stepId = null }) {
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
                <form id={formId} onSubmit={(e) => { e.preventDefault(); handleNext(); }} className={`w-full mx-auto mb-8 min-w-0 ${type === 'textarea' ? 'max-w-3xl' : 'max-w-lg'}`}>
                    <div className={type === 'textarea' ? 'flex flex-col gap-5' : 'flex flex-col gap-5'}>
                        {/* Agrupamento lógico para captura: nome+whatsapp | email+cidade+bairro | ambientes */}
                        {type === 'mixed' && inputs.some(i => i.id === 'nome') ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {inputs.filter(i => i.id === 'nome' || i.id === 'whatsapp').map((input) => (
                                        <div key={input.id} className="text-left w-full min-w-0">
                                            {input.label && (
                                                <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800 mb-2">
                                                    {input.label} {input.required !== false && <span className="text-red-500">*</span>}
                                                </label>
                                            )}
                                            <div className="relative flex items-center">
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
                                                    <span className="absolute right-4 text-gray-500 font-medium pointer-events-none text-sm">{input.suffix}</span>
                                                )}
                                            </div>
                                            {errors[input.id] && <p className="text-red-500 text-xs mt-2 font-medium">{errors[input.id]}</p>}
                                        </div>
                                    ))}
                                </div>
                                {inputs.filter(i => ['email', 'cidade', 'bairro'].includes(i.id)).length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {inputs.filter(i => ['email', 'cidade', 'bairro'].includes(i.id)).map((input) => (
                                            <div key={input.id} className="text-left w-full min-w-0">
                                                {input.label && (
                                                    <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800 mb-2">
                                                        {input.label} {input.required !== false && <span className="text-red-500">*</span>}
                                                    </label>
                                                )}
                                                <input
                                                    id={input.id}
                                                    name={input.id}
                                                    type={input.type || 'text'}
                                                    placeholder={input.placeholder}
                                                    className={`w-full p-4 sm:py-4 sm:px-5 border-2 rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all text-base ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                                    value={inputValues[input.id] || ''}
                                                    onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                                />
                                                {errors[input.id] && <p className="text-red-500 text-xs mt-2 font-medium">{errors[input.id]}</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {inputs.filter(i => i.type === 'multi-select').map((input) => (
                                    <div key={input.id} className="text-left w-full">
                                        <label htmlFor={`${input.id}-select`} className="block text-sm font-semibold text-gray-800 mb-2">
                                            {input.label} {input.required !== false && <span className="text-red-500">*</span>}
                                        </label>
                                        <p className="text-xs text-gray-500 mb-2">Selecione um ou mais ambientes</p>
                                        <div className={`w-full p-4 border-2 rounded-2xl bg-white min-h-[64px] flex flex-wrap items-center gap-2 ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            {(inputValues[input.id] || []).map(item => (
                                                <span key={item} className="bg-[#4CAF50]/15 text-[#4CAF50] text-sm px-3 py-1.5 rounded-xl flex items-center gap-2 font-medium">
                                                    {item}
                                                    <button type="button" onClick={() => removeMultiSelectItem(input.id, item)} className="text-gray-500 hover:text-red-500 font-bold leading-none focus:outline-none" aria-label="Remover">&times;</button>
                                                </span>
                                            ))}
                                            <select
                                                id={`${input.id}-select`}
                                                name={input.id}
                                                className="grow min-w-[180px] p-2 bg-transparent outline-none text-base cursor-pointer border-none"
                                                onChange={(e) => handleMultiSelectChange(e, input.id)}
                                                value=""
                                            >
                                                <option value="" disabled>{inputValues[input.id]?.length > 0 ? "Adicionar outro ambiente..." : input.placeholder}</option>
                                                {input.options.filter(opt => !(inputValues[input.id] || []).includes(opt)).map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors[input.id] && <p className="text-red-500 text-xs mt-2 font-medium">{errors[input.id]}</p>}
                                    </div>
                                ))}
                            </>
                        ) : (
                            inputs.map((input) => {
                                const isTextarea = input.type === 'textarea';
                                const inputClasses = `w-full p-4 sm:py-4 sm:px-5 border-2 rounded-2xl focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all text-base ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`;
                                return (
                                    <div key={input.id} className="text-left w-full min-w-0">
                                        {input.label && (
                                            <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800 mb-2">
                                                {input.label} {input.required !== false && <span className="text-red-500">*</span>}
                                            </label>
                                        )}
                                        <div className="relative flex items-center">
                                            {input.type === 'select' ? (
                                                <select
                                                    id={input.id}
                                                    name={input.id}
                                                    className={inputClasses + ' bg-white'}
                                                    value={inputValues[input.id] || ''}
                                                    onChange={(e) => handleInputChange(e, input.id)}
                                                >
                                                    <option value="">Selecione...</option>
                                                    {input.options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : input.type === 'multi-select' ? (
                                                <div className={`w-full p-4 border-2 rounded-2xl bg-white min-h-[64px] flex flex-wrap items-center gap-2 ${errors[input.id] ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}>
                                                    {(inputValues[input.id] || []).map(item => (
                                                        <span key={item} className="bg-[#4CAF50]/15 text-[#4CAF50] text-sm px-3 py-1.5 rounded-xl flex items-center gap-2 font-medium">
                                                            {item}
                                                            <button type="button" onClick={() => removeMultiSelectItem(input.id, item)} className="hover:text-red-500 font-bold leading-none">&times;</button>
                                                        </span>
                                                    ))}
                                                    <select
                                                        className="grow min-w-[150px] p-2 bg-transparent outline-none cursor-pointer"
                                                        onChange={(e) => handleMultiSelectChange(e, input.id)}
                                                        value=""
                                                    >
                                                        <option value="" disabled>{inputValues[input.id]?.length > 0 ? "Adicionar outro..." : input.placeholder}</option>
                                                        {input.options.filter(opt => !(inputValues[input.id] || []).includes(opt)).map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : isTextarea ? (
                                                <textarea
                                                    id={input.id}
                                                    name={input.id}
                                                    placeholder={input.placeholder}
                                                    rows={10}
                                                    className={inputClasses + ' resize-none min-h-[140px]'}
                                                    value={inputValues[input.id] || ''}
                                                    onChange={(e) => handleInputChange(e, input.id)}
                                                />
                                            ) : (
                                                <>
                                                    <input
                                                        id={input.id}
                                                        name={input.id}
                                                        type={input.type || 'text'}
                                                        placeholder={input.placeholder}
                                                        className={inputClasses + (input.suffix ? ' pr-14' : '')}
                                                        value={inputValues[input.id] || ''}
                                                        onChange={(e) => handleInputChange(e, input.id, input.mask)}
                                                        maxLength={input.mask === 'phone' ? 15 : undefined}
                                                    />
                                                    {input.suffix && <span className="absolute right-4 text-gray-500 font-medium pointer-events-none text-sm">{input.suffix}</span>}
                                                </>
                                            )}
                                        </div>
                                        {errors[input.id] && <p className="text-red-500 text-xs mt-2 font-medium">{errors[input.id]}</p>}
                                    </div>
                                );
                            })
                        )}
                    </div>
                    
                    {type === 'textarea' && (
                        <div className="mt-6">
                            <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-[#4CAF50] text-white font-bold py-4 px-10 rounded-2xl shadow-md hover:bg-green-600 hover:shadow-lg active:scale-[0.98] transition-all text-base">
                                Continuar
                            </button>
                        </div>
                    )}
                    
                    {type === 'textarea' && (
                        <div className="mt-8 pt-6 border-t-2 border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-4 text-center">Referência rápida</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Modelos</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Rolo', 'Double Vision', 'Romana', 'Horizontal Madeira', 'Horizontal Alumínio', 'Vertical', 'Teto', 'Painel', 'Cortina'].map(m => (
                                            <span key={m} className="text-xs text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{m}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Tipos de tecido</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Blackout', 'Semi Blackout', 'Translúcido', 'Tela Solar 1/3/5%', 'Decorativo', 'Outros'].map(t => (
                                            <span key={t} className="text-xs text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            )}

            <div className={`gap-2 sm:gap-4 w-full max-w-2xl mx-auto ${stepId && (stepId === 'passo_4_modelo' || stepId.startsWith('passo_4_tecido') || stepId === 'passo_4_acabamento_cortina' || stepId === 'passo_3_acionamento') ? 'grid grid-cols-1 sm:grid-cols-2' : 'grid grid-cols-2'}`}>
                {options.map((option, index) => {
                    const isSelected = selectedValue === option.value;
                    const isModeloStep = stepId === 'passo_4_modelo';
                    const isTecidoOrAcabamento = stepId && (stepId.startsWith('passo_4_tecido') || stepId === 'passo_4_acabamento_cortina' || stepId === 'passo_3_acionamento');
                    return (
                    <button
                        key={index}
                        onClick={() => onOptionSelect(option)}
                        className={`group relative bg-white border rounded-2xl p-3 sm:p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95 text-xs sm:text-[0.9rem] font-medium w-full min-w-0 ${
                            isSelected 
                                ? 'border-[#4CAF50] bg-green-50 shadow-md' 
                                : 'border-gray-200 hover:border-[#4CAF50] text-gray-800'
                        } ${isModeloStep ? 'flex flex-col items-center justify-center text-center' : isTecidoOrAcabamento ? (option.image ? 'grid grid-cols-[minmax(72px,28%)_1fr] gap-3 sm:gap-4 items-center text-left' : 'flex flex-col justify-center text-left') : 'flex flex-col items-center justify-center text-center'}`}
                    >
                        {isModeloStep ? (
                            <>
                                {option.image && (
                                    <div className="w-full h-24 sm:h-40 mb-2 sm:mb-4 overflow-hidden rounded-xl bg-white">
                                        <img src={encodeURI(option.image)} alt={option.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                                <span className="font-bold mb-1">{option.label}</span>
                                {option.description && (
                                    <span className="text-xs sm:text-sm text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                )}
                            </>
                        ) : isTecidoOrAcabamento ? (
                            option.image ? (
                            <>
                                <div className="min-w-0 flex items-center justify-center overflow-hidden rounded-lg bg-white h-24 sm:h-32">
                                    <img src={encodeURI(option.image)} alt={option.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                                <div className="min-w-0 flex flex-col justify-center gap-0.5">
                                    <span className="font-bold">{option.label}</span>
                                    {option.description && (
                                        <span className="text-xs sm:text-sm text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                    )}
                                </div>
                            </>
                            ) : (
                            <div className="min-w-0 flex flex-col justify-center gap-0.5">
                                <span className="font-bold">{option.label}</span>
                                {option.description && (
                                    <span className="text-xs sm:text-sm text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                )}
                            </div>
                            )
                        ) : (
                            <>
                                {option.image && (
                                    <div className="w-full h-24 sm:h-40 mb-2 sm:mb-4 overflow-hidden rounded-xl bg-white">
                                        <img src={encodeURI(option.image)} alt={option.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                                <span className="font-bold mb-1">{option.label}</span>
                                {option.description && (
                                    <span className="text-xs sm:text-sm text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                )}
                            </>
                        )}
                    </button>
                    );
                })}
            </div>

            {(inputs.length > 0 || type === 'mixed') && !(type === 'textarea') && (
                <div className="mt-6 sm:mt-8">
                    <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-[#4CAF50] text-white font-bold py-4 px-10 rounded-2xl shadow-md hover:bg-green-600 hover:shadow-lg active:scale-[0.98] transition-all text-base">
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
}
