const cursor = document.getElementsByClassName("cursor")[0];
const search = document.getElementsByClassName("citysearch")[0];
const searchbtn = document.getElementsByClassName("searchbtn")[0];
let timeout;

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  cursor.style.top = y + "px";
  cursor.style.left = x + "px";

  clearTimeout(timeout);
  cursor.style.display = "block";
  timeout = setTimeout(mousestop, 1000);
});

function mousestop() {
  cursor.style.display = "none";
}
const weathericon = document.getElementsByClassName("weaicon")[0]
const apikey = "d7bf674cb42263f8a888cff7bec2f45c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkweather(city) {
  try {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    document.getElementsByClassName("city")[0].innerHTML = data.name;
    document.getElementsByClassName("temp")[0].innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementsByClassName("humi")[0].innerHTML = data.main.humidity + "%";
    document.getElementsByClassName("wind")[0].innerHTML = data.wind.speed + " Km/hr";
    if(data.weather[0].main =="Clouds")
    {
     weathericon.innerHTML=`<i class="fa-solid fa-cloud fa-xl" style="color: #ffffff;"></i>`
    }
    else if(data.weather[0].main=="Rain"){
      weathericon.innerHTML=`<i class="fa-solid fa-cloud-rain fa-xl" style="color: #ffffff;"></i>`
  } 
  else if(data.weather[0].main=="Drizzle"){
    weathericon.innerHTML=`<i class="fa-solid fa-cloud-sun-rain fa-xl" style="color: #ffffff;"></i>`
} 
else if(data.weather[0].main=="Mist"){
  weathericon.innerHTML=`<i class="fa-solid fa-smog fa-xl" style="color: #ffffff;"></i>`
} 
else if(data.weather[0].main=="Snow"){
  weathericon.innerHTML=`<i class="fa-solid fa-snowflake fa-xl" style="color: #ffffff;"></i>`
} }
  catch (error) {
    console.error("An error occurred:", error);
  }
}


searchbtn.addEventListener("click", () => {
  checkweather(search.value);
});
