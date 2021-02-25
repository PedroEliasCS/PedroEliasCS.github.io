function chamaBackend() {
    $.ajax({
        url: `http://localhost:3000/login/authentic`,   
        headers: {
            'content-type': 'application/json'
        },
        crossDomain: true,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if(data === true){
                document.getElementById('btnLogin').style.display = "none"
                // caso esteja logado não aparecera botão de login
            }

        },
        error: function () {
            console.log("error");
        }
    });
}

 $(document).ready(() => {
    chamaBackend()
 })