// Cole Corrente
// Pulse Internship Challenge
// 2/6/2018

const endpointUrl =
"https://dartmouthpulse.herokuapp.com/external/question/mock";
const accessKey = "rmpxvqnhd10wwbyx56a3dxiw27j3upxr";

var optimizedData = {};

// for testing counts of demogrpahics and selections
var testCounts = {};

var httpClient = function() {
    this.get = function(url, key, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                callback(httpRequest.responseText);
            }
        };

        httpRequest.open( "GET", url, true );
        httpRequest.setRequestHeader("x-access-token", key);
        httpRequest.send( null );
    };
};

/**
* Called on user click of button on webpage
*/
function runProgram(){
    initProgram();
    getJSON(endpointUrl, accessKey, function(jsonData){
        var selectedDemographic = document.getElementById("demoSelector").value;
        optimizeData(jsonData, selectedDemographic);
        displayData();
        testData();
    });
}

/**
* Use the httpClient to get JSON from endpoint
* @param  {String}   url      endpoint Url
* @param  {String}   key      the access token for the endpoint
* @param  {Function} callback   called when json data is gathered from endpoint
*/
function getJSON(url, key, callback) {
    var client = new httpClient();
    client.get(url, key, function(response){
        var jsonData = JSON.parse(response);
        callback(jsonData);
    });
}

/**
* Optimize provided data by organizing it by the provided demographic
* @param  {<String:<String:Int>}   data        json data
* @param  {String}   demographic       the selected demographic to optimize data
*/
function optimizeData(data, demographic){
    data.forEach((item,index) => {
        // get the selction from the data item
        // default value "no selection" if empty
        var itemSelection = item.selections.length > 0 ?
        item.selections[0] : "no selection";

        // list of data item demographics
        var itemDemographics = item.demographics;
        // check if demographic of data item is null - default value is ""
        var demographicValues = itemDemographics[demographic] != null ?
        itemDemographics[demographic] : "";
        // demographics of data item should be non empty - length > 0
        // dauflt value "no demographic" otherwise
        var itemDemographic = demographicValues.length > 0
        ? demographicValues[0] : "no demographic";

        if (optimizedData[itemDemographic] == null) {
            optimizedData[itemDemographic] = { itemSlection:1 };
        } else {
            if (optimizedData[itemDemographic][itemSelection] == null) {
                optimizedData[itemDemographic][itemSelection] = 1;
            } else {
                optimizedData[itemDemographic][itemSelection] += 1;
            }
        }

        // include data in "demographicBreakdown"
        optimizedData.demographicBreakdown[itemDemographic] =
            optimizedData.demographicBreakdown[itemDemographic] == null ? 1 :
            optimizedData.demographicBreakdown[itemDemographic] += 1;
        optimizedData.demographicBreakdown.all += 1;

        // include data in "all"
        optimizedData.all[itemSelection] =
            optimizedData.all[itemSelection] == null
            ? 1 : optimizedData.all[itemSelection] += 1;

        /*
        FOR TESTING
        */

        // for testing demographic values
        testCounts[itemDemographic] =
            testCounts[itemDemographic] == null
            ? 1 : testCounts[itemDemographic] + 1;

        // for testing selection values
        testCounts[itemSelection] =
            testCounts[itemSelection] == null
            ? 1 : testCounts[itemSelection] + 1;

        // for testing "all" value of demographicBreakdown
        testCounts.all += 1;
    });
}

/**
* initialize and clear variables, html, and console
*/
function initProgram(){
    optimizedData = {
        "all":{},
        "demographicBreakdown":{
            "all":0
        }
    };
    testCounts = {
        "all":0
    };

    console.clear();
    document.getElementById("responseArea").innerHTML = "Processing...";
    document.getElementById("testArea").innerHTML = "";
}

/**
* present the optimized data to the user
*/
function displayData(){
    document.getElementById("responseArea").innerHTML =
    JSON.stringify(optimizedData, null, 4);
}

/**
* Test data and print results to log
*/
function testData(){
    var allPass = true;

    console.log("%cTesting 'demographicBreakdown'...", "color: blue");
    for (var item in optimizedData){
        // dont treat demogrpahicBreakdown as a demographic to be tested
        if (item != "demographicBreakdown") {
            var test = optimizedData.demographicBreakdown[item]
                    == testCounts[item];
            if (test) {
                console.log("%cPASS    - " + item + "        " +
                optimizedData.demographicBreakdown[item]
                + " == "  + testCounts[item], "color: green");
            } else {
                allPass = false;
                console.log("%cFAIL    - " + item + "        " +
                optimizedData.demographicBreakdown[item]
                + " != "  + testCounts[item], "color: red");
            }
        }
    }

    console.log("%cTesting 'all'...", "color: blue");
    for (var item in optimizedData.all) {
        var test = optimizedData.all[item] == testCounts[item];
        if (test) {
            console.log("%cPASS    - " + item + "        " +
            optimizedData.all[item] + " == "
            + testCounts[item], "color: green");
        } else {
            allPass = false;
            console.log("%cFAIL    - " + item + "        " +
            optimizedData.all[item] + " != "
            + testCounts[item], "color: red");
        }
    }

    if (allPass){
        document.getElementById("testArea").innerHTML =
        "All Tests Pass - View Javascript Console for Information";
        document.getElementById("testArea").style.color = "green";
    } else {
        document.getElementById("testArea").innerHTML =
        "One or More Tests Failed - View Javascript Console for Information";
        document.getElementById("testArea").style.color = "red";
    }
}
