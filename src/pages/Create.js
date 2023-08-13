import React, { useState, useEffect } from 'react';
import { useUserID } from '../hooks/useUserID';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";
import NotLoggedIn from '../components/NotLoggedIn';

const Create = () => {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [loading,setLoading] = useState(false);


  const userOwner = useUserID();

  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      axios.post("https://cookbookconnect-backend.vercel.app/recipes", {
        name,
        ingredients,
        instructions,
        image: url,
        cookingTime,
        userOwner
      },)
        .then(setLoading(false))
        .then(navigate("/"));
    }

  }, [url,name,ingredients,instructions,userOwner,navigate,cookingTime])

  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "recipe")
    data.append("cloud_name", "dqlscoqsj")

    fetch("https://api.cloudinary.com/v1_1/dqlscoqsj/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err)
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    postDetails();

    setLoading(true);

  }

  return (
    <div>
      {userOwner ? <div>
      {loading ? <div className='loading'>
        <ClockLoader
        color="#7DC855"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div> :
       <form onSubmit={handleSubmit} className='create' >
        <h2>Create</h2>
        <div >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" autoComplete='off' required={true} onChange={(e) => { setName(e.target.value) }} />

          <label htmlFor="ingredients">Ingredients</label>
          <textarea type="text" name="ingredients" id="ingredients" required={true} autoComplete='off' onChange={(e) => { setIngredients(e.target.value) }} />

          <label htmlFor="instructions">Instructions</label>
          <textarea name="instructions" id="instructions" required={true} onChange={(e) => { setInstructions(e.target.value) }} />

          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" required={true} onChange={(e) => { setImage(e.target.files[0]) }} />

          <label htmlFor="cookingTime">Cooking Time</label>
          <input type="number" name="cookingTime" id="cookingTime" required={true} onChange={(e) => { setCookingTime(e.target.value) }} />

          <button type='submit'>Submit</button>
        </div>
      </form>}
    </div> : <NotLoggedIn/> }
    </div>
  )
}

export default Create;






