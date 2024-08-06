import { useState, createElement, forwardRef, useImperativeHandle, useEffect } from 'react'
import TextField from '../TextField'
import { BsPlusCircle, BsTrash } from 'react-icons/bs'

interface instrucUI { setInstructions: (e: any) => void, values?: string[] }

const AddListInstructions = forwardRef((props: instrucUI, ref) => {
    const [listIns, setlistIns] = useState<any[]>([]);
    const { setInstructions, values } = props;

    const addTextField = () => {
        setlistIns([...listIns, textField])
    }

    const deleteTextField = () => {
        const listArray = [...listIns];
        listArray.pop();
        setlistIns(listArray)
    }

    const textField = createElement('li', { key: listIns.length }, createElement(TextField, {
        borderLess: true,
        placeholder: `Instruction ${listIns.length + 1}`,
        id: listIns.length + 1
    }))

    const initValue = values?.map((value, index) => {
        return createElement('li', { key: index }, createElement(TextField, {
            borderLess: true,
            placeholder: `Instruction ${index + 1}`,
            id: index + 1,
            value: value
        }))
    })

    useEffect(() => {
        if (values) {
            setlistIns(initValue as any)
        } else {
            setlistIns([...listIns, textField])
        }
    }, [])

    useImperativeHandle(ref, () => ({
        getInstructions() {
            let instructionsArray: Object[] = [];
            for (let i = 1; i < listIns.length + 1; i++) {
                let textElement = document.getElementById(`${i}`) as any;
                instructionsArray = [...instructionsArray, textElement.value]
            }
            setInstructions(instructionsArray)
        }
    }))

    return (
        <div className='w-full flex flex-col gap-8 relative'>
            <div className='absolute -top-16 md:-top-10 -right-0 md:-right-10 flex flex-row md:flex-col justify-center items-center md:gap-3 gap-4 
            rounded-xl border border-slate-400 text-slate-900 md:text-xl text-3xl md:px-1 md:py-2 px-2 py-2 z-10'>
                <BsPlusCircle onClick={addTextField} className='hover:text-slate-600 cursor-pointer' />
                <BsTrash onClick={deleteTextField} className='hover:text-slate-600 cursor-pointer' />
            </div>
            <ul className='list-decimal text-xs flex flex-col gap-4'>
                {listIns}
            </ul>
        </div>
    )
})
AddListInstructions.displayName = 'AddListInstructions';

export default AddListInstructions;