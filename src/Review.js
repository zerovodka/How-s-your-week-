import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

const Review = (props) => {
  //페이지 이동을 위한 history 객체
  //react-router-dom의 useHistory() 훅
  const history = useHistory();
  //파라미터를 가져오기 위한 react-router-dom의 useParams 훅
  const params = useParams();

  //평점을 state에 넣어서 관리해보자
  //이를 이용해 클릭하면 rate의 state값을 바꾸어 동그라미를 칠하도록 설정
  const [rate, setRate] = React.useState(0);

  //*********************이 부분은 소스를 참고해서 이해해보려 노력중입니다*************************

  // 키보드를 누르는 이벤트를 등록하기 위해, useEffect 훅을 사용해요!
  // useEffect(1번째 인자, 2번째 인자)에서 1번째 인자는 함수가 들어가고, 2번째 인자는 디펜던시 어레이가 들어가요.
  // 디펜던시 어레이에 넣은 값이 변하면? 1번째 인자로 넘긴 함수가 다시 한 번 실행됩니다.
  // 지금처럼 디펜던시 어레이를 비워두면요? 컴포넌트가 생길 때 1번만 1번째 인자의 함수를 실행하고 더는 아무 것도 하지 않아요!
  // useEffect 훅의 자세한 내용은 강의나 리액트 공식문서를 찾아보기!
  React.useEffect(() => {
    /**
     * Q7. 키보드의 1~5까지 숫자를 누르면 평점이 입력되도록 하고 싶어요!
     *  -> 키보드를 누를 때 발생할 이벤트를 관리해야겠다!
     *  -> 자바스크립트에서 키보드 누를 때 발생하는 이벤트가 뭐가 있을까 검색해보기!
     *
     * Q8. keydown 이벤트를 등록해주면 된다는데, 어디에 등록을 해야할까?
     *  -> 어디에 포커스 되어 있던 나는 평점을 매겨주고 싶으니까 window 객체에 등록해야겠어요. :)
     *  -> 어떻게 등록해줄까? 1. addEventListener로 등록을 해야해! 필요한 게 뭐가 있지? 2. 앗 이벤트 발생할 때 실행할 함수가 필요해! 함수를 만들자. 3. 함수에서는 뭘 해야할까? 4. 1~5를 누를 때를 알아야 해! 그 때만 setRate해주자!
     *
     * Q9. 등록을 했으면 해제를 해야해요! 언제 이벤트를 해애해야할까?
     *  -> 이 페이지에서 벗어나면 이 이벤트는 필요하지 않으니 해제하고 싶어요.
     *  -> 이 페이지에서 벗어난다? Review 컴포넌트가 화면에 보이지 않을 때구나!
     *  -> useEffect에서 컴포넌트가 사라지는 타이밍을 어떻게 찾는 지 검색해보기!
     *  -> useEffect 훅 내에서 return에 넣어주면 된대요! :)
     */

    // keydown 이벤트가 발생하면 실행할 함수를 만들어요.
    const press = (e) => {
      console.log(
        "키보드를 누르면 어떤 이벤트가 발생하는 지 확인해야지! : ",
        e
      );

      // e.key로 받아온(누른 키) 값이 1~5까지 숫자가 맞아?
      // 저는 배열에 넣고 indexOf로 확인했어요. :)
      if ([1, 2, 3, 4, 5].indexOf(parseInt(e.key)) !== -1) {
        // 1~5까지 숫자가 맞으면 state에 넣어주자!
        setRate(parseInt(e.key));
      }
    };
    window.addEventListener("keydown", press);

    // 컴포넌트가 언마운트 되면(화면에서 사라지면) 이벤트도 지워줘요!
    return () => window.removeEventListener("keydown", press);
  }, []);
  //*********************이 부분은 소스를 참고해서 이해해보려 노력중입니다*************************

  return (
    <>
      <ReviewWrap>
        <ReviewTitle>
          <ReviewDays>
            {/* 파라미터를 받아서 화면으로 */}
            {params.week_day}요일
          </ReviewDays>{" "}
          평점 남기기
        </ReviewTitle>

        <ReviewCircleList>
          {/* 평점 동그라미 */}
          {Array.from({ length: 5 }, (item, idx) => {
            return (
              <ReviewCircleDesign
                // 콘솔창에서 에러 나오는거 보기 싫어요 => key 값 임의로 넣어주자
                key={idx}
                onClick={() => {
                  //위에서 공부하고 있는 함수를 onclick으로 호출한다
                  //idx값은 0부터 시작하니 + 1을 하여 혼동이 없게한다
                  //위에서 선언해준 setState로 state를 바꾸어준다
                  setRate(idx + 1);
                }}
                style={{
                  backgroundColor: rate < idx + 1 ? "#ddd" : "#ffeb3b",
                }}
              ></ReviewCircleDesign>
            );
          })}
        </ReviewCircleList>

        {/* 누르면 뒤로 가는 버튼 */}
        <ReviewBtn
          onClick={() => {
            history.goBack();
          }}
        >
          평점 남기기
        </ReviewBtn>
      </ReviewWrap>
    </>
  );
};

// Styled Components
const ReviewWrap = styled.div`
  max-width: 350px;
  width: 80vw;
  height: 90vh;
  margin: 5vh auto;
  padding: 5vh 5vw;
  border: 3px solid #ddd;
  box-sizing: border-box;
  border-radius: 5px;
`;

const ReviewTitle = styled.h3`
  text-align: center;
`;

const ReviewDays = styled.span`
  color: #fff;
  font-weight: 900;
  background: orange;
  padding: 0.2rem;
  border-radius: 5px;
`;

const ReviewCircleList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
`;

const ReviewCircleDesign = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 5px;
`;

const ReviewBtn = styled.button`
  width: 100%;
  background-color: purple;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  color: #fff;
`;
export default Review;
