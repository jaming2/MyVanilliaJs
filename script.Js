
const LogInButton = document.querySelector("#LoginForm button");
const LoginForm = document.querySelector("#LoginForm");
const IdName = document.querySelector("#LoginForm input");
const Hello = document.querySelector("#Hello");
const LoadingMyName = localStorage.getItem('Name');
const Button1 = document.querySelector("#Button1");
const Color = document.querySelectorAll("#SelectBackgroundForm input")
const SelectBackgroundForm = document.querySelector("#SelectBackgroundForm")
const Button2 = document.querySelector("#Button2")
const ClockOnButton = document.querySelector("#ClockOnButton")
const ClockOffButton = document.querySelector("#ClockOffButton")
const Button3 = document.querySelector("#Button3")
const WeatherOnButton = document.querySelector("#WeatherOnButton")
const WeatherOffButton = document.querySelector("#WeatherOffButton")
const ClockText = document.querySelector("#ClockText")
const waetherContainer1 = document.getElementById("WeatherText1")
const waetherContainer2 = document.getElementById("WeatherText2")
const ImgButton = document.getElementById("imgButton")
let ImgNumber = String(Math.round(Math.random()*3))
//배경 색 미리 정하기
    document.body.style.background = `linear-gradient(blue,pink)`;
//로그인 값 받고 실행하기(이미 id가 존재할 경우 로그인 생략까지)

if(localStorage.getItem('Name') === null || localStorage.getItem('Name') === '') {
    function LogInButtonClick(event) {
        event.preventDefault();
        localStorage.setItem('Name', IdName.value);
        Hello.innerText = `Hello! ${IdName.value}`;
        document.getElementById('login').style.display = 'none';
        document.getElementById('buttons').style.display = 'block';
        document.getElementById(`IMG${ImgNumber}`).style.display = "inline"
        document.getElementById('todoForm').style.display = 'block';
        document.getElementById('imgButton').style.display = 'inline';

 }
} else {
    document.getElementById('login').style.display = 'none';
    Hello.innerText = `Hello! ${LoadingMyName}`
    document.getElementById('buttons').style.display = 'block';
    document.getElementById(`IMG${ImgNumber}`).style.display = "inline"
    document.getElementById('imgButton').style.display = 'inline';
    document.getElementById('todoForm').style.display = 'block';
}

LoginForm.addEventListener("submit", LogInButtonClick);
//여러 아이콘들의 각각의 기능 추가
//1.랜덤색깔 버튼
//색깔 버튼을 누를시 입력 색 2개 선정
function Setcolor(event2) {
    event2.preventDefault()
    document.getElementById('SelectColor').style.display = 'block';
    document.getElementById('SelectColor2').style.display = 'block';
    document.getElementById('colorbutton').style.display = 'inline';
    document.getElementById('ClockOnButton').style.display = 'none';
    document.getElementById('ClockOffButton').style.display = 'none';
    document.getElementById('WeatherOnButton').style.display = 'none';
    document.getElementById('WeatherOffButton').style.display = 'none';
}
Button1.addEventListener("click",Setcolor)
//색을 정해줬을시 그 색 입히기
function Setcolor2(event3) {
    event3.preventDefault();
    document.body.style.background = `linear-gradient(${Color[0].value}, ${Color[1].value})`;
    document.getElementById('SelectColor').style.display = 'none';
    document.getElementById('SelectColor2').style.display = 'none';
    document.getElementById('colorbutton').style.display = 'none';
}
SelectBackgroundForm.addEventListener("submit",Setcolor2)
//2.시계 Api 넣기
//2-1.클럭 버튼을 누를때 on/off 나오게 하기
function clock() {
    document.getElementById('ClockOnButton').style.display = 'block';
    document.getElementById('ClockOffButton').style.display = 'block';
    document.getElementById('SelectColor').style.display = 'none';
    document.getElementById('SelectColor2').style.display = 'none';
    document.getElementById('colorbutton').style.display = 'none';
    document.getElementById('WeatherOnButton').style.display = 'none';
    document.getElementById('WeatherOffButton').style.display = 'none';
}
Button2.addEventListener("click",clock)
//2-2 ON누르면 시계켜기
function Doclock() {
    const interval = setInterval(Didclock, 1000)
    document.getElementById('ClockOnButton').style.display = 'none';
    document.getElementById('ClockOffButton').style.display = 'none';
    function Didclock() {
        const date = new Date
        const year = date.getFullYear()
        const month = String(date.getMonth()+1).padStart(2,"0")
        const day = String(date.getDate()).padStart(2,"0")
        const hour = String(date.getHours()).padStart(2,"0")
        const minute = String(date.getMinutes()).padStart(2,"0")
        const second = String(date.getSeconds()).padStart(2,"0")
        ClockText.innerText = `Today is ${(year)}-${month}-${day}    ${hour}:${minute}:${second}`
}
    function DoNotclock() {
        clearInterval(interval)
        ClockText.innerText = ''
        document.getElementById('ClockOnButton').style.display = 'none';
        document.getElementById('ClockOffButton').style.display = 'none';
}
ClockOffButton.addEventListener('click',DoNotclock)
}
ClockOnButton.addEventListener('click',Doclock)
//2-3 OFF누르면 시계 끄기\
function WeatherButton() {
    document.getElementById('ClockOnButton').style.display = 'none';
    document.getElementById('ClockOffButton').style.display = 'none';
    document.getElementById('SelectColor').style.display = 'none';
    document.getElementById('SelectColor2').style.display = 'none';
    document.getElementById('colorbutton').style.display = 'none';
    document.getElementById('WeatherOnButton').style.display = 'block';
    document.getElementById('WeatherOffButton').style.display = 'block';
}
Button3.addEventListener("click",WeatherButton)
//ON버튼 누를시에 실행
const API_KEY = "68fcd9711ba185aea2ffc8255c0b54f8"
function onGeoSucess(position) {
    document.getElementById('WeatherOnButton').style.display = 'none';
    document.getElementById('WeatherOffButton').style.display = 'none';
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("You live in", lat, lon)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then(data =>{
       waetherContainer1.innerText = `your city is ${data.name}!`;
       waetherContainer2.innerText = `The city is ${data.weather[0].main}!`;
    })
}
function onGeoFail() {
    alert("Can't find you. No Weather fo")
}
function WeatherOn() {
    navigator.geolocation.getCurrentPosition(onGeoSucess,onGeoFail)
}
function WeatherOff() {
    document.getElementById('WeatherOnButton').style.display = 'none';
    document.getElementById('WeatherOffButton').style.display = 'none';
    waetherContainer1.innerText =""
    waetherContainer2.innerText =""
}
WeatherOnButton.addEventListener("click",WeatherOn)
WeatherOffButton.addEventListener("click",WeatherOff)
// 이미지 바꾸는 버튼
function changeImg() {
    document.getElementById(`IMG${ImgNumber}`).style.display = "none"
    ImgNumber = String(Math.round(Math.random()*3))
    document.getElementById(`IMG${ImgNumber}`).style.display = "inline"
}
ImgButton.addEventListener("click",changeImg)