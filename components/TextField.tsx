import { ReactNode, useState } from 'react'

interface textField {
    id?: any,
    showCounter?: boolean,
    initValue?: number | string,
    autoGrow?: boolean,
    placeholder?: string,
    icon?: ReactNode,
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    textArea?: boolean,
    width?: number,
    borderLess?: boolean,
    number?: boolean,
    className?: string,
    bigPlaceholder?: boolean,
    [key: string]: any,
}

export default function TextField(props: textField) {
    const { id, placeholder, icon, small, textArea, autoGrow, medium, large, borderLess, number, className, showCounter, initValue, bigPlaceholder } = props;
    const [counter, setCounter] = useState(initValue?.toString().length || 0);

    const handleInput = (event: any) => {
        const f = document.getElementById(id) as any;
        setCounter(f.value.length);

        if (autoGrow) {
            event.currentTarget.style.height = 'auto';
            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }

        if (number) {
            let value = event.target.value;
            let newValue = value.replace(/[^0-9]/g, "");
            event.target.value = newValue;
        }
    }
    const Placeholder = bigPlaceholder ? 'placeholder:font-bold text-2xl font-black' : 'placeholder:text-slate-500 text-sm';
    const textFieldHeight = small ? 'h-8' : medium ? 'h-11' : large ? 'h-12' : 'h-8';
    const textFieldRounded = small ? 'rounded-md' : medium ? 'rounded-md' : large ? 'rounded-lg' : 'rounded-md';
    const textFieldIcon = icon ? 'pl-9' : 'pl-4';
    const textfieldBorder = borderLess ? 'border-none' : textArea ? 'border-b border-slate-500' : 'border border-slate-600';

    return (
        <span className='w-full relative'>
            {
                icon && (
                    <span className="text-md text-slate-500 absolute top-[31%] left-3">
                        {icon}
                    </span>
                )
            }
            {
                textArea ? (
                    <div className='w-full'>
                        <textarea
                            id={id}
                            onInput={handleInput}
                            className={`w-full ${!autoGrow ? 'h-[100px]' : 'resize-none'} px-2 py-2 outline-none text-slate-700
                            scrollbar-hide transition-all duration-700 ease-in-out ${Placeholder} ${textfieldBorder} ${className}`}
                            placeholder={placeholder}
                            defaultValue={initValue || ''}
                            {...props}
                        />
                        {
                            showCounter && (
                                <span className='text-sm text-gray-500'>
                                    {counter}&nbsp; /150
                                </span>
                            )
                        }
                    </div>
                ) : (
                    <>
                        <input id={id} onInput={handleInput} type='text' placeholder={placeholder} className={`
                        w-full ${textFieldHeight} ${textFieldRounded} ${textFieldIcon} ${textfieldBorder}
                        outline-none pr-4 text-xs placeholder:text-slate-500`}
                            {...props}
                        />
                    </>
                )
            }
        </span>
    )
}
