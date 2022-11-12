var view = {
    //метод поллучает строку и выводит его в области сообщений
    displayMessage: function(mes) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = mes;
    },

    displayHit: function(location) {
        var hit = document.getElementById(location);
        hit.setAttribute("class", "hit");       
    },

    displayMiss: function(location) {
        var miss = document.getElementById(location);
        miss.setAttribute("class", "miss");
    }
}