const Category = require("../models/category.model");
const Recipe = require("../models/recipe.model")
async function  ReRecipe(id){
    try {
        const ca = await Category.findById(id)
        const re = await Recipe.find({ category_id: id })
        return { ca, re }
    } catch (error) {
        return next({ error: error.message, status: 40 })  
    } 
}
module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            const cat = await Category.find();
            return res.json(cat)
        } catch (error) {
            return next({ error: error.message, status: 40 })
        }

    },
    getRecipeByCategory: async (req, res, next) => {
        const recipes = [];
        try {
            const category = await Category.find();
            await(category.map(x => {
                recipes.push(ReRecipe(x.id))
            }))
            return res.json(recipes)
        }
        catch (error) {
            return next({ error: error.message, status: 40 })

        }

    },
        getCategories: async (req, res, next) => {
            const { cId } = req.params;
            try {
                return res.json(ReRecipe(cId))

            } catch (error) {
                return next({ error: error.message, status: 40 })

            }

        }
    }
