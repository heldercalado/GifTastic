


class pageLayout {
    constructor() {
        // load the array topics with the items 
        this.topics = ["The Matrix", "Back to the Future", "Animatrix", "Friday", "Pulp Fiction"];
        // call out the function loadPage for buld the intial page layout
        this.loadPage();
        //initialize the array the will hold the ajax call results from the api 
        this.resultsObject = [];
        
    }
   
//function to load the initial elements of the page
loadPage() {
    //append the first row to the container element that will be used for
    // adding the buttons
    $("#container").append("<div class='row' id='row1'></div>");
    $("#row1").append("<div class='col-md-12' id='predefinedbuttons'></div>");
    
    //append the second row to the container element that will be used for
    // adding the buttons
    $("#container").append("<div class='row ' id='row2'></div>");
    $("#row2").append("<div class='col-md-12 ' id='search'></div>");

    //append the third row to the container element that will be used for
    // showing the search results
    $("#container").append("<div class='row' id='row2'></div>");
    $("#row2").append("<div class='col-md-12 mx-auto' id='searchresults'></div>");
    
    // loop through the array (topics) and add the buttons to the web page

    for (var i =0 ; i < this.topics.length;i++){
        this.addButtons(this.topics[i] , true);
    }
    //adds a inline form component with boostrap for the user to  add a new button
    // <form class="form-inline my-2 my-lg-0">
    //   <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    //   <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    // </form>
    $("#search").append("<form class='form-inline float-right'>");
    
    $(".form-inline").append("<label for='addtext'>Type a subject to add the button</label>")
    $(".form-inline").append("<input class='form-control' id='addtext' type='search' placeholder='Search' aria-label='Search'></input>");
    $(".form-inline").append("<button class='btn btn-outline-success my-2 my-sm-0 add' type='button'>ADD</button>");
    

}

    // function to add the buttons 
    // takes two argument argCaption (string) which will be the text displayed in the button and 
    // argType (boolean) that will indicate  (true) if the the button added is from a 
    //predefined array (topics) or
    // (false)  from the userdefined types 
    // adds an extra class .searchbutton used as handle later in the code to call the api function 
    // on click event
    
    addButtons(argCaption, argType) {
        // sets a variable to contain the handle of the element (pre defined ) 
        //to append the buttons to
        var preDefinedButtonsElement = $("#predefinedbuttons");
        // sets a variable to contain the handle of the element (user defined ) 
        //to append the buttons to
        var userDefinedButtonsElement = $("#predefinedbuttons");
        //if is adding from the predifined array 
        if (argType) {
            preDefinedButtonsElement.append("<button type='button' class='btn btn-success searchbutton'>" + argCaption + "</button>")

            // else is from userdefined    
        } else {
            userDefinedButtonsElement.append("<button type='button' class='btn btn-success searchbutton'>" + argCaption + "</button>")


        }

    }
    // function to add the results from getResultsFromApi to the container searchresults
    // using a card conponent from bootstrap
    renderResults(a){
       this.resultsObject=[];
       $("#searchresults").empty();
       this.resultsObject = a;
       console.log(this.resultsObject);
        
for (var i = 0 ; i < a.length ; i++){
    
        var myId = i + 1
    $("#searchresults").append("<div class='card' id=" + myId +" style='width: 25%;'>");
    $("#"+ myId).append("<div class='card-header text-center bg-success text-white'>"+a[i].title+"</div>" )
    $("#"+ myId).append("<img class='card-img-top ' id='img" + i +"' src='"+ a[i].images.original_still.url   +"' alt='Card image cap'>");
    $("#"+ myId).append("<div class='card-body' id='cb"+ myId +"'>");
    
    $("#cb"+ myId).append("<ul class='text-center'><li><strong>Rating</strong>: "+ a[i].rating + "</li><li><strong>ID:</strong> "+ a[i].id + "</li></ul>" )
    $("#cb"+ myId).append("<a href='"+a[i].source+"' class='btn btn-primary bg-success text-white'>Source</a>");
}

 
}


// changeURL -> this method works like a .toogle for displaying either the static img or the live gif


changeImgUrl(argID){
// takes as parameter the id of the clicked img and strips down the string portion of its name
// gets the last char of the name by using the slice(-1)  
// and parseInt turns that string result into a number and sets a variable to store that number   
var indexNumber = parseInt(argID.slice(-1));
// with the index set above , gets the src of the static image that is still 
// loaded into the class array (resultsObject)
var staticGif = this.resultsObject[indexNumber].images.original_still.url;
// with the index set above , gets the src of the live image that is still 
// loaded into the class array (resultsObject)
var liveGif = this.resultsObject[indexNumber].images.original.url;
// now check if the current src of the clicked img element is static then,
// change to the live url

if ($("#"+argID).attr('src') === staticGif){
    $("#"+argID).attr('src' , liveGif);
}else{
// else , change to the static
    $("#"+argID).attr('src' , staticGif);
}
}
    
} // end of the class code here 




