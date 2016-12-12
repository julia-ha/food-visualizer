document.addEventListener("DOMContentLoaded", main);

function main() {
	console.log("DOM Content Loaded");

	var goBtn = document.getElementById("goBtn");
	goBtn.addEventListener("click", function(evt){
		evt.preventDefault();
		var req = new XMLHttpRequest();
		var user = document.getElementById("hiddenUser").value;
		console.log(user);
		//var url = "http://i6.cims.nyu.edu:15401/users/" + user + "/api";
		var url = "http://localhost:3000/users/" + user + "/api";

		req.open('GET', url, true);
		req.addEventListener('load', function handleResponse() {
			console.log("event listener");
			if (this.status >= 200 && this.status < 400) {
				console.log("status ok");
    			var data = JSON.parse(req.responseText);
    			console.log(body);

    			var water = 0,
    				land = 0,
    				energy= 0;

    			data.forEach(function(obj){
    				if (obj.foodType === "Fruits & Vegetables"){
    					water += 4;
    					land += 8;
    					energy += 20;

    				} else if (obj.foodType === "Legumes & Beans"){
    					water += 2;
    					land += 2;
    					energy += 4;

    				} else if (obj.foodType === "Grains & Cereals"){
    					water += 10;
    					land += 6;
    					energy += 20;

    				} else if (obj.foodType === "Nuts & Seeds"){
    					water += 60;
    					land += 3;
    					energy += 30;

    				} else if (obj.foodType === "Seafood, Poultry, & Eggs") {
    					water += 20;
    					land += 6;
    					energy += 14;

    				} else if (obj.foodType === "Red Meats & Pork") {
    					water += 40;
    					land += 40;
    					energy += 60;

    				} else { //dairy products
    					water += 20;
    					land += 20;
    					energy += 40;
    				}
    			});

    			document.getElementById('body').style.backgroundSize = "100% "+energy+"px, 100% "+land+"px, 100% "+water+"px";
    			document.getElementById('body').style.backgroundPosition = "0 0px, 0 "+energy+"px, 0 "+(energy+land)+"px";

    		}
		});
		req.send();
	});

	document.getElementById('deleteBtn').disabled = true;
	var items = document.querySelectorAll('.itemsList');
	console.log(items);

	for (var i = 0; i < items.length; i++){
		items[i].addEventListener('change', disableDelete);
	}
	function disableDelete(e) {
		document.getElementById('deleteBtn').disabled = !this.checked
	};


};
