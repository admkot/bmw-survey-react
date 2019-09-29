import React from "react";


class endSurvey extends React.Component{
    render(){  
        return(

      <div>
               	<div id="end-survey" className=" animate-box fadeIn animated text-center">
                   {this.props.endSurveyText} 
                </div>
      </div>
        );
    }  
}



export default endSurvey;