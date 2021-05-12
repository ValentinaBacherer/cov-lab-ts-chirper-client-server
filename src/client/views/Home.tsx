import * as React from 'react';
import { useState, useEffect } from 'react';
import { SingleChirp } from '../../utilities/types';
import ChirpInput from '../components/ChirpInput';
import ChirpList from '../components/ChirpList';

const Home = () => {
  const [reactChirps, setReactChirps] = useState<SingleChirp[]>([
    { user: null, text: null },
  ]);

  useEffect(() => {
    async function getChirps() {
      try {
        const res = await fetch('/api/chirps');
        const chirpsList = await res.json();

        setReactChirps(chirpsList);
      } catch (error) {}
    }
    getChirps();
  }, []);

  const updateChirps = async (chirp: SingleChirp): Promise<void> => {
    try {
      const response = await fetch('/api/chirps', {
        body: JSON.stringify(chirp),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }

    setReactChirps([chirp, ...reactChirps]);
  };

  return (
    <main className='container my-5'>
      <div className='card col-6 mx-auto bg-primary shadow-sm p-2 mb-4'>
        <h4 className='text-center text-white mb-0'>Hello Chirper!</h4>
      </div>
      <div className='container d-flex align-items-start justify-content-start'>
        <div className='row col-4 mx-auto'>
          <ChirpInput setChirps={updateChirps} />
        </div>
        <div className='row col-7 mx-auto'>
          <ChirpList chirps={reactChirps} />
        </div>
      </div>
    </main>
  );
};

export default Home;
