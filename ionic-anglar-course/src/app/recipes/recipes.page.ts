import { Component, OnInit } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.recipes = this.recipeService.getAllRecipes();
    });
  }

  ngOnInit() {}
}
