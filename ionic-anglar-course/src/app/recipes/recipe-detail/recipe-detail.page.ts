import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private route: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("recipeId")) {
        return;
      }
      const recipeId = paramMap.get("recipeId");
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  onDelete() {
    this.alertCtrl
      .create({
        header: "Are u sure",
        message: "do u really wanna delete ?",
        buttons: [
          {
            text: "cancel",
            role: "cancel",
          },
          {
            text: "delete",
            handler: () => {
              this.recipeService.deleteRecipe(this.loadedRecipe.id);
              this.route.navigate(["/recipes"]);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
