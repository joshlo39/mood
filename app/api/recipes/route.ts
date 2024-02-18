import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import Recipes from '../../(dashboard)/Recipes/page';
import { analyzeInstructions } from "@/utils/ai";
import { revalidatePath } from "next/cache";
export const POST = async (req) => {
    const response = await req.json()
    const { ingredients } = response

    const user = await getUserByClerkId()
    const ingredient = await prisma.Ingredients.create({
        data: {
            userId: user.id,
            content: ingredients,
        },
    })
    console.log(ingredient)
    
    const recipes = await analyzeInstructions(ingredient.content)
    try {
        await prisma.Recipes.create({
            data: {
                userId: user.id,
                ingredientsId: ingredient.id,
                title: recipes?.title,
                proportions: recipes?.proportions,
                instructions: recipes?.instructions,
            }
        })
    } catch (e) {
        console.log("Failed create recipes" + e)
    }
    console.log({ data: ingredients, recipes: recipes })
    revalidatePath('/Recipes')
    return NextResponse.json({ data: recipes})
}