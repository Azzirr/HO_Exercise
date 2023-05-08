import './Form.css'
import { useState } from 'react';
import Axios from 'axios';

export default function Form() {
  const URL = 'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes';
  const [dish, setDish] = useState({
    id: 0,
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: Number,
    diameter: Number,
    spiciness_scale: Number,
    slices_of_bread: Number,
  });

  // showing and hiding divs depended on which option is selected
  const [currentDiv, setCurrentDiv] = useState('');
  function handleDish(event){
    const newDish = {...dish};
    newDish[event.target.id] = event.target.value;
    setDish(newDish);
    console.log(newDish);
    // showing and hiding divs9
    setCurrentDiv(newDish.type);
  }
  const optionsType = [
    {
      value: '',
      label: "Select..."
    },
    {
      value: "pizza",
      label: "Pizza"
    },
    {
      value: "soup",
      label: "Soup"
    },
    {
      value: "sandwich",
      label: "Sandwich"
    }
  ];

  // validation
  const [focused, setFocused] = useState(false);
  const handleFocus = (event) => {
    setFocused(true);
  }
  const errors = {
    dishName: 'Please type a dish name. Dish name must be at least 3 characters.',
    preparationTime: 'Please select a preparation time. Format HH:MM:SS.',
    type: 'Please choose a type of your dish',
    pizza: {
      numberOfSlices: 'Please type a number of slices. Integers only. Type between 1-16 slices.',
      diameter: 'Please type a diameter',
    },
    soup: {
      spicinesScale: 'Please type a spicines scale. Integers only. Type between 1-10.'
    },
    sandwich: {
      slicesOfBread: 'Please type how many slices of bread you want. Integers only. Type between 1-10 slices.'
    },
  }
  // sending form
  const [responseStatusError, setResponseStatusError] = useState('');
  function submitForm(event){
    // removing unnecessary values from object
    let dishToPost = {
      id: dish.id,
      name: dish.name,
      preparation_time: dish.preparation_time,
      type: dish.type,
    }
    if(currentDiv === 'pizza'){
      dishToPost.no_of_slices = dish.no_of_slices
      dishToPost.diameter = dish.diameter
    } else if(currentDiv === 'soup'){
      dishToPost.spiciness_scale = dish.spiciness_scale
    } else if(currentDiv === 'sandwich'){
      dishToPost.slices_of_bread = dish.slices_of_bread
    }
    // axios post
    event.preventDefault();
    Axios.post(URL, 
      dishToPost
      ).then(response => {
      setResponseStatusError('Data submitted!')
      console.log(response);
    }).catch(error => {
      if(error.response.status >= 400 || error.response.code <= 499){
        setResponseStatusError('Client error response! Try again later.')
      } else if(error.response.status >= 500 || error.response.code <= 599){
        return setResponseStatusError('Wrong server response! Try again later or contact our support.')
      }
    })
  }
  return (
    <div className='container'>
      <div className="header">
        <h1>SEND YOUR DISH</h1>
      </div>
      <form onSubmit={(event) => submitForm(event)} className='centerForm'>
        {/* default fields */}
        <div>
          <label>Dish name</label>
          <div>
            <input type="text" onChange={(event) => handleDish(event)} id="name" value={dish.name} onBlur={handleFocus} focused={focused.toString()} minLength={3} required/>
            <span>{errors.dishName}</span>
          </div>
        </div>

        <div>
          <label>Preparation time</label>
          <div>
            <input type="time" name="timestamp" step="1" onChange={(event) => handleDish(event)} id="preparation_time" value={dish.preparation_time} onBlur={handleFocus} focused={focused.toString()} required/>
            <span>{errors.preparationTime}</span>
          </div>
        </div>

        <div>
          <label>Type</label>
          <div>
            <select onChange={(event) => handleDish(event)} id="type" value={dish.type} onBlur={handleFocus} focused={focused.toString()} required>
              {optionsType.map((option) => (
                <option value={option.value} key={option.label}>{option.label}</option>
              ))}
            </select>
          </div>
        <span>{errors.type}</span>
        </div>

        {/* fields depending on the dish type */}

        <div>
          {
            currentDiv === 'pizza' && (
              <div>
                <div>
                  <label>Number of slices</label>
                  <div>
                    <input type="number" onChange={(event) => handleDish(event)} id="no_of_slices" value={dish.no_of_slices} onBlur={handleFocus} focused={focused.toString()} min="1" max="16" required/>
                    <span>{errors.pizza.numberOfSlices}</span>
                  </div>
                </div>

                <div>
                  <label>Diameter</label>
                  <div>
                    <input type="number" step="0.01" onChange={(event) => handleDish(event)} id="diameter" value={dish.diameter} onBlur={handleFocus} focused={focused.toString()} required/>
                    <span>{errors.pizza.diameter}</span>
                  </div>
                </div>

              </div>
            )
          }
          {
            currentDiv === 'soup' && (
              <div>
                <label>Spiciness scale</label>
                <div>
                  <input type="number" onChange={(event) => handleDish(event)} id="spiciness_scale" value={dish.spiciness_scale} onBlur={handleFocus} focused={focused.toString()} min="1" max="10" required />
                  <span>{errors.soup.spicinesScale}</span>
                </div>
              </div>
            )
          }
          {
            currentDiv === 'sandwich' && (
              <div>
                <label>Slices of bread</label>
                <div>
                  <input type="number" onChange={(event) => handleDish(event)} id="slices_of_bread" value={dish.slices_of_bread} onBlur={handleFocus} focused={focused.toString()} min="1" max="10" required/>
                  <span>{errors.sandwich.slicesOfBread}</span>
                </div>
              </div>
            )
          }
        </div>
      <input type="submit" value="SUBMIT" className='buttonInput'/>
      </form>
      <p className='responseError'>{responseStatusError}</p>
    </div>
  );
}