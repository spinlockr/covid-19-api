function generatestats(){

        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Australia");
        xhr.setRequestHeader("x-rapidapi-key", "de9f8976bemshccc395ff23e72d2p17dc44jsn25bbfec04935");
        xhr.setRequestHeader("x-rapidapi-host", "covid-19-coronavirus-statistics.p.rapidapi.com");
        xhr.send(data);

        xhr.addEventListener("readystatechange", function () {
	
                if (this.readyState === this.DONE) {
                        
                        var parsedJSON = JSON.parse(this.responseText);
                        // console.log(parsedJSON);

                        var con = document.getElementById('container'); 
                
                        //calling the function
                        // con.innerHTML = generateInfoLine('deaths','Deaths: ','511278');
                        
                        var covidStatsJSON = parsedJSON.data.covid19Stats;
                        var casestotal = 0;
                        

                        for(var i = 0; i < covidStatsJSON.length; i++){
                                // console.log(covidStatsJSON[i]);
                                con.innerHTML += generateProvinceHTML(covidStatsJSON[i]);
                                casestotal += covidStatsJSON[i].confirmed;
                        }

                        console.log(casestotal);

                };//end if

        });//end xhr

}//end genstat
        
// the function
function generateProvinceHTML(covidstatsProvinceJSON) {

        var generatedHTML = `<div class="province"><div class="provincedata"><p>${covidstatsProvinceJSON.province}</p></div>`;

        generatedHTML += onelineHTML('confirmed','Confirmed cases: ',covidstatsProvinceJSON.confirmed);

        generatedHTML += onelineHTML('deaths','Deaths: ',covidstatsProvinceJSON.deaths);

        generatedHTML += onelineHTML('recovered','Recovered: ',covidstatsProvinceJSON.recovered);

        generatedHTML += `</div>`;

        return generatedHTML;
}

function onelineHTML(sClassname,sLabel,sData) {
      
        if(sData == null) {
                sData = 'n/a';
        }

        var generatedOnelineHTML = `<div class="onelinecontainer">
                                <div class="onelinelabel ${sClassname}text">
                                        <p>${sLabel}</p>
                                </div>
                                <div class="onelinedata ${sClassname}data" id="id${sClassname}">
                                        <p>${sData}</p>
                                </div>
                        </div>`;
        return generatedOnelineHTML;
}
