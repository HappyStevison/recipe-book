import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Recipes from './components/RecipeListPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import AddRecipePage from './components/AddRecipePage';
import EditRecipePage from './components/EditRecipePage';



function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recipes/new">Add Recipe</Link>

    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Nav />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path='/recipes/:recipeId' element={<RecipeDetailPage />} />
        <Route path='/recipes/new' element={<AddRecipePage />} />
        <Route path='/recipes/:recipeId/edit' element={<EditRecipePage />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
