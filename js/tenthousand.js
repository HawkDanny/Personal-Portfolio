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
    if (counter === 1)
    {
        if (!interacted)
        {
            counterElement.style = "pointer-events: auto;";
            counterElement.innerHTML = "<a href='https://www.instagram.com/smalldogsbehindlargerobjects/'>Welcome</a>"
        }
        else
            counterElement.innerHTML = "Done";
        return;
    } else if (counter === 9000 && !interacted)
    {
        counterElement.style = "color: #666666;"
    } else if (counter === 5000 && !interacted)
    {
        counterElement.style = "color: #EEEEEE;"
    } else if (counter === 1000 && !interacted)
    {
        counterElement.style = "color: #FFFFFF;"
    }
    counter--;
    counterElement.innerHTML = counter;
}

function Reset()
{
    interacted = true;
    var value = input.value;
    
    if (value > 10000)
    {
        interacted = false;
        value = 10000;
    }
    else if (value < 1)
        value = 1;

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
    interacted = false;
    counter = 10000;
    counterElement.innerHTML = counter;
}