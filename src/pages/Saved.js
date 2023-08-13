import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useUserID } from "../hooks/useUserID";
import NotLoggedIn from "../components/NotLoggedIn";

const Saved = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/saved/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  const removeRecipe = async (recipeID) => {
    try {
      const response = await axios.patch(
        "http://localhost:3001/recipes/saved",
        {
          recipeID,
          userID,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <div>
      {userID ? (
        <div>
          <h1 className="main-title">Saved Recipes</h1>
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div className="recipes">
                  <div className="image">
                    <img src={recipe.image} alt="..." />
                  </div>
                  <div className="details">
                    <div className="title">
                      <h1>{recipe.name}</h1>
                      <button onClick={() => removeRecipe(recipe._id)}>
                        Remove
                      </button>
                    </div>
                    <div>
                      <h3>Ingredients</h3>
                      <p>{recipe.ingredients}</p>
                      <h3>Instructions</h3>
                      <p>{recipe.instructions}</p>
                    </div>
                    <p>Cooking Time: {recipe.cookingTime} (minute)</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NotLoggedIn/>
      )}
    </div>
  );
};

export default Saved;
