/*jslint browser:true */
"use strict";

function addMonths(elem) {
var annualUseKw=0, dailyUseKw=0, i=0, x=0;

var months=document.getElementById(elem).getElementsByTagName("input");


    for (i=0; i<months.length; i++){
        x= Number(months[i].value);
        annualUseKw += x;

        } //end loop

    dailyUseKw = annualUseKw/365

    return dailyUseKw;
    }


    function sunHours() {
var hrs;
var theZone = document.forms.solarForm.zone.selectedIndex;
theZone +=1;
switch (theZone) {
    case 1:
        hrs = 6;
        break;
    case 2:
        hrs = 5.5;
        break;
    case 3:
        hrs = 5;
        break;
    case 4:
        hrs = 4.5;
        break;
    case 5:
        hrs=4;
        break;
    case 6:
        hrs=3.5;
        break;
    default:
        hrs=0;
// end switch
}
return hrs;
    }// end function

function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    var x = [power,name];
    return x;


}






function calculateSolar(){

var dailyUseKw = addMonths('mpc');
//console.log(dailyUseKw)

var sunHoursPerDay = sunHours();
//console.log(sunHoursPerDay);

var minKwNeeds = dailyUseKw/sunHoursPerDay;
//console.log(minKwNeeds);

var realKWNeeds = minKwNeeds * 1.25;
//console.log(realKWNeeds);

var realWattNeeds = realKWNeeds * 1000;
//console.log(realWattNeeds);

var panelInfo = calculatePanel();
var panelOutput = panelInfo[0];
var panelName = panelInfo[1];
//console.log(panelOutput);
//console.log(panelName);

var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
//console.log(panelsNeeded);

var feedback="";
    feedback +="<p> Based on your average Daily use of "+Math.round(dailyUseKw)+" Kwh, you would need to purchase "+ panelsNeeded +" "+ panelName+ " in order to offset 100% of your electric bill.</p>";
    feedback +="<h2>Additional Details</h2>";
    feedback += "<p>Average daily eletric consumptions: "+ Math.round(dailyUseKw)+" Kwh per day</p>";
    feedback += "<p>Average sunshine per day: "+sunHoursPerDay+" hours</p>";
    feedback += "<p>Realistic watts needed per hour: "+ Math.round(realWattNeeds)+" watts/hours.</p>"
    feedback += "<p>The "+panelName+" panel you slected generates about "+panelOutput+" watts per hour</p>"

    document.getElementById('feedback').innerHTML=feedback;



    }
