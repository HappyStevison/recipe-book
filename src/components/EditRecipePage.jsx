import { useParams, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'; // Import useEffect and useState

function EditRecipePage() {
    const {recipeId} = useParams();
    const navigate = useNavigate();
    const { register,reset, handleSubmit, formState: { errors } } = useForm();
    const url = `https://jsonplaceholder.typicode.com/posts/${recipeId}`;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                // 2. Use the data to reset the form
                reset(data); // This will populate the form fields!
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        })();
    }, [url, reset]);
    

     const onSubmit = async (data) => {
        try {
            const response = await fetch(url, {
                method: 'PUT', //specifying the method
                headers: {
                    'Content-Type': 'application/json', // We're sending JSON data
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const updateRecipe = await response.json();
            console.log('Successfully updated recipe:', updateRecipe);
            alert('Updated recipe successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to update recipe:', error);
            alert('Failed to update recipe. Check the console.');
        }
    };

    if (isLoading) {
        return <p>Loading recipe for editing...</p>
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input 
                        {...register('title', { required: 'Title is required'})}
                    />
                    {errors.title && <p>{errors.title.message}</p> }
                </div>
                <div>
                    <label>Body</label>
                    <textarea
                        {...register('body', {required: 'Body is required' })}
                        
                    />
                    {errors.body && <p>{errors.body.message}</p> }
                </div>
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
}

export default EditRecipePage;