import React from "react";
import Logo from "./bmwlogo.png";
import Step1 from "./SurveySteps/Step1";
import Step2 from "./SurveySteps/Step2";
import Step3 from "./SurveySteps/Step3";
import EndSurvey from "./SurveySteps/EndSurvey";


class App extends React.Component{

  constructor(){
      super();
      this.state = {
        step:1,
        q1:17,
        q2:'M',
        q3:null,
        q4:null,
        q5:null,
        q6:null,
        q7:null, 
        q8:[],         
        endSurveyText:null,
        finishSurveyButtonDisabled:true,
        error:null
      };
  }


  NextStep = () => {
    
    
    let nextStep = this.state.step + 1;
    this.setState({
        step:nextStep       
    });   
    

  };

  handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val}); 
    
      //if QESTION 7
      if(nam==='q7'){
        let models = val-1;//first element of array is 0 not 1        
        //if q8 array lenght less than number of medels from q7 then we add new model with value null else we remove one
        this.state.q8.length<=models ? 
          (
            this.state.q8.push({ model: null, err:true }) && this.setState( {finishSurveyButtonDisabled: true}) 
          )         
        :
          this.state.q8.splice( models, 1);

      }
     
  }
  
  ValidateStep1 = async (e) => {
    e.preventDefault();
   
    if(this.state.q1 < 18){
      this.endSurvey('Thank you for your interest in helping BMW.');
    }else{
      this.setState({ q3: 'yes'});
      (this.state.q1 < 25) ? this.setState({ q4: 'yes'}) : this.setState({ q4: null}); 
      this.NextStep();
    }        
   
  }

  ValidateStep2 = async (e) =>{
    e.preventDefault();

    if(this.state.q3 === 'no'){
      this.endSurvey('Thank you for your interest in helping BMW.');
    }else if(this.state.q4 === 'yes'){
      this.endSurvey('We are targeting more experienced clients, thank you for your interest.');
    }else{
      this.setState({ q5: 'FWD', q6: 'yes', q7: 0, });      
      this.NextStep();
    }     
  }

  verifyModel = (event) => {        
        
    var pattern1 = /^M?[0-9]{3}[d|i]?$/i;
    var pattern2 = /^[X|Z]{1}[0-9]{1}$/i;

    let inputValue = event.target.value;
    let inputName = event.target.name; 
    let q8 = this.state.q8;
 
    if( pattern1.test(inputValue) || pattern2.test(inputValue) ) {
      q8[inputName].err=false;
      q8[inputName].model=inputValue;  

        //UNABELING FINISH BUTTON    
        
       this.setState( {finishSurveyButtonDisabled: false});       
       q8.map( (bmw) =>               
           bmw.err ? ( this.setState( {finishSurveyButtonDisabled: true})  ) : null
        );
        console.log(this.state.finishSurveyButtonDisabled);


    }else{      
      q8[inputName].err=true;
      this.setState( {finishSurveyButtonDisabled: true});           
    }    
    //UPDATE MODELS 
    this.setState({q8: q8});
  }

  ValidateStep3 = async (e) =>{
    e.preventDefault();
      //ONLY IF LOOPING q8 and there is no true err, then we continue
    let endSurvey = true; 

    this.state.q8.map( (bmw) =>               
        bmw.err ? 
        ( 
          this.setState( {finishSurveyButtonDisabled: true})  && ( endSurvey = false )
        ) 
        : null
    ); 

      if(endSurvey){
        this.endSurvey('Thank you for your interest in helping BMW.');
      }
    
    

      
    
  }


 
  endSurvey = (text) =>{
    this.setState({  
      step:'End Survey', 
      endSurveyText:text
    });
   
    var surveyAnswers = {
      Q1: this.state.q1,
      Q2: this.state.q2,
      Q3: this.state.q3,
      Q4: this.state.q4,
      Q5: this.state.q5,
      Q6: this.state.q6,
      Q7: this.state.q7,
      Q8: this.state.q8,
  };

    var surveyAnswersArr = [];
    if (localStorage.getItem("surveyAnswers") === null) {
      //the first submited survey
      surveyAnswersArr.push( surveyAnswers );
    }else{
      //Getting Old answers and adding new
      surveyAnswersArr = JSON.parse(localStorage.getItem('surveyAnswers'));
      surveyAnswersArr.push( surveyAnswers );
    }

    localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswersArr));
    
    
  }
 

  render(){


    return(
      <div >
            <div className="form-signin  animate-box fadeIn animated">
                <div className="text-center mb-4 ">
                    <img className="mb-4" src={Logo} alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">BMW Survey</h1>
                </div>    
                    {
                          //if no errors display country list
                        this.state.step === 1 ? 
                          <Step1 
                            age={this.state.q1}
                            gender={this.state.q2}
                            handleChange = {this.handleChange}
                            ValidateStep = {this.ValidateStep1}
                          />  
                        :
                        this.state.step === 2 ? 
                          <Step2 
                            drivingLicense={this.state.q3}
                            firstCar={this.state.q4}
                            handleChange = {this.handleChange}
                            ValidateStep = {this.ValidateStep2}
                          />  
                        :
                        this.state.step === 3 ? 
                          <Step3 
                            drivetrain={this.state.q5}
                            drifting={this.state.q6}
                            amountModels={this.state.q7}
                            models={this.state.q8}
                            handleChange = {this.handleChange}
                            verifyModel = {this.verifyModel}
                            finishSurveyButtonDisabled = {this.state.finishSurveyButtonDisabled}
                            ValidateStep = {this.ValidateStep3}
                          />  
                        :
                        <EndSurvey 
                          endSurveyText={this.state.endSurveyText} 
                        />                   
                        
                       
                       
                            
                        
                    }                 
            </div>  
      </div>
    );

  }
}

//Exporting component App
export default App;
