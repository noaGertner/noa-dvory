// const Category = require("../models/category.model");
// const Recipe = require("../models/recipe.model");
// const { User } = require("../models/user.model");
const Category = require("../models/category.model");
const Recipe = require("../models/recipe.model");

module.exports = {

    getAllrecipes: async (req, res, next) => {
        const { searchText } = req.body;
        let filter = {
            $or: [
                { isPrivate: false },
                { user_id: req.userId }]
        };
        if (searchText) {
            const regex = new RegExp(searchText, 'i');  // חיפוש לא רגיש רגישות (case-insensitive)
            filter = {
                ...filter,
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            };
            try {
                const recipes = Recipe.find(filter);
                return res.send(recipes)

            } catch (error) {
                return next({ error: error.message, status: 400 })
            }
        }
    }
    ,

    getRecipeByMinutesTime: async (req, res, next) => {
        const { minutesTime } = req.body
        if (minutesTime != undefined) {
            try {
                const recipes = Recipe.find(minutesTime).populate('user_id', 'name').populate('category_id')

                return res.json(recipes)
            } catch (error) {
                return next({ error: error.message, status: 400 })
            }
        }
        else
            return next({ error: error.message, status: 40 })
    },

    getRecipeByUser: async (req, res, next) => {
        const { user_id } = req.body
        if (user_id != undefined) {
            try {
                const recipeUser = Recipe.find(user_id);
                return res.json(recipeUser)
            } catch (error) {
                return next({ error: error.message, status: 400 })
            }
        }
        else
            return next({ error: error.message, status: 40 })
    },

    getDetailsRecipe: async (req, res, next) => {
        const { id } = req.params;
        if (id != undefined) {
            try {
                const recipe = await Recipe.findById(id)
                    .populate('user_id')
                    .populate('category_id')
                // .exec()

                if (recipe) {
                    return res.json(recipe)
                }
                else
                    return next({ error: "לא נמצא מתכון מתאים", status: 400 })
            } catch (error) {
                return next({ error: error.message, status: 404 })
            }
        }
    },

    addRecipe: async (req, res, next) => {
        try {
            // const id=req.body.category_id;
            const name = req.body.category_name;
            const numOfReciepes = 0;
            const c = Category.find(name)
            const newRecipe = new Recipe(req.body);
            newRecipe.user_id = req.user_id;

            if (c) {
                //newRecipe = new Recipe(req.body);
                newRecipe.category_id = c.id;
                c.numOfReciepes++;
            }
            else {
                const newcategory = new Category({ name, numOfReciepes: 1 });
                //req.category_id = newcategory._id;
                newcategory.save();
                newRecipe.category_id = newRecipe.id;

            }
            // const newUser = new User(req.body);
            // newRecipe.user_id = req.user_id;
            // newRecipe.category_id = req.category_id;

            await newRecipe.save();
            newRecipe.populate('user_id').populate('category_id')
            return res.json(newRecipe).status(201)

        } catch (error) {
            return next({ error: error.message, status: 400 })
        }

    },

    updateRecipe: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rUpdate = await Recipe.findByIdAndUpdate(id, { $set: req.body }, { new: true });

            res.json(rUpdate)
        } catch (error) {
            return next({ error: error.message, status: 400 })
        }

    },

    deleteRecipe: async (req, res, next) => {
        const userId = req.user_id
        const role = req.user_role
        const { id } = req.params;
        if (id) {
            try {
                const deleteRecipe = await Recipe.findById(id);
                deleteRecipe.populate('user_id')

                if (!(role == 'director' || userId == deleteRecipe.user_id.id))
                    return next({ error: "לא נמצא מתכון מתאים", status: 400 })

                deleteRecipe.populate('category')
                deleteRecipe.category_id.numOfReciepes--;
                const deleteRecipe1 = await Recipe.findByIdAndRemove(id);
                return res.status(204)
            } catch (error) {
                return next({ error: error.message })
            }
        }
        else {
            return next({ error: error.message })

        }


    }
}