let speed  = 45 ;// speed is set tothe speed of the cars 

const speed_limit =70 ; // speed limit is set to 70
function calculate_speed (){
if (speed <=speed_limit){
    return "okay";
}


else {
    points = ((speed - speed_limit)/5) ;

    if (points >12 ){
        return "lincense suspended";
    }
    return  points =`${points}` ;
}    
}

console.log(calculate_speed())

