// bundles all of the routing for our application
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesResolverService } from "./recipes/recipe-resolver.service"
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";

// appRoutes is an array of JS objects, each object describes a route
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },

    ]},
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

}) 

export class AppRoutingModule {

}