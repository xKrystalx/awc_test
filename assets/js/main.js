function showEditBox(streamerString){

    let streamer = JSON.parse(streamerString);
    console.log(streamer);

    if(streamer != null){
    }
    let modal = document.getElementById("editModal");

    Object.entries(streamer).forEach(([key, value]) => {
        if(key == "partnered" || key == "mature"){
            modal.querySelector('#' + key).checked = streamer[key];
            modal.querySelector('#' + key).setAttribute("name", key)
        }
        else{
            modal.querySelector('#' + key).setAttribute("value", streamer[key]);
            modal.querySelector('#' + key).setAttribute("name", key);
        }
    }); 
}