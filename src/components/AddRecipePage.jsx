import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddRecipePage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // we'll use this go back to the list after creating

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', //specifying the method
                headers: {
                    'Content-Type': 'application/json', // We're sending JSON data
                },
                body: JSON.stringify(data),
            });

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const newRecipe = await response.json();
            console.log('Successfully created recipe:', newRecipe);
            alert('Recipe created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to create recipe:', error);
            alert('Failed to create recipe. Check the console.');
        }
    };

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
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipePage;