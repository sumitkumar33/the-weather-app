import { useState , useEffect } from 'react';
import './App.css'
import axios from 'axios';
function App() {
  //Create State hook
  const [allData, setAllData] = useState({
    //Changable variables goes here
    city:'',country:'',temprature:'',min_temp:'',max_temp:'' ,humidity:'',icon:'',description:''
  })

  const [search, setSearch] = useState('')

  useEffect(()=>{
    //Used for rendering
    grabData()

  },[]) //[] stops app from making requests multiple times

  const grabData = async (city) => {
      try{
      const apiKey = "dab1851bd292bc04164a6f7be9afe5ef"
      //Grabbing data from openweathermap.org with help of Axios
      //Axios helps in making api requests and receiving data
      // " `` " => backticks used for enabling js in the string and ${} for variables
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)

      await setAllData({
        //SetData
        city: result.data.name,country: result.data.sys.country,temprature: result.data.main.temp, min_temp: result.data.main.temp_min,max_temp: result.data.main.temp_max, humidity: result.data.main.humidity, icon:result.data.weather[0].icon,description:result.data.weather[0].description
      })
      }catch (e){
        console.log('Application is either initialized or API server is down')
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    grabData(search)
  }

  const handleInputChanges = (event) => {
    setSearch(event.target.value)
  }

  return(
    <main>
      <div className='App'>
        <form onSubmit={handleSubmit}>
          <input value={search} type='text' name='city' placeholder='City Name...' onChange={handleInputChanges}/>
          <button for='city'>Search</button>
        </form>
        <section>
          <h3>{allData.city}, {allData.country}</h3>
          <img src={'http://openweathermap.org/img/wn/'+allData.icon+'@2x.png'} alt={allData.description}></img>
          <h1>{allData.temprature}°C</h1>
          <p>Min: {allData.min_temp}°C&ensp;Max: {allData.max_temp}°C</p>
          <p>Humidity: {allData.humidity}</p>
        </section>
      </div>
    </main>
  )
}

export default App;