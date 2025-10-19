interface RecipeCardProps {
    title: string;
    description: string;
    onDelete: () => void; // a function that takes no arguments and returns nothing
}

function RecipeCard({ title, description, onDelete }: RecipeCardProps) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', borderRadius: '8px'}}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onDelete} style={{ background: 'red', color: 'white '}}>Delete</button>
        </div>
    );
}

export default RecipeCard;