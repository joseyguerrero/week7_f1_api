makeTable = () => {
    const season = document.getElementById("season").value;
    const round = document.getElementById("round").value;
    const errorMsg = document.getElementById("errorMsg");
    if (errorMsg.getAttributeNames.length <= 1) {
        errorMsg.hidden = true;
    }
    fetch(`http://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    .then(response => response.json())
    .then(data => {
        const myTable = document.getElementById("myTable");
        myTable.hidden = false;
        let oldCells = document.getElementsByClassName('oldValue');
        while(oldCells[0]) {
            oldCells[0].parentNode.removeChild(oldCells[0]);
        }
        const rows = document.getElementsByClassName("racersInfo")
        myTable.removeAttribute("hidden")
        for (let i = 0; i < 7; i++) {
            let first_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;
            let last_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;
            let driver_url = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.url;
            let nationality = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality;
            let sponsor = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name;
            let points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
            let full_name = `${first_name} ${last_name}`
            const info = [full_name, nationality, sponsor, points]
            
            for (let j = 0; j < info.length; j++) {
                let cell = rows[i].insertCell();
                if (j == 0) {
                    let a = document.createElement('a');
                    let text = document.createTextNode(full_name)
                    a.classList.add("nav-link")
                    a.appendChild(text);
                    a.href = driver_url;

                    cell.appendChild(a);
                } else {
                cell.innerHTML = info[j];
                }
                cell.classList.add("oldValue");
                
            }

        }
    }).catch(error => {
        let errorMsg = document.getElementById("errorMsg");
        const myTable = document.getElementById("myTable");
        errorMsg.hidden = false;
        myTable.hidden = true;

    })
}