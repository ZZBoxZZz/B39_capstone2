class Validation{
    kiemTraRong(value,errorID,mess){
        if (value === ""){
            getSelection(errorID).innerHTML = mess;
            getSelection(errorID).style.display ="bliock";
            return false;
        }
        getEle(errorID).innerHTML ="";
        getSelection(errorID).style.display ="none";
        return true;
    };

}

export default Validation;