import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import MeasurementsStepV1 from './MeasurementsStepV1';
import TrustBadges from './TrustBadges';
import PrecoInfo from './PrecoInfo';
import { Card } from './ui/card';
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

const getImageSrc = (path) => {
    if (!path) return '';
    if (typeof window === 'undefined') {
        const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
        return `${base}${path.startsWith('/') ? path : '/' + path}`;
    }
    return new URL(path.startsWith('/') ? path : '/' + path, window.location.origin).href;
};

const scrollToTop = () => {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default function StepQuestionV1({ question, subtext, options = [], inputs = [], type = 'radio', onOptionSelect, onNext, onBack, canGoBack, formId, initialValues = {}, selectedValue = null, stepId = null, tecidoExpandableLimit = 4 }) {
    const [inputValues, setInputValues] = useState(() => {
        const initial = {};
        inputs.forEach(input => {
            initial[input.id] = initialValues[input.id] || '';
        });
        return initial;
    });
    const [errors, setErrors] = useState({});
    const [tecidoExpanded, setTecidoExpanded] = useState(false);

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
            const isRequired = input.required !== false;
            if (!isRequired) return;

            const value = inputValues[input.id];
            const isMultiSelect = input.type === 'multi-select';

            if (isMultiSelect) {
                if (!value || value.length === 0) {
                    newErrors[input.id] = 'Selecione pelo menos uma opção.';
                    isValid = false;
                }
            } else {
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

    // Se for tipo medidas, usar componente especial V1
    if (type === 'medidas') {
        return (
            <MeasurementsStepV1
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

    // Verificar se acionamento não tem opção automática
    const hasOnlyManual = stepId === 'passo_3_acionamento' && options.length > 0 && 
        !options.some(opt => opt.value === 'motorizada' || opt.label.toLowerCase().includes('motorizada'));

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

            <h2 className="step-title mb-3 sm:mb-4" dangerouslySetInnerHTML={{ __html: question }} />
            
            {/* Microcopy de benefício para modelo */}
            {stepId === 'passo_4_modelo' && (
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 text-center">
                    Escolha o que combina com seu ambiente
                </p>
            )}

            {/* Microcopy para acionamento sem automática */}
            {hasOnlyManual && (
                <Card className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border-blue-200 rounded-xl border-2">
                    <p className="text-sm text-blue-800 text-center leading-relaxed">
                        Este modelo está disponível exclusivamente no acionamento manual — mantendo a durabilidade original.
                    </p>
                </Card>
            )}

            {subtext && stepId !== 'passo_1_intencao' && (
                <div className={`step-subtext mb-4 sm:mb-6 ${subtext.startsWith('*') ? 'text-amber-600 font-medium italic text-sm bg-amber-50 p-4 rounded-2xl border border-amber-100 text-left' : type === 'textarea' ? 'text-left mb-4' : 'text-center text-gray-600'}`}>
                    {type === 'textarea' && subtext.includes('Ex:') ? (
                        <div className="text-gray-600 text-sm flex flex-col justify-start items-center">
                            <span className="font-medium">Ex:</span>
                            {subtext.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <div key={idx} className="mt-1">{line.replace('Ex:', '').trim()}</div>
                            ))}
                        </div>
                    ) : (
                        <p>{subtext}</p>
                    )}
                </div>
            )}

            {/* PrecoInfo em formulários finais */}
            {(stepId === 'passo_8_captura' || stepId === 'passo_8_captura_catalogo') && (
                <PrecoInfo variant="accordion" />
            )}

            {inputs.length > 0 && (
                <form id={formId} onSubmit={(e) => { e.preventDefault(); handleNext(); }} className={`w-full max-w-full mx-auto mb-8 min-w-0 box-border ${type === 'textarea' ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}>
                    <div className={type === 'textarea' ? 'flex flex-col gap-5' : 'flex flex-col gap-5'}>
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
                                    <div key={input.id} className="text-left w-full min-w-0">
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
                            <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-[#4CAF50] text-white font-bold py-4 px-10 rounded-2xl shadow-md hover:bg-green-600 hover:shadow-lg active:scale-[0.98] transition-all text-base focus:outline-none focus:ring-4 focus:ring-green-300">
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
                                        {['Rolô', 'Double Vision', 'Romana', 'Horizontal Madeira', 'Horizontal Alumínio', 'Vertical', 'Teto', 'Painel', 'Cortina'].map(m => (
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

            {/* Cards de opções */}
            {(() => {
                const isTecidoExpandable = stepId === 'passo_3v3_tecido' && typeof tecidoExpandableLimit === 'number' && options.length > tecidoExpandableLimit;
                const visibleOptions = isTecidoExpandable && !tecidoExpanded ? options.slice(0, tecidoExpandableLimit) : options;
                return (
                    <>
                        <div className="gap-3 sm:gap-4 w-full max-w-2xl mx-auto grid grid-cols-2">
                            {visibleOptions.map((option, index) => {
                                const isSelected = selectedValue === option.value;
                                const isModeloStep = stepId === 'passo_4_modelo';
                                const isTecidoOrAcabamento = stepId && (stepId.startsWith('passo_4_tecido') || stepId === 'passo_4_acabamento_cortina' || stepId === 'passo_3_acionamento');
                                const isV3Step = stepId === 'passo_3v3_tecido' || stepId === 'passo_3v3_modelo';
                                const layoutVertical = !!(isModeloStep || isV3Step || (isTecidoOrAcabamento && option.image));
                                const imageContainerClass = isV3Step
                                    ? 'w-full h-40 sm:h-56 mb-3 sm:mb-4 overflow-hidden rounded-xl bg-gray-50 shrink-0'
                                    : 'w-full h-24 sm:h-40 mb-3 sm:mb-4 overflow-hidden rounded-xl bg-gray-50 shrink-0';
                                const isFeatured = option.featured === true;
                                const isIntencaoStep = stepId === 'passo_1_intencao';
                                const cardClassName = `group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] h-full ${
                                    isSelected
                                        ? 'border-2 border-[#4CAF50] bg-green-50 shadow-md ring-2 ring-[#4CAF50]/20'
                                        : isFeatured && isIntencaoStep
                                        ? 'border-2 border-[#4CAF50] bg-green-100 shadow-lg ring-2 ring-[#4CAF50]/30'
                                        : isFeatured
                                        ? 'border-2 border-[#4CAF50] bg-green-50/30 shadow-lg ring-2 ring-[#4CAF50]/30'
                                        : !isFeatured && isIntencaoStep
                                        ? 'border-2 border-gray-300 bg-gray-100 hover:border-gray-400 hover:shadow-md'
                                        : 'border-2 border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
                                }`;
                                return (
                                    <Card key={option.value ?? index} className={cardClassName}>
                                        <button
                                            type="button"
                                            onClick={() => { scrollToTop(); onOptionSelect(option); }}
                                            className={`w-full h-full ${isV3Step ? 'min-h-[200px] sm:min-h-[260px]' : 'min-h-[120px] sm:min-h-[140px]'} p-4 sm:p-6 cursor-pointer text-center focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/30 rounded-xl border-0 bg-transparent text-xs sm:text-[0.9rem] font-medium flex flex-col min-w-0 items-center justify-center ${
                                                layoutVertical ? '' : isTecidoOrAcabamento ? '' : ''
                                            } ${!isFeatured && isIntencaoStep ? 'text-gray-600' : 'text-gray-800'}`}
                                        >
                                            {layoutVertical ? (
                                                <>
                                                    {layoutVertical && (
                                                        <div className={imageContainerClass}>
                                                            {option.image ? (
                                                                <img src={getImageSrc(option.image)} alt={option.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl" aria-hidden>—</div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <span className={`font-bold mb-1.5 leading-tight ${isFeatured ? 'text-[15px] sm:text-[16px]' : 'text-[14px] sm:text-[15px]'}`}>{option.label}</span>
                                                    {option.description && (
                                                        <span className="text-[13px] sm:text-[16px] text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                                    )}
                                                </>
                                            ) : isTecidoOrAcabamento ? (
                                                <div className="flex flex-col justify-center gap-1 items-center text-center">
                                                    <span className={`font-bold leading-tight ${isFeatured ? 'text-[15px] sm:text-[16px]' : 'text-[14px] sm:text-[15px]'}`}>{option.label}</span>
                                                    {option.description && (
                                                        <span className="text-[13px] sm:text-[16px] text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    {option.image && (
                                                        <div className={imageContainerClass}>
                                                            <img src={getImageSrc(option.image)} alt={option.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                                        </div>
                                                    )}
                                                    <span className={`font-bold mb-1.5 leading-tight ${isFeatured ? 'text-[15px] sm:text-[16px]' : 'text-[14px] sm:text-[15px]'}`}>{option.label}</span>
                                                    {option.description && (
                                                        <span className="text-[12px] sm:text-[13px] text-gray-500 font-normal leading-tight" style={{ textWrap: 'balance' }}>{option.description}</span>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    </Card>
                                );
                            })}
                        </div>
                        {isTecidoExpandable && (
                            <div className="w-full max-w-2xl mx-auto mt-4 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setTecidoExpanded((e) => !e)}
                                    className="text-sm font-medium text-[#4CAF50] hover:text-green-600 border border-[#4CAF50] hover:border-green-600 px-4 py-2 rounded-xl transition-colors"
                                >
                                    {tecidoExpanded ? 'Ver menos' : 'Ver mais'}
                                </button>
                            </div>
                        )}
                    </>
                );
            })()}

            {(inputs.length > 0 || type === 'mixed') && !(type === 'textarea') && stepId !== 'passo_7_mais_itens' && (
                <div className="mt-6 sm:mt-8">
                    <Button type="button" onClick={handleNext} size="lg" className="w-full sm:w-auto">
                        Continuar
                    </Button>
                </div>
            )}
        </div>
    );
}
