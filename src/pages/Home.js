import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useUserID } from "../hooks/useUserID";

const Home = () => {
  const [unfilrecipes, setUnfilRecipes] = useState([]);
  const [savedRecipes,setSavedRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const userID = useUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setUnfilRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/saved/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);


  const recipes = unfilrecipes.filter((item) => {
    return search.toLowerCase() === ""
      ? item
      : item.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${recipeID}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };


    const isSavedRecipe = (id) => savedRecipes.includes(id)

  return (
    <div>
      <div>
        <h1 className="main-title">Recipes</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <div className="recipes">
                <div className="image">
                  <img src={recipe.image} alt="..." />
                </div>
                <div className="details">
                  <div className="title">
                    <h1>{recipe.name}</h1>
                    <div className="sdbuttons">
                      {" "}
                      {userID? <button  onClick={() => saveRecipe(recipe._id)} disabled={isSavedRecipe(recipe._id)} >
                        {isSavedRecipe(recipe._id)? "Saved":"Save"}
                      </button>: null}
                      {recipe.userOwner === userID ? (
                        <button
                          onClick={() => deleteRecipe(recipe._id)}
                          style={{
                            backgroundColor: "crimson",
                            border: "crimson",
                          }}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
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
    </div>
  );
};

export default Home;
