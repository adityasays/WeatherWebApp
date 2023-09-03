const cursor = document.getElementsByClassName("cursor")[0];
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

const apikey = "d7bf674cb42263f8a888cff7bec2f45c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=lucknow";

async function checkweather() {
  try {
    const response = await fetch(apiurl + `&appid=${apikey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    document.getElementsByClassName("city")[0].innerHTML = data.name;
    document.getElementsByClassName("temp")[0].innerHTML = Math.round(data.main.temp) +"°C";
    document.getElementsByClassName("humi")[0].innerHTML = data.main.humidity +"%";
    document.getElementsByClassName("wind")[0].innerHTML = data.wind.speed +" Km/hr";
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

checkweather();
