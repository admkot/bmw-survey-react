import React from "react";



    
class Step1 extends React.Component{
   
   

    render(){
       

        return(
            <div>
                <form 
                    className="form-signin  animate-box fadeIn animated"
                    onSubmit={this.props.ValidateStep}
                >
                    <div id="step-1" className="end-survey-remove animate-box fadeIn animated">
                        <div id="question-1" className="form-group">
                            <label>Age:</label>
                            <input type="number" className="form-control" 
                                name="q1"                                                         
                                onChange={this.props.handleChange}
                                min={0} 
                                max={100}  
                                defaultValue={this.props.age} />
                        </div>
                        <div id="question-2" className="form-group" >
                            <label>Gender</label>
                            <select  className="form-control"    
                                name="q2"                             
                                onChange={this.props.handleChange}
                                defaultValue={this.props.gender} 
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block next-step end-survey-remove" type="submit" > Next </button>

                </form>
            
            </div>
        );
    }
      
}


export default Step1;