import React from "react";


class Step3 extends React.Component{


    render(){  
        return(
        <div>
            <form 
                className="form-signin  animate-box fadeIn animated"
                onSubmit={this.props.ValidateStep}
            >
                <div id="step-3" className="end-survey-remove animate-box fadeIn animated">
                    <div id="question-5" className="form-group" >
                            <label>Which drivetrain do you prefer?</label>
                            <select className="form-control" 
                                name="q5"
                                onChange={this.props.handleChange}
                                defaultValue={this.props.drivetrain} 
                            >
                                <option>FWD</option>
                                <option>RWD</option>
                                <option>I don’t know</option>
                            </select>
                    </div>
                    <div id="question-6" className="form-group " >
                            <label > Do you care about drifting? </label>
                            <select className="form-control" 
                                name="q6"
                                onChange={this.props.handleChange}
                                defaultValue={this.props.drifting} 
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                    </div>
                    <div id="question-7" className="form-group" >
                        <label> How many BMWs did you drive? </label>
                        <input type="number" className="form-control" 
                            name="q7"
                            min={0} 
                            max={100} 
                            step={1} 
                            defaultValue={this.props.amountModels}   
                            onChange={this.props.handleChange}
                            
                        />

                    </div>
                    {                            
                        (this.props.amountModels>0) ?
                        (
                            <div id="question-8" className="form-group animate-box fadeIn animated">
                                <label >Which BMW did you drive? </label>
                                {
                                      this.props.models.map( (bmw, key) =>
                                        <div key={key}>
                                            <input type="text" className="form-control mt-4"                                                    
                                                name={key}                                                                          
                                                defaultValue={bmw.model}   
                                                onChange={this.props.verifyModel}                                            
                                            />
                                            {
                                                bmw.err ? ( <span className="text-danger"> Ivalid Model! </span>  ) : null
                                            }
                                            
                                        </div>
                                        
                                       
                                        
                                      )

                                }
                            </div> 
                        ):null
                    }
                   
                </div>
                <button className="btn btn-primary btn-block next-step end-survey-remove" type="submit" disabled={this.props.finishSurveyButtonDisabled} > Finish Survey </button>
            </form>
        </div>
        );
    }  
}





export default Step3;