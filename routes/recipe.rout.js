const express=require('express');
const { getAllrecipes, addRecipe, getDetailsRecipe, deleteRecipe } = require('../controllers/recipe.controllers');
const { auth } = require('../middlewarws/auth');

const recipeRouter=express.Router(); 

recipeRouter.get('/',auth,getAllrecipes)
 recipeRouter.get('/:id',getDetailsRecipe)
 recipeRouter.post('/',auth,addRecipe)
 recipeRouter.delete('/:id',auth,deleteRecipe)

module.exports=recipeRouter;


