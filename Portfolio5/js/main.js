window.onload = init;

function init() {
    var fitties = fitty('.fit');

    for (var i = 0; i < fitties.length; i++)
    {
        fitties[0].fit();
    }
}