
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('A Tasty Schnitzel',
    //      "A super-tasty Schnitzel!", 
    //      "https://res.cloudinary.com/hksqkdlah/image/upload/SFS_chicken_schnitzel-198_1_vpwii4.jpg",
    //      [
    //          new Ingredient('Meat', 1),
    //          new Ingredient('French Fries', 20)
    //      ]),
    //     new Recipe('Big Fat Burger',
    //      "Such a giant burger!", 
    //      "https://jigsawpuzzle.io/data/image/big-burger.jpg",
    //      [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1),
    //         new Ingredient('Tomato', 1)
    //      ])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); // returns a copy of the array
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}