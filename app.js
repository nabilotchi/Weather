window.addEventListener("load", ()=> {
let long;
let lat;
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(Position => {
        long = Position.coords.longitude;
        lat = Position.coords.latitude;

        const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={d5e7bff776c9a108541f92a6bbc72089}/${lat},${long}`;
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
    });
}
});