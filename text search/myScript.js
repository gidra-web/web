$(document).ready(function () {
    // nakon učitavanja stranice pročitamo vrednost input polja ("refresh" stranice pamti prethodno unetu vrednost)
    // u slučaju da je tekstualno polje prazno (što jeste pri prvom učitavanju stranice) vrednost će biti prazan string
    var title = $("#fromTitle").val();

    // pozivamo glavnu metodu, koja podatke dobija sa servera
    filterByTitle(title);

    // metoda koja se poziva klikom na taster, ponovo čitamo vrednost input polja i pozivamo glavnu metodu kao u prethodnom slučaju
    $("#filterTitle").click(function () {
        var title = $("#fromTitle").val();
        filterByTitle(title);
    });
});

// glavna metoda, koja od servera zahteva podatke
function filterByTitle(title) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((json) => {
            // lokalna promenljiva u kojoj ćemo čuvati HTML kod za prikaz svake kartice
            var cardMarkup = "";
            
            // Za svaki "item" u "json" nizu objekata
            $.each(json, function (index, item) {
                // ako "title" atribut objekta sadrži string "title" (vrednost iz input polja)
                if ((item.title).includes(title)) {
                    // dodati "card" promenljivoj HTML kod za ispisivanje kartice
                    // zbog preglednosti, kod je izmešten u posebnu funkciju kojoj se objekat prosledi kao parametar
                    cardMarkup += cardData(item);
                }
            });
            // na kraju se sav HTML kod upiše u odgovarajući element
            $("#content").html(cardMarkup);
        });
}

function cardData(item) {
    return `<div class="col col-sm-12 col-lg-4 col-md-4 my-3">
                <div class="card h-100">
                    <div class="card-header">
                        <div class="bg-white p-2 border d-flex justify-content-between">
                            userID: ${item.userId} <span class="badge-pill badge-primary">${item.id}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-center">${item.body}</p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-primary w-100">${item.title}</a>
                    </div>
                </div>
            </div>`;
}