import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind} from 'react-icons/bs';
import {TbSettingsExclamation, TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';


const APIkey = '6170dfc2b4f6d7548fa3691e5486e905';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  },[location]);


  const handleSubmit = (event) => {
    console.log(search);
    if(search !== '') {
      setLocation(search);
    }

    const input = document.querySelector('input');
    input.value = "";
    
    event.preventDefault();
    
  }

  if(!data) {
    return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
      <div><ImSpinner8 className='text-5xl animate-spin text-white'/></div>
    </div>
    );
  }


  let icon;

  switch(data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break
    case 'Rain':
      icon = <IoMdRainy />;
      break
    case 'Clear':
      icon = <IoMdSunny />;
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break
    case 'Snow':
      icon = <IoMdSnow />;
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break
  }

  // date obj
  const date = new Date();

  return(
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {/* form */}
      <form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8'>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
           onChange={(event) => handleChange(event)}
           value={search}
           className='flex-1 bg-transparent outline-none placeholder:text-white text-[15px] font-light pl-6 h-full text-white'
           type="text"
           placeholder='Search by city or country'
           />
          <button onClick={(event) => handleSubmit(event)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'>
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        <div>
          {/* card top */}
          <div className='flex items-center gap-x-5 '>
            {/* icon */}
          <div className='text-[87px]'>{icon}</div>
          {/* country name */}
            <div>
              <div className='text-2xl font-semibold'>
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/* temperature */}
              <div className='text-[144px] leading-none font-light'> 
                {parseInt(data.main.temp)}
              </div>
              {/* celsius */}
              <div className='text-4xl'>
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* weather description */}
            <div className='capitalize text-center'>
              {data.weather[0].description}
            </div>
          </div>
          {/* card bottom */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsThermometer />
                </div>
                <div className='flex'>
                  Feels like
                  <div className='ml-2 flex'>
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                </div>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWater />
                </div>
                <div className='flex'>
                  Humidity
                  <span className='ml-2 flex'>
                    {data.main.humidity} %
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div>
                  Wind
                 <span className='ml-2'>{data.wind.speed}m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;