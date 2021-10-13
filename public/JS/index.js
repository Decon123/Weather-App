
//response.json()--- convert the fetch data into js object

const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("#location");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

weatherForm.addEventListener("submit",(event)=>{
    //preventing what we do default--It means when we refresh the page prevent it
    event.preventDefault();

    const location = locationInput.value;

    message1.textContent = "Loading......";
    message2.textContent = "";
    message1.classList.remove("error");
    
    if(location.length === 0){
        message1.textContent = "Please provide an address";
        message1.classList.add("error");
    }else {
        fetch("/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            message1.textContent = data.error;
        }else{
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    });
});
    }
    

    
});