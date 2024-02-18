const RecipeCard = ({ input }) => {
    console.log("this is the inpput " + input)
    return (
        <div className="p-4 overflow-hidden rounded-lg bg-white/5 backdrop-blur-md relative hover:scale-105 transition-transform duration-200">
            <div className="px-y py-4">Title: {input.title}</div>
            <div className="px-y py-4"> Instructions: {input.instructions}</div>
            <div className="px-y py-4"> Proportions: {input.proportions}</div>
       </div> 
    )    
}

export default RecipeCard