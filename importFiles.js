fetch("./resrcsPaths.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(let i = 0; i < data.paths.length; i++){
            document.getElementById("loadPoint").innerHTML += "<a href='" + data.paths[i] + "'>" + data.paths[i] + "</a><br/>";
        }
    })
