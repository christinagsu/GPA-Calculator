<?php

   /*

   Plugin Name: Latest GPA Calculator

   Plugin URI: http://localhost

   Description: This is used to calculate the total cost estimate for a graduate student
   
   Version: 1.0
   
   Author: Christina Harris
   
   License: xyz
 
   */
   
 //in this file, I am doing a string replace instead of add_short_code so that the intro text will appear before the calculator!!
 
add_filter('the_content', 'add_calc_shortcode');

function getCalculator(){
 $replacement_content = '

<script src="'.get_bloginfo("wpurl").'/wp-content/plugins/gpa-calculator/js/gpacalc.js"></script>
<link href="'.get_bloginfo("wpurl").'/wp-content/plugins/gpa-calculator/css/main.css"
rel="stylesheet" type="text/css" />
<table class="matrix">
<tbody>
<tr>
<td>
<table class="matrix" id="GPAOverallTable" bordercolor="#315aad" cellspacing="0" width="100%" border="1">
<form name="gpaForm">
<tbody id="GPATable">
<tr>
<td align="center" bgcolor="#d1dfec"><b>Course</b><br />
<a href="javascript:insertRow()">Add Row</a>
<div id="deleteRowLink"><a href="javascript:deleteRow()">Remove Row</a></div>
</td>
<td align="center" bgcolor="#d1dfec"><b>Credits</b></td>
<td align="center" bgcolor="#d1dfec"><b>Letter Grade</b></td>
<td align="center" bgcolor="#d1dfec"><b>Quality Points</b></td>
</tr>
</tbody>
<tbody id="totals">
<tr>
<td style="white-space: nowrap" align="center" bgcolor="#d1dfec">Semester Credits</td>
<td align="center"><input readonly="true" type="text" size="5" name="totalCredits" ></td>
<td align="center" bgcolor="#d1dfec">Semester Credit Points</td>
<td align="center"><input readonly="true" type="text" size="5" name="totalQualPoints" ></td>
</tr>
<tr>
<td align="right" bgcolor="#d1dfec" colspan="3">
<table width="100%">
<tbody>
<tr>
<td><input onclick="clearCourses();return false;" type="reset" value="Clear Courses" /></td>
<td align="right"><b>Estimated GPA for this semester</b></td>
</tr>
</tbody>
</table>
</td>
<td align="center"><input id="GPA" readonly="true" type="text" size="5" name="GPA" /></td>
</tr>
</tbody>
<!--<TR>
<TD align=center colSpan=4><INPUT onclick=insertRow() type=button
value="Insert Row" name=insertRowButton> <INPUT onclick=deleteRow()
type=button value="Delete Row" name=deleteRowButton></TD>
</TR>-->
</form>
<form name="gpaOverallForm">
<tbody>
<tr>
<td colspan="4"><i>To calculate your estimated insitutional GPA, enter
in the below fields your current GPA AND the total GPA credits earned
(including WF or F&rsquo;s, but not W&rsquo;s). </i></td>
</tr>
<tr>
<td align="center" bgcolor="#d1dfec">Prior Credits Taken</td>
<td align="center"><input onblur="calcOverallgpa()" type="text" size="6" name="PriorCredits" /></td>
<td align="center" bgcolor="#d1dfec">Current Institutional GPA</td>
<td align="center"><input onblur="calcOverallgpa()" type="text" size="5" name="PriorGPA" /></td>
</tr>
<tr>
<td align="right" bgcolor="#d1dfec" colspan="3"><b>Estimated GPA</b></td>
<td align="center"><input readonly="true" type="text" size="5" name="OverallGPA" /></td>
</tr>
</tbody>
<input type="reset" value="Clear Overall GPA" />
</form>
</table>
<h2> </h2>
</td>
</tr>
</tbody>
</table>
<SCRIPT language=javascript>
insertInitialRows();
document.gpaForm.elements[0].focus();
document.gpaForm.reset();
document.gpaOverallForm.reset();
</SCRIPT>
';
return $replacement_content;
}
function add_calc_shortcode($content)
{
       $replacement_content=getCalculator();
    $content = str_replace("[gpa-calculator]", $replacement_content, $content);
    return $content;
}
?>