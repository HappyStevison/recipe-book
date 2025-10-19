import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


interface Recipe {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function RecipeDetailPage() {
    const {recipeId} = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = `https://jsonplaceholder.typicode.com/posts/${recipeId}`;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async function() {
            try{
                const response = await fetch(url, { signal});
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const data = await response.json();
                setRecipe(data);
                setError(null);
            } catch (error) {
                if(error.name !== 'AbortError'){
                    console.error(error.message);
                    setError(error.message);
                }
            }   finally {
                setIsLoading(false);
            }    
        })();
        return () => {
            controller.abort();
        };
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${recipe.id}`, {
                method: 'DELETE', //specifying the method
            });

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

           
            console.log('Successfully deleted recipe:');
            alert('Recipe deleted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to delete recipe:', error);
            alert('Failed to delete recipe. Check the console.');
        }
    }


    return (
        <div>
        {isLoading && <p>Loading recipe...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {recipe && !isLoading && !error && (
            <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.body}</p>
                <Link to={`/recipes/${recipe.id}/edit`}>
                    <button>Edit Recipe</button>
                </Link>
                <button onClick={handleDelete}>Delete Recipe</button>
            </div>
            )}
        </div>
    );
}
export default RecipeDetailPage;