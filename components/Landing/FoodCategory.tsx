import SliderContainer from "../SliderContainer"
import CategoryCard from "../CategoryCard"
import { categories } from "@/utils";

export default function FoodCategory() {
    const category = categories.map((category, index) => (
        <CategoryCard key={index} title={category.name} image={category.image} />
    ))

    return (
        <SliderContainer title="Choose Categories 🍔" items={category} />
    )
}
