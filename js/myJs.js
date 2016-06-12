/*

Query Details:
    select: @attrRes  string;
    where: @res   string;

Expected return value:
    result: @pong[number of instances][attributes]   array of arrays;  
            see example in line 221

*/

var checkAttr = [];

var countArray = [];

$(document).ready(function(){
  var firstcount = 0;
  $("#or0").click(function(){
    firstcount = firstcount + 1;
    var smallQuery = $(`
    <div class="row" style="">
      <div class="col-sm-1" id="and">
          <h4>&nbsp or</h4>
      </div>
      <div class="col-sm-4">
          <select class="form-control" id=selAttr0`+firstcount+`>
              <option>GRE Analytical Writing</option>
              <option>GRE Verbal</option>
              <option>GRE Quantitative</option>
          </select>
      </div>
      <div class="col-sm-1">
          <select class="form-control" id=selMath0`+firstcount+`>
              <option>></option>
              <option>
                  <</option>
                      <option>=</option>
                      <option>>=</option>
                      <option>
                          <=</option>
          </select>
      </div>
      <div class="col-sm-2">
          <select class="form-control" id=selLog0`+firstcount+`>
              <option>value</option>
              <option>sum</option>
              <option>avg</option>
              <option>min</option>
              <option>max</option>
          </select>
      </div>
      <div class="col-sm-2">
          <input type="text" class="form-control" id=attValue0`+firstcount+`>
      </div>

    </div>
    `);
    $('#well0').append(smallQuery);
    countArray[0] = firstcount;
  });

});


var count = 0;


function addAND() {

  count = count + 1;
  var smallcount = 0;
  var query = $(`
    <div class="well well-sm" style="text-align:center">
    AND
    </div>
    <div class="well" id=well`+count+`>
    <div class="row" style="margin-bottom:6px">
        <div class="col-sm-1">
        </div>
        <div class="col-sm-4">
            <select class="form-control" id=selAttr`+count+`0>
                <option>GRE Analytical Writing</option>
                <option>GRE Verbal</option>
                <option>GRE Quantitative</option>
            </select>
        </div>
        <div class="col-sm-1">
            <select class="form-control" id=selMath`+count+`0>
                <option>></option>
                <option>
                    <</option>
                        <option>=</option>
                        <option>>=</option>
                        <option>
                            <=</option>
            </select>
        </div>
        <div class="col-sm-2">
            <select class="form-control" id=selLog`+count+`0>
                <option>value</option>
                <option>sum</option>
                <option>avg</option>
                <option>min</option>
                <option>max</option>
            </select>
        </div>
        <div class="col-sm-2">
            <input type="text" class="form-control" id=attValue`+count+`0>
        </div>
        <div class="col-sm-1">
            <button class="btn btn-default btn-md" id=or`+ count +`><span class="glyphicon glyphicon-plus"></span>&nbsp OR </button>
        </div>
    </div>
    </div>
    `)
  $("#Clauses").append(query);

  $("#or"+count).click(function() {
    smallcount = smallcount + 1;
    var temp = $(this).attr('id').substring(2);
    var smallQuery = $(`
    <div class="row" style="">
      <div class="col-sm-1" id="or">
          <h4>&nbsp or</h4>
      </div>
      <div class="col-sm-4">
          <select class="form-control" id=selAttr`+temp+smallcount+`>
              <option>GRE Analytical Writing</option>
              <option>GRE Verbal</option>
              <option>GRE Quantitative</option>
          </select>
      </div>
      <div class="col-sm-1">
          <select class="form-control" id=selMath`+temp+smallcount+`>
              <option>></option>
              <option>
                  <</option>
                      <option>=</option>
                      <option>>=</option>
                      <option>
                          <=</option>
          </select>
      </div>
      <div class="col-sm-2">
          <select class="form-control" id=selLog`+temp+smallcount+`>
              <option>value</option>
              <option>sum</option>
              <option>avg</option>
              <option>min</option>
              <option>max</option>
          </select>
      </div>
      <div class="col-sm-2">
          <input type="text" class="form-control" id=attValue`+temp+smallcount+`>
      </div>

    </div>
    `);
    $("#well"+temp).append(smallQuery);
    console.log(temp + " c is "+count + " s is" + smallcount);
    countArray[temp] = smallcount;

  });
  
}

