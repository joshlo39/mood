import RecipeCard from "@/components/RecipeCard"
import RecipesQuestion from "@/components/RecipesQuestion"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
const getRecipes = async () => {
    const user = await getUserByClerkId()

    const recipes = await prisma.recipes.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
    })
    return recipes 
}
const RecipePage = async () => {
    const recipes = await getRecipes()
    return (
        <div className="p-4">
            <RecipesQuestion />
            <div className="grid grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <RecipeCard input ={recipe} />
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default RecipePage
