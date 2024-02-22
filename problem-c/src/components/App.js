import React, { useState } from 'react'; //import React Component
import GameDataTable from './GameDataTable';
import TeamSelectForm from './TeamSelectForm';

function App(props) {

  //Your work goes here
  const [selectedTeam, setSelectedTeam] = useState('');
  const [includeRunnerUps, setIncludeRunnerUps] = useState(false);
  const [displayedData, setDisplayedData] = useState(props.gameData);

  const handleApplyFilter = (teamName, includeRunnerUps) => {
    setSelectedTeam(teamName);
    setIncludeRunnerUps(includeRunnerUps);

    const newFilteredData = props.gameData.filter(game => {
      return (teamName === '' || game.winner === teamName || (includeRunnerUps && game.runner_up === teamName));
    });

    setDisplayedData(newFilteredData);
  };


  //get sorted list of unique teamNames. reduce array of objects into array of strings, 
  //convert to Set to get uniques, spread back into array, and sort 
  const uniqueTeamNames = [...new Set(props.gameData.reduce((all, current) => {
    return all.concat([current.winner, current.runner_up]);
  }, []))].sort();

  return (
    <div className="container">
      <header className="mb-3">
        <h1>FIFA World Cup Finals</h1>
      </header>
    
      <main>
        <TeamSelectForm
          selectedTeam={selectedTeam}
          includeRunnerUp={includeRunnerUps}
          teamOptions={uniqueTeamNames}
          applyFilter={handleApplyFilter}
        />
        <GameDataTable
          data={displayedData}
          selectedTeam={selectedTeam}
          includeRunnerUp={includeRunnerUps}
        />
      </main>

      <footer>
        <small>Data from <a href="https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals">Wikipedia</a>.</small>
      </footer>
    </div>
  );
}

export default App;
