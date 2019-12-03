// navigator.geolocation.getCurrentPosition((position) => { 
// 	console.log(position.coords.latitude)
// 	console.log(position.coords.longitude)
// })

// const id = navigator.geolocation.watchPosition(position => {
// 	console.log(position.coords.longitude)
// })

// setTimeout (() => {
// 	navigator.geolocation.clearWatch(id)
// }, 10 * 1000)

// navigator.geolocation.watchPosition(position => {
// 	console.log(position)
// }, error => {
// 	console.error(error)
// }, {
// 	timeout: 1000,
// 	maximumAge: 1000,
// 	enableHighAccuracy: true
// })
var x = document.getElementById('x');

function getlocation() {
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(showPosition);
}else {
	x.innerHTML = "NOT SUPPORTED";
}
}

function showPosition(position) {
	var data = "https://maps.googleapis.com/maps/api/geacode/json?latlng="+position.coords.latitude+"."+position.coords.longitude+"&sensor=true";
	x.innerHTML = data;
	console.log(data);
}