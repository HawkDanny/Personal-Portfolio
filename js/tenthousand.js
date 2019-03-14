var counterElement;
var input;
var counter;
var interacted;
var blurring;

window.onload = function() {
    counterElement = document.getElementById("counter");
    input = document.getElementById("input");
    document.getElementById("form").addEventListener("click", ClickedOther, false); 
    input.onchange = Reset;
    setInterval(Update, 1000);
    counter = 10000;
    interacted = false;
    blurring = false;
}

window.onfocus = function() {
    if (blurring)
    {
        counter = 10000;
        counterElement.innerHTML = counter;
    }
    blurring = false;
}

window.onblur = function() {
    blurring = true;
}

function Update()
{
    if (counter === 0)
    {
        if (!interacted)
        {
            counterElement.style = "pointer-events: auto;";
            counterElement.innerHTML = "<a href='https://www.instagram.com/smalldogsbehindlargerobjects/'>Welcome</a>"
        }
        return;
    }
    counter--;
    counterElement.innerHTML = counter;
}

function Reset()
{
    interacted = true;
    var value = input.value;
    
    if (value > 10000)
        value = 10000
    else if (value < 0)
        value = 0;

    input.value = "";

    counter = value;
    counterElement.innerHTML = counter;
}

function FormSubmit()
{
    interacted = true;
    console.log("submitted");
}

function ClickedOther(event) {
    event.stopPropagation();
}

function Clicked()
{
    interacted = true;
    counter = 10000;
    counterElement.innerHTML = counter;
}