var res = "";
var attrRes = " ( ";
var ping = ""
var table = "GRE_Query"

function View() {

    checkAttr = [];

    var attrRes = " ";
    var cnt = 0;
    $("input:checkbox[name=test]:checked").each(function () {
        checkAttr.push($(this).val());
        var tempAttr =  $(this).val();
        if (cnt == 0) {
          attrRes = attrRes + tempAttr;
          cnt += 1;
        } else {
          attrRes = attrRes + ", " + tempAttr;
          cnt += 1;
        }
    });

    attrRes = attrRes
    res = "";
    for (i=0;i<=count;i++) {
      res = res + " AND (";
      if (countArray[i] == undefined) {
        countArray[i] = 0;
      }
      res1 = "";
      for (j=0;j<=countArray[i];j++) {
        res1 = res1 + " OR ( ";
        res1 = res1 + $("#selAttr" + i + j).val() + " ";
        res1 = res1 + $("#selMath" + i + j).val() + " ";
        if ($("#selLog" + i + j).val() == "value") {
          res1 = res1 + $("#attValue" + i + j).val();
        }
        else {
          res1 = res1 + " " + $("#selLog" + i + j).val() + "(" + $("#selAttr" + i + j).val() + ")";
        }
        res1 = res1 + " )"
      }
      res1 = res1.substring(3);
      res = res + res1; 
      res = res + " )"
    }
    res = res.substring(4)
    console.log(res);

    ping = "SELECT" + attrRes + " FROM " + table + " WHERE " + res

    $("#prediction").html(ping);
}

// var pong = [];

// function Ping2Pong(ping) {
//   pong.push({EmployID: "001", Program: "EE", Gender: "Male"  , Ethnicity: "White", Country: "Korea"});
//   pong.push({EmployID: "002", Program: "CS", Gender: "Female", Ethnicity: "Black", Country: "China"});
//   pong.push({EmployID: "003", Program: "CE", Gender: "Female", Ethnicity: "Asian", Country: "Inida"});
//   pong.push({EmployID: "004", Program: "EE", Gender: "Male"  , Ethnicity: "White", Country: "United States"});
//   pong.push({EmployID: "005", Program: "CS", Gender: "Male"  , Ethnicity: "Asian", Country: "Iran"});  
// }


function Search() {
  $("#title").empty();
  $("#body").empty();
  if (ping == "") {
    document.getElementById("txtHint").innerHTML = "";
    return;
  } else {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
      }
    };
    xmlhttp.open("GET", "../connector/mysql-connector-to-schema-eecs_499.php?q=" + ping, true);
    xmlhttp.send(); 
  }
}

// function Search() {

//   $("#title").empty();
//   $("#body").empty();
  
//   pong = $.ajax({
//     method: "GET",
//     url: "../mysql-connector-to-schema-eecs_499/py",
//     dataType: "script"
//   })
//   // Ping2Pong(ping)

//   var people = pong.length;

//   console.log(checkAttr.length);
  
//   for (p=0;p<checkAttr.length;p++) {

//     var tempTitle = $(`<th style="text-align:center">`+checkAttr[p]+`</th>`);
//     $("#title").append(tempTitle);
//   }

//   for (m=0;m<people;m++){
//     var tempBody = "<tr>";
//     for (q=0;q<checkAttr.length;q++) {
//       console.log(pong[m][q]);
//       tempBody = tempBody + "<td>" + pong[m][checkAttr[q]] + "</td>";
//       console.log(tempBody);
//       // $("body1").append(tempBody);
//     }
//     // tempBody = tempBody + "</tr>";
//     tempBody = tempBody + pong;
//     // console.log(tempBody);
//     $("#body").append(tempBody);
//   }

// }