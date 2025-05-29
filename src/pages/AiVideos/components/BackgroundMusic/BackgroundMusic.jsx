import React, { useState, useRef } from 'react';
import './BackgroundMusic.css';
import forestImg from '../../../../assets/backgroundmusic-images/forest.jpeg';
import waterImg from '../../../../assets/backgroundmusic-images/water.jpeg';
import waveImg from '../../../../assets/backgroundmusic-images/wave.jpg';
import funImg from '../../../../assets/backgroundmusic-images/fun.jpeg';
import sadImg from '../../../../assets/backgroundmusic-images/sad.jpeg';
import pianoImg from '../../../../assets/backgroundmusic-images/piano.jpeg';

export const backgroundMusicList = [
  {
    id: 'forest',
    name: 'Forest',
    description: '자연의 숲 소리를 담은 편안한 효과음',
    path: '/mp3/Forest.mp3',
    image: forestImg
  },
  {
    id: 'water',
    name: 'Water',
    description: '물 흐르는 소리를 담은 차분한 효과음',
    path: '/mp3/water.mp3',
    image: waterImg
  },
  {
    id: 'wave',
    name: 'Wave',
    description: '파도 소리를 담은 여유로운 효과음',
    path: '/mp3/Wave.mp3',
    image: waveImg
  },
  {
    id: 'fun',
    name: 'Fun',
    description: '평화롭고 즐거운 분위기의 배경음악',
    path: '/mp3/fun.mp3',
    image: funImg
  },
  {
    id: 'sad',
    name: 'Sad',
    description: '감성적이고 슬픈 분위기의 배경음악',
    path: '/mp3/sad.mp3',
    image: sadImg
  },
  {
    id: 'piano',
    name: 'Piano',
    description: '감성적인 피아노 선율의 배경음악',
    path: '/mp3/piano.mp3',
    image: pianoImg
  }
];

function BackgroundMusic({ selectedMusic, onMusicSelect, onProceedToScript }) {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (e, musicIndex) => {
    e.stopPropagation();
    
    // 이전에 재생 중이던 음악이 있다면 중지
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 같은 음악을 다시 클릭한 경우
    if (currentPlaying === musicIndex) {
      setCurrentPlaying(null);
      return;
    }

    // 새로운 음악 재생
    const music = backgroundMusicList[musicIndex];
    const baseUrl = 'http://localhost:8080';
    const audio = new Audio(`${baseUrl}${music.path}`);
    
    audio.onended = () => {
      setCurrentPlaying(null);
    };

    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });

    audioRef.current = audio;
    setCurrentPlaying(musicIndex);
  };

  return (
    <div className="AiVideo_background-music__container">
      <div className="AiVideo_background-music__grid">
        {backgroundMusicList.map((music, index) => (
          <div 
            key={music.id}
            className={`music-box ${selectedMusic === index ? 'selected' : ''}`}
            onClick={() => onMusicSelect(index)}
          >
            <div className="music-box-content">
              <div className="music-box-image">
                {/* 이미지는 나중에 추가될 예정 */}
                <img className="music-box-placeholder" src={music.image} alt={music.name} style={{width: '80%', height: '80%', objectFit: 'cover', borderRadius: '10px'}} />
              </div>
              <div className="music-box-info">
                <p className="music-description">{music.description}</p>
                <p className="music-name">{music.name}</p>
              </div>
              <button 
                className={`music-play-button ${currentPlaying === index ? 'playing' : ''}`}
                onClick={(e) => handlePlay(e, index)}
              >
                {currentPlaying === index ? '■' : '▶'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedMusic !== null && (
        <button 
          className="AiVideo_merge-button"
          onClick={onProceedToScript}
        >
          배경음악 확정
        </button>
      )}
    </div>
  );
}

export default BackgroundMusic; 