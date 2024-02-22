import React from 'react';

function PetCard({ petData, onAdoptPet }) {
    const handleAdopt = () => {
        onAdoptPet(petData.name);
    };

    return (
        <div className="card" onClick={handleAdopt}>
            <img className="card-img-top" src={petData.img} alt={petData.name} />
            <div className="card-body">
                <h3 className="card-title">{petData.name} {petData.adopted ? "(Adopted)" : ""}</h3>
                <p className="card-text">{`${petData.sex} ${petData.breed}`}</p>
                <button onClick={() => onAdoptPet(petData.name)}>Adopt</button>
            </div>
        </div>
    );
}

function PetList({ pets, onAdoptPet }) {
    return (
        <div>
          <h2>Dogs for Adoption</h2>
          <div className="card-deck">
            {pets.map(pet => (
              <PetCard key={pet.name} petData={pet} onAdoptPet={onAdoptPet} />
            ))}
          </div>
        </div>
      );
}

export default PetList;
