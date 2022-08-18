/* eslint-disable */
import React from 'react';
import { MessageAlert } from 'utils';

const useAudio = (url) => {
  const [audio, setAudio] = React.useState();
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(!playing);

  React.useEffect(() => {
    createAudio();
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  const createAudio = async () => {
    await handleAudio()
      .then((res) => {
        let result = res;
        result.addEventListener('ended', () => setPlaying(false));
        setAudio(result);
      })
      .then(() => {
        setPlaying(true);
      })
      .catch((err) => {
        MessageAlert.error(err);
      });
  };

  const handleAudio = () =>
    new Promise((resolve, reject) => {
      try {
        const a = new Audio(url);
        resolve(a);
      } catch (error) {
        reject(error);
      }
    });

  React.useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }

    // eslint-disable-next-line
  }, [playing]);

  return [playing, toggle];
};

export default useAudio;
