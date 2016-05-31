/*

Query Details:
    select: @attrRes  string;
    where: @res   string;

Expected return value:
    result: @column[number of instances][number of attributes]   array of arrays; 

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

function View() {

    checkAttr = [];

    var attrRes = " ( ";

    $("#title").empty();
 
    $("input:checkbox[name=test]:checked").each(function () {
        checkAttr.push($(this).val());
        var tempAttr =  $(this).val();
        
        attrRes = attrRes + tempAttr + " ";
    });

    attrRes = attrRes + ")"

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
    $("#prediction").html("<br> Select" + attrRes + "<br> Where " + res);
}



var column = []; 
column.push(["test01","test02","test03","test04","test05"]);
column.push(["test11","test12","test13","test14","test15"]);
column.push(["test21","test22","test23","test24","test25"]);
column.push(["test31","test32","test33","test34","test35"]);
column.push(["test41","test42","test43","test44","test45"]);


function Search() {

  var people = column.length;

  console.log(checkAttr.length);
  
  for (p=0;p<checkAttr.length;p++) {

    var tempTitle = $(`<th style="text-align:center">`+checkAttr[p]+`</th>`);
    $("#title").append(tempTitle);
  }

  for (m=0;m<people;m++){
    var tempBody = "<tr>";
    for (q=0;q<checkAttr.length;q++) {
      console.log(column[m][q]);
      tempBody = tempBody + "<td>" + column[m][q] + "</td>";
      console.log(tempBody);
      // $("body1").append(tempBody);
    }
    tempBody = tempBody + "</tr>";
    // console.log(tempBody);
    $("#body").append(tempBody);
  }

}
