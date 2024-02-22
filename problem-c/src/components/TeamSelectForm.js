import React, { useState } from 'react'; //import React Component

export default function TeamSelectForm(props) {

  // State variables for the select input and checkbox input
  const [selectedTeam, setSelectedTeam] = useState('');
  const [includeRunnerUps, setIncludeRunnerUps] = useState(false);

  // Event handler for select input changes
  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  }

  // Event handler for checkbox input changes
  const handleCheckboxChange = (e) => {
    setIncludeRunnerUps(e.target.checked);
  }

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the applyFilter function passed via props with the current state
    props.applyFilter(selectedTeam, includeRunnerUps);
  }

  // Generate option elements for the select input
  const optionElems = props.teamOptions.map((teamName) => {
    return <option key={teamName} value={teamName}>{teamName}</option>;
  })

  return (
    <form onSubmit={handleSubmit} className="row align-items-center mb-3">
      <div className="col-auto">
        <select id="teamSelect" className="form-select" value={selectedTeam} onChange={handleTeamChange}>
          <option value="">Show all teams</option>
          {optionElems}
        </select>
      </div>
      <div className="col-auto">
        <div className="form-check">
          <input 
            id="runnerupCheckbox" 
            type="checkbox" 
            className="form-check-input" 
            checked={includeRunnerUps} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="runnerupCheckbox" className="form-check-label">
            Include runner-up
          </label>
        </div>
      </div>
      <div className="col-auto">
        <button 
          id="submitButton" 
          type="submit" 
          className="btn btn-warning"
        >
          Apply Filter
        </button>
      </div>
    </form>
  );
}
