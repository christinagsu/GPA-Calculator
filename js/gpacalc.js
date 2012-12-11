function insertInitialRows() 
{ 
    for (x=1;x<=5;x++) insertRow(); 
} 
function showFirstColumn(rowNum, row) 
{ 
    var a = row.insertCell(0); 
    a.nowrap=true; 
    a.setAttribute('align','center'); 
    if (rowNum<10) displayedRowNum=rowNum+1+" "; 
    else displayedRowNum=rowNum+1+" "; 
    var displayedRowNum = document.createTextNode(displayedRowNum); 
    var textBox1 = document.createElement('input'); 
    textBox1.setAttribute('type','text'); 
    textBox1.setAttribute('name','course'+rowNum); 
    textBox1.setAttribute('id','course'+rowNum); 
    textBox1.setAttribute('size','6'); 
    a.appendChild(displayedRowNum); 
    a.appendChild(textBox1); 
    return a; 
} 
function showSecondColumn(rowNum, row) 
{ 
    var b = row.insertCell(1); 
    b.setAttribute('align','center'); 
    var textBox2 = document.createElement('input'); 
    textBox2.setAttribute('type','text'); 
    textBox2.setAttribute('name','credits'+rowNum); 
    textBox2.setAttribute('id','credits'+rowNum); 
    textBox2.setAttribute('size','3'); 
    textBox2.onblur=tallyCredits; 
    b.appendChild(textBox2); 
    return b; 
} 
function showThirdColumn(rowNum, row) 
{ 
    var c = row.insertCell(2); 
    c.setAttribute('align','center'); 
    var select1 = document.createElement('select'); 
    select1.setAttribute('name','letterGrade'+rowNum); 
    select1.setAttribute('id','letterGrade'+rowNum); 
    select1.onchange=tallyCredits; 
    var newOption = document.createElement('option'); 
    newOption.value = '4.3'; 
    newOption.text = 'A+'; 
    select1.options.add(newOption, 0); 
    newOption = document.createElement('option'); 
    newOption.value = '4.0'; 
    newOption.text = 'A'; 
    select1.options.add(newOption, 1); 
    newOption = document.createElement('option'); 
    newOption.value = '3.7'; 
    newOption.text = 'A-'; 
    select1.options.add(newOption, 2); 
    newOption = document.createElement('option'); 
    newOption.value = '3.3'; 
    newOption.text = 'B+'; 
    select1.options.add(newOption, 3); 
    newOption = document.createElement('option'); 
    newOption.value = '3.0'; 
    newOption.text = 'B'; 
    select1.options.add(newOption, 4); 
    newOption = document.createElement('option'); 
    newOption.value = '2.7'; 
    newOption.text = 'B-'; 
    select1.options.add(newOption, 5); 
    newOption = document.createElement('option'); 
    newOption.value = '2.3'; 
    newOption.text = 'C+'; 
    select1.options.add(newOption, 6); 
    newOption = document.createElement('option'); 
    newOption.value = '2.0'; 
    newOption.text = 'C'; 
    select1.options.add(newOption, 7); 
    newOption = document.createElement('option'); 
    newOption.value = '1.7'; 
    newOption.text = 'C-'; 
    select1.options.add(newOption, 8); 
    newOption = document.createElement('option'); 
    newOption.value = '1.0'; 
    newOption.text = 'D'; 
    select1.options.add(newOption, 9); 
    newOption = document.createElement('option'); 
    newOption.value = '0.0'; 
    newOption.text = 'F'; 
    select1.options.add(newOption, 10); 
    c.appendChild(select1); 
    return c; 
} 
function showFourthColumn(rowNum, row) 
{ 
    var d = row.insertCell(3); 
    d.setAttribute('align','center'); 
    var textBox3 = document.createElement('input'); 
    textBox3.setAttribute('type','text'); 
    textBox3.setAttribute('size','5'); 
    textBox3.setAttribute('name','qualityPoints'+rowNum); 
    textBox3.setAttribute('id','qualityPoints'+rowNum); 
    textBox3.readOnly=true; 
    d.appendChild(textBox3); 
    return d; 
} 
function insertRow() 
{ 
    var myTable = document.getElementById("GPAOverallTable"); 
    document.getElementById('deleteRowLink').style.display = 'block'; 
    var rowNum = myTable.rows.length+0; // number of rows not including header
    var newRow = myTable.insertRow(rowNum); 
    var x=myTable.tBodies[0].rows.length; 
    var a=showFirstColumn(rowNum, newRow); 
    var b=showSecondColumn(rowNum, newRow); 
    var c=showThirdColumn(rowNum, newRow); 
    var d=showFourthColumn(rowNum, newRow); 
    var curRows=(x - 1); 
} 
function deleteRow() 
{ 
    var myTable = document.getElementById("GPAOverallTable"); 
    var rowNum = myTable.rows.length; // number of rows not including header
    var courseNum = rowNum-6; 
    if (document.getElementById("course"+courseNum).value!="" || document.getElementById("credits"+courseNum).value!="" || document.getElementById("qualityPoints"+courseNum).value!="") 
    { 
        var confirmation=confirm("You have filled out some fields for course #"+courseNum+". Are you sure you would like to remove this course?"); 
    } 
    else confirmation=true; 
    if (confirmation==true) 
    { 
        myTable.deleteRow(courseNum); 
        if (rowNum==8)document.getElementById('deleteRowLink').style.display = 'none'; 
    } 
    else alert ("Course not deleted."); 
    // <!--if (rowNum==1) document.gpaForm.deleteRowButton.disabled=true;--> <!--disable 'delete row' button if only header left--> 
    tallyCredits(); 
} 
function tallyCredits() { 
    var totalCredits, totalCreditPoints, GPA, courseNum; 
    totalCredits = 0; 
    totalCreditPoints = 0; 
    var myTable = document.getElementById("GPAOverallTable"); 
    var numcourses=myTable.tBodies[0].rows.length; //all except for header and footer row 
    for (x=0;x<=numcourses-1;x++) 
    { 
        if (document.getElementById("credits"+x).value!="") { 
            if ( (isNaN(document.getElementById("credits"+x).value)) || (eval(document.getElementById("credits"+x).value) > 12)) { 
                window.alert ("Credits for course #"+x+" must be a number from 1-12","NMU GPA") 
                document.getElementById("credits"+x).focus() 
                return (false); 
            } 
            else 
            { 
                document.getElementById("qualityPoints"+x).value = (document.getElementById("credits"+x).value*document.getElementById("letterGrade"+x).value).toString().substr(0,5); 
                totalCreditPoints+=eval(document.getElementById("qualityPoints"+x).value); 
                totalCredits += eval(document.getElementById("credits"+x).value); 
            } 
        } 
    } 
    document.gpaForm.totalCredits.value = totalCredits; 
    totalCreditPoints = totalCreditPoints.toString(); 
    document.gpaForm.totalQualPoints.value = totalCreditPoints.substr(0,5); 
    
    //calc GPA with totals 
    if (document.gpaForm.totalCredits.value!= "" ){ 
        GPA = eval(document.gpaForm.totalQualPoints.value) / eval(document.gpaForm.totalCredits.value); 
        if (isNaN(GPA)) GPA=0; 
        document.getElementById("GPA").value = GPA.toPrecision(3); 
    } 
    calcOverallgpa(); 
} 
// compute overall gpa using semester's calculation, and the entered past gpa and credits earned 
function calcOverallgpa() { 
    /*if (document.gpaForm.GPA.value == "") { 
    window.alert("You need to estimate your current semester GPA first (in the top part of the table).","NMU GPA"); 
    document.gpaForm.elements[0].focus(); 
    return (false); 
    }*/ 
    
    //if ( (document.gpaOverallForm.PriorGPA.value == "" ) || 
    if (document.gpaOverallForm.PriorGPA.value != "" && (isNaN(document.gpaOverallForm.PriorGPA.value) || eval(document.gpaOverallForm.PriorGPA.value>4.3)) ) { 
        window.alert ("Prior overall GPA must be entered as a number 4.3 or less","NMU GPA"); 
        document.gpaOverallForm.PriorGPA.focus(); 
        return(false); 
    } 
    
    //if ( (document.gpaForm.PriorCredits.value == "" ) 
    if (document.gpaOverallForm.PriorCredits.value != "" && (isNaN(document.gpaOverallForm.PriorCredits.value) || eval(document.gpaOverallForm.PriorCredits.value>300)) ) { 
        window.alert ("Prior credits taken must be entered as a number 300 or less","NMU GPA"); 
        document.gpaOverallForm.PriorCredits.focus(); 
        return(false); 
    } 
    if (document.gpaOverallForm.PriorGPA.value != "" && document.gpaOverallForm.PriorCredits.value != "") 
    { 
        var totalCreditPoints, totalCredits, overallGPA; 
        if (document.gpaForm.totalCredits.value=="") document.gpaForm.totalCredits.value=0; 
        if (document.gpaForm.totalQualPoints.value=="") document.gpaForm.totalQualPoints.value=0; 
        totalCredits = eval(document.gpaForm.totalCredits.value) + eval(document.gpaOverallForm.PriorCredits.value); 
        totalCreditPoints = eval(document.gpaForm.totalQualPoints.value) + (document.gpaOverallForm.PriorCredits.value * document.gpaOverallForm.PriorGPA.value); 
        overallGPA = totalCreditPoints / totalCredits; 
        document.gpaOverallForm.OverallGPA.value = overallGPA.toPrecision(3); 
    } 
} 
function clearCourses() 
{ 
    //must be done for netscape/firefox...won't recognize new dynamically created form fields 
    var myTable = document.getElementById("GPAOverallTable"); 
    var numcourses=myTable.tBodies[0].rows.length; //all except for header and footer row 
    for (x=0;x<=numcourses;x++) 
    { 
        document.getElementById("course"+x).value=""; 
        document.getElementById("credits"+x).value="" 
        document.getElementById("letterGrade"+x).selectedIndex=0; 
        document.getElementById("qualityPoints"+x).value=""; 
    } 
    document.gpaForm.reset(); 
    calcOverallgpa(); 
} 
