import React, { useState } from 'react'; //import React Component
import _ from 'lodash'; 

export default function GameDataTable(props) {

  //Your state and event work goes here
  const [sortByCriteria, updateSort] = useState(null);
  const [isAsc, setIsAscending] = useState(null);

  const shouldSortData = sortByCriteria !== null;
  let sortedData;
  if (shouldSortData) {
    sortedData = _.sortBy(props.data, sortByCriteria);
    if (!isAsc) {
      sortedData = _.reverse(sortedData);
    }
  } else {
    sortedData = props.data;
  }

  if (sortByCriteria && !isAsc) {
    sortedData().reverse();
  }

  const handleClick = (e) => {
    const criteria = e.currentTarget.name;
    if (sortByCriteria === criteria) {
      if (isAsc) {
        setIsAscending(false);
      } else {
        updateSort(null);
        setIsAscending(null);
      }
    } else {
      updateSort(criteria);
      setIsAscending(true);
    }
  };
  

  //Map the `props.data` value into an array of `<GameDataRow>` elements here
  const gameDataRows = sortedData.map((gameObj) => (
    <GameDataRow key={gameObj.year} gameObj={gameObj} />
  ));

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
          <th>
            Year
            <SortButton 
              name="year" 
              active={sortByCriteria === 'year'} 
              ascending={sortByCriteria === 'year' && isAsc}
              onClick={handleClick} />
          </th>
          <th className="text-end">
            Winner
            <SortButton 
              name="winner" 
              active={sortByCriteria === 'winner'} 
              ascending={sortByCriteria === 'winner' && isAsc}
              onClick={handleClick} />
          </th>
          <th className="text-center">
            Score
            <SortButton 
              name="score" 
              active={sortByCriteria === 'score'} 
              ascending={sortByCriteria === 'score' && isAsc}
              onClick={handleClick} />
          </th>
          <th>
            Runner-Up
            <SortButton 
              name="runner_up" 
              active={sortByCriteria === 'runner_up'} 
              ascending={sortByCriteria === 'runner_up' && isAsc}
              onClick={handleClick} />
          </th>

          </tr>
        </thead>
        <tbody>
          {gameDataRows}
        </tbody>
      </table>
    </div>
  );
}

//Component for managing display logic of sort button
//Props: 
//  `active` [boolean] if icon should be highlighted,
//  `ascending` [boolean] if icon should be in ascending order (flipped)
//  `onClick` [function] click handler (passthrough)
function SortButton(props) {
  let iconClasses = ""
  if (props.active) { iconClasses += ` active` }
  if (props.ascending) { iconClasses += ` flip` };

  return (
    <button className="btn btn-sm btn-sort" name={props.name} onClick={props.onClick}>
      <span className={"material-icons" + iconClasses} aria-label={`sort by ${props.name}`}>sort</span>
    </button>
  );
}

function GameDataRow({ gameObj }) { //gameObj = props.gameObj
  return (
    <tr>
      <td>{gameObj.year}</td>
      <td className="text-end">{gameObj.winner} {gameObj.winner_flag}</td>
      <td className="text-center">{gameObj.score}</td>
      <td>{gameObj.runner_up_flag}&nbsp;&nbsp;{gameObj.runner_up}</td>
    </tr>
  );
}
