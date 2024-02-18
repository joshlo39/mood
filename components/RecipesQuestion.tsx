'use client'

import { useState } from "react"
import { createIngredients } from "@/utils/api"
import RecipeCard from "@/components/RecipeCard"
const RecipesQuestion = () => {
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const answer = await createIngredients(value)
        setResponse(answer)
        setValue('')
        setLoading(false)
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input
                    onChange={onChange}
                    value={value}
                    disabled={loading}
                    type="text"
                    placeholder="Tell Modo the ingredients you have..."
                    className="w-1/2 h-12 p-4 text-xl outline-none bg-white bg-opacity-25 rounded-lg block mx-auto">
                </input>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-gray-800 px-10 py-4 mt-4 rounded-lg text-xl block mx-auto">
                    Create Recipes
                </button>
            </form>
            {loading && <div> ...loading</div>}
        </div>
    );
}

export default RecipesQuestion;