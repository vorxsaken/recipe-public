import Button from "@/components/Button"
import TextField from "@/components/TextField"
import SelectImage from "@/components/CreateRecipe/SelectImage"
import AddListIngredient from "@/components/CreateRecipe/AddListIngredient"
import AddListInstructions from "@/components/CreateRecipe/AddListInstructions"
import FullScreenContent from "@/components/FullScreenContent"
import { useState, useRef } from 'react'
import { uploadImages } from "@/utils"
import { AiFillWarning } from 'react-icons/ai'
import SelectField from "@/components/SelectField"
import { NextApiRequest, NextApiResponse } from "next"
import Router from "next/router"
import Head from "next/head"

interface imageType {
    [key: string]: Blob,
}

export default function EditRecipe({ recipe }: { recipe: any }) {
    const [image, setimage] = useState<imageType>({});
    const [Ingredients, setIngredients] = useState<Object[]>([])
    const [loadingButton, setloadingButton] = useState(false);
    const [showAlertModal, setshowAlertModal] = useState(false);
    const [categories, setcategories] = useState<string[]>([]);
    const instructionsRef = useRef(null);
    var instructions: string[] = [];
    const options = ['Appetizers', 'Soups and stews', 'Salads', 'Pasta', 'Meat', 'Seafood', 'Vegetarian', 'Desserts', 'Breakfast', 'Beverages'];

    const addImage = (e: any) => setimage(e);
    const addInstructions = (e: any) => (instructions = e);
    const addIngredient = (e: any) => setIngredients(e);
    const addCategories = (e: any) => setcategories(e);

    const onchangeAlertModal = () => {
        setshowAlertModal(!showAlertModal);
    }

    const updateRecipe = async () => {
        setloadingButton(true);
        const TitleTextField = document.getElementById('title') as any;
        const DescriptionTextField = document.getElementById('description') as any;
        const CalorieTextField = document.getElementById('calorie') as any;
        const instructionsRefAny = instructionsRef.current as any;
        instructionsRefAny.getInstructions();
        const CHECK_IF_SOME_FIELDS_EMPTY = !TitleTextField.value || !DescriptionTextField.value || !CalorieTextField.value || instructions.some(i => i === '') || Ingredients.length === 0 || categories.length === 0;

        if (CHECK_IF_SOME_FIELDS_EMPTY) {
            setshowAlertModal(true);
            setloadingButton(false);
            return;
        };

        const imageUrl = Object.keys(image).length > 0 ? await uploadImages(image.smallImage, image.bigImage) as any : {};

        fetch('/api/recipe/update', {
            method: 'POST',
            body: JSON.stringify({
                id: recipe.id,
                title: TitleTextField.value,
                description: DescriptionTextField.value,
                calorie: CalorieTextField.value,
                categories: categories,
                smallImage: Object.keys(image).length === 0 ? recipe.smallImage : imageUrl?.smallImage,
                bigImage: Object.keys(image).length === 0 ? recipe.bigImage : imageUrl?.bigImage,
                instructions: instructions,
                ingredients: Ingredients
            })
        }).then(() => {
            setloadingButton(false);
            Router.back();
        }).catch(error => console.log(error));
    }

    return (
        <div className="min-h-[700px] flex flex-col justify-start items-center gap-4 pb-20 px-4">
            <Head>
                <title>Edit {recipe.title}</title>
            </Head>
            <FullScreenContent show={showAlertModal} bg onChangeState={onchangeAlertModal}>
                <div className="flex flex-col gap-8 justify-center items-center">
                    <AiFillWarning className="text-8xl text-red-600" />
                    <span className="text-xl font-bold">Fields Cannot be Empty !!</span>
                </div>
            </FullScreenContent>
            <div className="w-full flex justify-between items-center py-4 px-6">
                <Button text onClick={() => Router.back()}>
                    Cancel
                </Button>
                <Button onClick={updateRecipe} loading={loadingButton}>
                    Save
                </Button>
            </div>
            <div className="w-full md:w-[500px] flex justify-start items-start gap-8">
                <TextField
                    id='title'
                    placeholder="Give This Recipe A Name"
                    initValue={recipe.title}
                    borderLess
                    textArea
                    className="placeholder:font-bold outline-none text-2xl resize-none font-black" />
            </div>
            <SelectImage onChange={addImage} value={recipe.bigImage} />
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Basic Information
                </div>
                <TextField id='description' initValue={recipe.description} textArea placeholder="add description ..." autoGrow />
                <TextField id='calorie' initValue={recipe.calorie} placeholder="add Calorie ..." textArea borderLess number autoGrow />
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Categories
                </div>
                <SelectField value={recipe.categories} multiple options={options} placeholder='select categories' setSelection={addCategories} />
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Ingredients
                </div>
                <div className="w-full">
                    <AddListIngredient value={recipe.ingredients} setIngredient={addIngredient} />
                </div>
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Instructions
                </div>
                <div className="w-full pl-8">
                    <AddListInstructions values={recipe.instructions} setInstructions={addInstructions} ref={instructionsRef} />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const getrecipe = await fetch(`${process.env.NEXTAUTH_URL}/api/recipe/read/details/${id}`);
    const recipe = await getrecipe.json();

    return {
        props: {
            recipe
        }
    }
}