$(document).ready(function(){
    fetch("db.json").then(response => response.json())
    .then(myJson => {
        // console.log(myJson);

        var tableData = '<table class="table thead-light table-bordered table-hover table-striped">' +
                        '<tr><th>P</th><th>Team</th><th>W</th><th>L</th><th>GB</th><th>Str</th><th>Streak</th><th>Poslednjih 5</th><th>Pct</th></tr>';
        $.each(myJson.teams, function(index, nbaTeam){
            tableData += '<tr><td>' + nbaTeam.id + '</td><td>' + '<img src="' + nbaTeam.logo + '" class="img-fluid" alt="logo">' +
            ' ' + nbaTeam.name + '</td><td>' + nbaTeam.played + '</td><td>' + nbaTeam.wins + '</td><td>' + 
            nbaTeam.losses + '</td><td>' + nbaTeam.gamesBehind + '</td><td>' + nbaTeam.streak + '</td><td>' + 
            lastFiveStyled(nbaTeam.lastfive) + '</td><td>' + nbaTeam.winPercent + '</td></tr>';
        });
        nbaTable.innerHTML += tableData + '</table>';
    });
});

function lastFiveStyled(lastFive) {
    let streakString = "";
    for (i=0; i < lastFive.length; i++) {
        if (lastFive[i] == 'W'){
            streakString += '<span class="rounded-circle bg-success text-white" style="display:inline-block; height:20pt;width:20pt;text-align:center;">'
            + lastFive[i] + '</span>';
        }
        else{
            streakString += '<span class="rounded-circle bg-danger text-white" style="display:inline-block; height:20pt;width:20pt;text-align:center;">'
            + lastFive[i] + '</span>';
        }
    }
    return streakString;
}