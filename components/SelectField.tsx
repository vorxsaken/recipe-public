import { BsCheck } from 'react-icons/bs'
import { useState, useRef, useEffect } from 'react'

interface selectFieldUI {
    placeholder?: string,
    options: string[],
    multiple?: boolean,
    setSelection: (e: any) => void,
    value?: string[]
}

export default function SelectField({ placeholder, options, multiple, setSelection, value }: selectFieldUI) {
    const [selected, setSelected] = useState<string[]>(value || [])
    const [showOptions, setshowOptions] = useState(false);
    const [yPosition, setyPosition] = useState('');
    const ref = useRef(null);

    const checkBoxChange = (e: any) => {
        if (e.currentTarget.checked) {
            let sel = [...selected, e.currentTarget.value];
            setSelected(sel);
            setSelection(sel);
        } else {
            let curr = selected;
            let indexOfCurr = curr.indexOf(e.currentTarget.value);
            curr.splice(indexOfCurr, 1);
            setSelected(curr);
            setSelection(curr);
        }
    }

    const selectBoxPosition = () => {
        const getrect = document.getElementById('selectBox')?.getBoundingClientRect();
        let yPosition = getrect?.y || 0;
        yPosition = yPosition > 400 ? 350 : yPosition
        setyPosition(`-${yPosition}px`);
        setshowOptions(!showOptions);
    }

    useEffect(() => {
        if(value) {
            for(const opt of selected) {
                const option = document.getElementById(opt) as any;
                option.checked = true
            }
            setSelection(value)
        }
    }, [])

    useEffect(() => {
        const checkIfClickOutside = (e: MouseEvent) => {
            const current = ref.current as any;
            if (showOptions && current && !current.contains(e.target)) {
                setshowOptions(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside, false);

        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }
    }, [showOptions])

    return (
        <>
            {
                !multiple ? (
                    <select id="selectField" className='w-28 h-8 border border-slate-800 rounded-2xl bg-white px-4 
                    text-xs text-slate-800 appearance-none' placeholder={placeholder}>
                        {options.map(value => (
                            <option key={value} value={value} className='lowercase'>{value}</option>
                        ))}
                    </select>
                ) : (
                    <div ref={ref}>
                        <div className="w-full px-4 min-h-14 py-3 flex flex-wrap gap-2 justify-start items-center border border-slate-400 relative 
                            cursor-pointer rounded-md"
                            onClick={selectBoxPosition}
                            id='selectBox'
                        
                        >
                            {
                                selected.length > 0 ? selected.map(select => (
                                    <div key={select} className='min-w-[100px] px-4 py-2 text-center rounded-3xl bg-slate-200 text-slate-800 text-sm'>
                                        {select}
                                    </div>
                                )) : (
                                    <span className='text-sm text-gray-500'>select categories</span>
                                )
                            }
                            <div className={`${showOptions ? 'w-1/2' : 'w-0 h-0 invisible'} max-h-96 absolute p-2 bg-white flex flex-col justify-center items-center 
                            gap-4 left-0 shadow-2xl z-10 overflow-y-auto pt-48`}
                            style={{top: yPosition}}
                            >
                                {options.map(option => (
                                    <div key={option} className="w-full flex justify-start items-center">
                                        <input onChange={checkBoxChange} className="peer hidden" type="checkbox" value={option} id={option} />
                                        <label htmlFor={option} className='w-8 h-6 rounded-sm flex justify-center items-center bg-gray-300 
                                        peer-checked:bg-blue-500 '>
                                            <BsCheck className='text-gray-300 font-bold text-3xl' />
                                        </label>
                                        <label className="w-full pl-4 py-2 " htmlFor={option}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
