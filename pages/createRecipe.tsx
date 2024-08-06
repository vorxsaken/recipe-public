import Button from "@/components/Button"
import TextField from "@/components/TextField"
import SelectImage from "@/components/CreateRecipe/SelectImage"
import AddListIngredient from "@/components/CreateRecipe/AddListIngredient"
import AddListInstructions from "@/components/CreateRecipe/AddListInstructions"
import FullScreenContent from "@/components/FullScreenContent"
import { useState, useRef } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import SelectField from "@/components/SelectField"
import { useDispatch } from "react-redux"
import { addRecipe } from "@/store/Reducers/recipeReducer"
import { uploadImages, imageType } from "@/utils"
import Router from "next/router";
import { categories as opt } from "@/utils"
import Head from "next/head"

export default function CreateRecipe() {
    const [image, setimage] = useState<imageType>({});
    const [Ingredients, setIngredients] = useState<Object[]>([])
    const [loadingButton, setloadingButton] = useState(false);
    const [showAlertModal, setshowAlertModal] = useState(false);
    const [categories, setcategories] = useState<string[]>([]);
    const instructionsRef = useRef(null);
    var instructions: string[] = [];
    const dispatch = useDispatch();
    const options = opt.map((category: any) => category.name);

    const addImage = (e: any) => setimage(e);
    const addInstructions = (e: any) => (instructions = e);
    const addIngredient = (e: any) => setIngredients(e);
    const addCategories = (e: any) => setcategories(e);

    const onchangeAlertModal = () => {
        setshowAlertModal(!showAlertModal);
    }

    const postRecipe = async () => {
        setloadingButton(true);
        const TitleTextField = document.getElementById('title') as any;
        const DescriptionTextField = document.getElementById('description') as any;
        const CalorieTextField = document.getElementById('calorie') as any;
        const servingTime = document.getElementById('servingTime') as any;
        const servingTotal = document.getElementById('servingTotal') as any;
        const instructionsRefAny = instructionsRef.current as any;
        instructionsRefAny.getInstructions();
        const CHECK_IF_SOME_FIELDS_EMPTY = !TitleTextField.value || !DescriptionTextField.value || !CalorieTextField.value 
        || Object.keys(image).length === 0 || instructions.some(i => i === '') || Ingredients.length === 0 || categories.length === 0 
        || !servingTime.value || !servingTotal.value;

        if (CHECK_IF_SOME_FIELDS_EMPTY) {
            setshowAlertModal(true);
            setloadingButton(false);
            return;
        };

        const imageUrl = await uploadImages(image.smallImage, image.bigImage) as any;
        fetch('/api/recipe/create', {
            method: 'POST',
            body: JSON.stringify({
                title: TitleTextField.value,
                description: DescriptionTextField.value,
                calorie: CalorieTextField.value,
                categories: categories,
                smallImage: imageUrl?.smallImage || '',
                bigImage: imageUrl?.bigImage || '',
                instructions: instructions,
                ingredients: Ingredients,
                servingTime: servingTime.value,
                servingTotal: servingTotal.value
            })
        }).then(data => data.json()).then(recipe => {
            setloadingButton(false);
            dispatch(addRecipe(recipe));
            window.history.back();
        }).catch(error => console.log(error));
    }

    return (
        <div className="min-h-[700px] flex flex-col justify-start items-center gap-4 pb-20 px-6">
            <Head>
                <title>Create Recipe | Food Recipe</title>
            </Head>
            <FullScreenContent show={showAlertModal} bg onChangeState={onchangeAlertModal}>
                <div className="flex flex-col gap-8 justify-center items-center">
                    <AiFillWarning className="text-8xl text-red-600" />
                    <span className="text-xl font-bold">Fields Cannot be Empty !!</span>
                </div>
            </FullScreenContent>
            <div className="w-full flex justify-between items-center py-4 px-0 md:px-6">
                <Button text onClick={() => Router.back()}>
                    Cancel
                </Button>
                <Button onClick={postRecipe} loading={loadingButton}>
                    Post
                </Button>
            </div>
            <div className="w-full md:w-[500px]">
                <TextField
                    id='title'
                    placeholder="Give This Recipe A Name"
                    borderLess
                    textArea
                    bigPlaceholder
                    autoGrow
                />
            </div>
            <SelectImage onChange={addImage} />
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Basic Information
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="text-sm font-bold text-gray-800">Recipe Description</span>
                    <TextField id='description' textArea placeholder="Short and clear description" autoGrow borderLess />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="text-sm font-bold text-gray-800">Calorie</span>
                    <TextField id='calorie' placeholder="Total calorie per serving"  number />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="text-sm font-bold text-gray-800">Serving Time</span>
                    <TextField id='servingTime' placeholder="serving time in minute" number />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="text-sm font-bold text-gray-800">Total serving per recipe</span>
                    <TextField id='servingTotal' placeholder="Total food serving for this recipe" number />
                </div>
                
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Categories
                </div>
                <SelectField multiple options={options} placeholder='select categories' setSelection={addCategories} />
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Ingredients
                </div>
                <div className="w-full">
                    <AddListIngredient setIngredient={addIngredient} />
                </div>
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-6 mt-10">
                <div className="w-full text-2xl font-bold">
                    Instructions
                </div>
                <div className="w-full pl-8">
                    <AddListInstructions setInstructions={addInstructions} ref={instructionsRef} />
                </div>
            </div>
        </div>
    )
}
