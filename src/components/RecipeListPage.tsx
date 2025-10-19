
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
    userId: number;
    id: number;
    title: string;
    body: string;
}


function Recipes() {
    const [recipes, SetRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async function(){
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                SetRecipes(data);
                setError(null);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error(error.message);
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
        return () => {
            controller.abort();
        };
    }, []);

    const handleDelete = (id: number) => {
        alert(`Would delete recipe with id: ${id}`);
        // In a real app, you'd make a DELETE request here
        // and then update the state to remove the recipe
    };


    return (
        <div>
            <h1>Recipe Book</h1>
            {isLoading && <p>Loading recipes...</p>}
            {error && <p style={{ color: 'red'}}>Error: {error}</p>}
            <ul>
                {recipes.map(recipe => (
                    <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    description={recipe.body}
                    onDelete={()=> handleDelete(recipe.id)} />
                ))}
            </ul>
        </div>
    );

}

export default Recipes;