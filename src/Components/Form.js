import './Form.css'
import { useState } from 'react';
import Axios from 'axios';

export default function Form() {
  const URL = 'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes';
  const [dish, setDish] = useState({
    "name": "",
    "preparation_time": "",
    "type": "",
    "id": Number,
  });

  // showing and hiding divs depended on which option is selected
  const [currentDiv, setCurrentDiv] = useState('');
  const newDish = {...dish};

  function handleDish(event){
    newDish[event.target.id] = event.target.value;
    setDish(newDish);
    console.log(newDish);
    // showing and hiding divs9
    setCurrentDiv(newDish.type)
  }

  const optionsType = [
    {
      value: '',
      label: "Select..."
    },
    {
      value: "Pizza",
      label: "Pizza"
    },
    {
      value: "Soup",
      label: "Soup"
    },
    {
      value: "Sandwich",
      label: "Sandwich"
    }
  ];

  // validation
  const errors = {
    dishName: 'Please type a dish name',
    preparationTime: 'Please select a preparation time',
    type: 'Please choose a type of your dish',
    pizza: {
      numberOfSlices: 'Please type a number of slices',
      diameter: 'Please type a diameter',
    },
    soup: {
      spicinesScale: 'Please type a spicines scale'
    },
    sandwich: {
      slicesOfBread: 'Please type how many slices of bread you want'
    }
  }

  const [focused, setFocused] = useState(false);
  const handleFocus = (event) => {
    setFocused(true);
  }

  // sending form
  function submitForm(event){
    event.preventDefault();
    Axios.post(URL, {
      dish
    }).then(response => {
      console.log(response.data);
    })
  }
  return (
    <div className='container'>
      <div class="header">
        <h1>SEND YOUR DISH</h1>
      </div>
      <form onSubmit={(event) => submitForm(event)} className='centerForm'>
        {/* default fields */}
        <div>
          <label>Dish name</label>
          <div>
            <input type="text" onChange={(event) => handleDish(event)} id="name" value={dish.name} onBlur={handleFocus} focused={focused.toString()} required/>
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
            currentDiv === 'Pizza' && (
              <div>
                <div>
                  <label>Number of slices</label>
                  <div>
                    <input type="number" onChange={(event) => handleDish(event)} id="no_of_slices" value={dish.no_of_slices || 0} onBlur={handleFocus} focused={focused.toString()} required/>
                    <span>{errors.pizza.numberOfSlices}</span>
                  </div>
                </div>

                <div>
                  <label>Diameter</label>
                  <div>
                    <input type="number" step="0.01" onChange={(event) => handleDish(event)} id="diameter" value={dish.diameter || 0} onBlur={handleFocus} focused={focused.toString()} required/>
                    <span>{errors.pizza.diameter}</span>
                  </div>
                </div>

              </div>
            )
          }
          {
            currentDiv === 'Soup' && (
              <div>
                <label>Spiciness scale</label>
                <div>
                  <input type="number" onChange={(event) => handleDish(event)} id="spiciness_scale" value={dish.spiciness_scale || 0} onBlur={handleFocus} focused={focused.toString()} required />
                  <span>{errors.soup.spicinesScale}</span>
                </div>
              </div>
            )
          }
          {
            currentDiv === 'Sandwich' && (
              <div>
                <label>Slices of bread</label>
                <div>
                  <input type="number" onChange={(event) => handleDish(event)} id="slices_of_bread" value={dish.slices_of_bread || 0} onBlur={handleFocus} focused={focused.toString()} required/>
                  <span>{errors.sandwich.slicesOfBread}</span>
                </div>
              </div>
            )
          }
        </div>
      <input type="submit" value="SUBMIT" className='buttonInput'/>
      </form>
    </div>
  );
}