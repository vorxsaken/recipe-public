import { useState, useEffect } from 'react'
import TextField from '../TextField'
import { BsPlusCircle, BsTrash } from 'react-icons/bs'
import Button from '../Button'

export default function AddListIngredient({ setIngredient, value }: {setIngredient: (e: any) => void, value?: any[]}) {
    const [listIng, setlistIng] = useState<any[]>(value || []);

    const addIng = () => {
        const quantity = document.getElementById('quantity') as any;
        const unit = document.getElementById('unit') as any;
        const name = document.getElementById('name') as any;

        if(!quantity.value && !unit.value && !name.value) return;

        const ingredient = {
            quantity: quantity.value,
            unit: unit.value,
            name: name.value
        }

        const ingredientArray = [...listIng, ingredient]
        setlistIng(ingredientArray)
        setIngredient(ingredientArray)
        quantity.value = ''
        unit.value = ''
        name.value = ''
    }

    const deleteIng = (index: number) => {
        var currIng = [...listIng];
        currIng.splice(index , 1);
        setlistIng(currIng);
        setIngredient(currIng);
    }

    const invokeAddList = (e: any) => {
        if(e.key === 'Enter') {
            addIng();
            document.getElementById('quantity')?.focus();
        }
        
    }

    useEffect(() => {
        if(value) setIngredient(value);
    }, [])

    return (
        <div className='w-full flex flex-col gap-8'>
            <div className='flex flex-col gap-4 justify-start items-start'>
                <div className='flex justify-start items-center gap-2'>
                    <TextField id='quantity' small placeholder='quantity' number />
                    <TextField id='unit' small placeholder='Unit' />
                    <TextField id='name' placeholder='Name' onKeyDown={invokeAddList} />
                </div>
                <div className='flex justify-end items-end gap-2'>
                    <Button small onClick={addIng}>
                        Add
                    </Button>
                </div>
            </div>
            <ul className='list-disc flex flex-col gap-4 pl-8'>
                {listIng.map((ing, index) => (
                    <li key={index}>
                        <div className='flex justify-between text-sm'>
                            <div className='flex gap-2 justify-center items-center'>
                                <div className='w-9'>{ing.quantity}</div>
                                <div className='w-12'>{ing.unit}</div>
                                <div >{ing.name}</div>
                            </div>
                            <BsTrash className='text-lg cursor-pointer hover:text-slate-600' onClick={() => deleteIng(index)} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
