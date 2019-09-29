import React from "react";


class Step2 extends React.Component{
    render(){  
        return(
            <div>
                    
                <form 
                    className="form-signin  animate-box fadeIn animated"
                    onSubmit={this.props.ValidateStep}
                >
                    <div id="step-2" className="end-survey-remove animate-box fadeIn animated">
                        <div id="question-3" className="form-group" >
                            <label>Do you own a car driving license?</label>
                            <select className="form-control" 
                                name="q3"                             
                                onChange={this.props.handleChange}
                                defaultValue={this.props.drivingLicense} 
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No, I prefer using other transport </option>
                            </select>
                        </div>
                        {
                           this.props.firstCar ?
                            (
                                    <div id="question-4" className="form-group " >
                                        <label>Is this your first car?</label>
                                        <select className="form-control" 
                                            name="q4"                             
                                            onChange={this.props.handleChange}
                                            defaultValue={this.props.firstCar} 
                                        >
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                        </select>
                                    </div>  
                                ) : null
                            
                        }
                          
                    </div>
                    <button className="btn btn-primary btn-block next-step end-survey-remove" type="submit" > Next </button>
                </form>

            </div>
        );
    }  
}



export default Step2;