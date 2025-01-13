// 1. 객체 생성
// 2. 나타나기, 숨기, 잡기 함수 생성
// 3. 나타나기 함수 : 현재 상태, 현재 상태 업데이트, 일정 시간 후 숨기기
// 4. 숨기기 함수 : 현재 상태, 현재 상태 업데이트, 타이머 초기화
// 5. 잡기 함수 : 현재 상태, 현재 상태 업데이트, 숨기기 함수 호출

// 두더지 객체 생성
export const createMole = (id) => ({
  id, // 식별자
  isVisible: false, // 현재 상태
  appearDuration: getRandomInterval(), // 두더지가 나타난 상태로의 일정 시간
  timer: null, 
});

// 두더지 나타나기
export const appear = (mole) => {
  if (mole.timer) return; // 이미 두더지가 나타난 경우 return
  
  mole.isVisible = true; 
  setTimeout(() => hide(mole), mole.appearDuration); // 일정 시간 후 숨기기
}

// 두더지 숨기
export const hide = (mole) => {
  mole.isVisible = false;
  mole.timer = null; // 다시 나타나기 위해서 타이머 초기화
}

// 두더지 잡기
export const whack = (mole) => {
  if (!mole.isVisible) {
    console.log('놓쳤다!');
    return 'miss'; // 임시로 정한 리턴값
  }

  console.log('잡았다!');
  hide(mole); // 잡으면 들어가야함. 이중클릭 방지
  return 'catch'; // 임시로 정한 리턴값
}

const getRandomInterval = () => Math.random() * 2000 + 1000;
