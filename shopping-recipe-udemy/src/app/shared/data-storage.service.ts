import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put(
            'https://angular-recipe-f3749-default-rtdb.firebaseio.com/recipes.json', 
            recipes
        )
        .subscribe( response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://angular-recipe-f3749-default-rtdb.firebaseio.com/recipes.json'
        )
        .pipe(
            map(recipes => {  // this map is an rxjs operator
                return recipes.map(recipe => { // this map is a js method
                    // the following line sets ingredients to an empty array
                    // in the case that a fetched recipe has no ingredients
                    return { ... recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                }); 
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }

}

