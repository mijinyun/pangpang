import { useState, useEffect } from 'react';
import { createMole, appear, whack } from '../components/mole';

const appearTime = 2000; // 두더지가 나타나는 시간

function MoleGame() {
  const [moles, setMoles] = useState([]); // 두더지 리스트

  useEffect(() => {
    const moleLists = Array.from({ length: 9 }, (_, i) => createMole(i + 1)); // 9개의 두더지 생성
    setMoles(moleLists); // 상태 관리할 두더지 목록 설정

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moleLists.length); // 랜덤한 두더지 선택
      const randomMole = moleLists[randomIndex]; 

      appear(randomMole); // 두더지 나타나기
      setMoles([...moleLists]); // 두더지 상태 업데이트

    }, appearTime); // 랜덤한 두더지를 임시로 2초마다 나타나게 설정

    return () => clearInterval(interval);
  }, []);

  const handleWhack = (mole) => {
    const result = whack(mole); // 두더지 잡기
    if (result === 'catch') {
      // TODO: 여기서 점수 관리하기?!
    }
    setMoles([...moles]); // 두더지 상태 업데이트
  };

  return (
    <div>
      <h1>두더지 잡기 게임</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {moles.map((mole) => (
          <button key={mole.id} onClick={() => handleWhack(mole)} style={{ width: '100px', height: '100px' }}>
            {mole.isVisible ? '두더지' : '흙'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoleGame;
