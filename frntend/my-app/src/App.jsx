import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedbrd, setSelected] = useState(""); 
  const [cats, setCats] = useState([]);
  const [pg, setpg] = useState(0); 

  // Fetch breed list
  async function getBreeds() {
    try {
      const response = await axios.get('https://cats-y04w.onrender.com/getBreeds');
      setBreeds(response.data.data);
    } catch (error) {
      console.error('Error  breeds:', error);
    }
  }

  async function getCats(breedId, page = 0) {
    if (!breedId) return;

    try {
      const res = await axios.get(`https://cats-y04w.onrender.com/getCat?limit=10&page=${page}&breedid=${breedId}`);
      setCats(res.data.data);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  function handleBreedSelection(breedId) {
    setSelected(breedId); 
    setpg(0); 
  }

  useEffect(() => {
    if (selectedbrd) {
      getCats(selectedbrd, 0);
    }
  }, [selectedbrd]); 

  function handlenext() {
    setpg(prevPg => {
      const nextPage = prevPg + 1;
      getCats(selectedbrd, nextPage);
      return nextPage;
    });
  }

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      {/* Dropdown for Breeds */}
      <div className="row">
        <div className="col-md-6">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedbrd ? selectedbrd : "Select Breed"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {breeds.length > 0 ? (
                breeds.map((breed, index) => (
                  <li key={index}>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleBreedSelection(breed.id)} 
                    >
                      {breed.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="dropdown-item text-muted">No breeds available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {cats.length > 0 ? (
          cats.map((cat, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img src={cat.url} className="card-img-top" alt="Cat" style={{ height: "200px", objectFit: "cover" }} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No cats</p>
        )}
      </div>

      <div className='row mt-4'>
        <button className='btn btn-secondary' onClick={handlenext}>Next</button>
      </div>
    </div>
  );
}

export default App;
