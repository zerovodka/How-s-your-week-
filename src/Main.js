import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

const MyWeek = (props) => {
  const history = useHistory();

  // 요일을 딕셔너리로 만들어준다.
  // getDay() 이용하면 숫자가 나오니 key : value 형식으로 만들어 주는 것
  const day_text_dict = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };

  //이런 친절 너무 좋습니다!! ^^7
  console.log(
    "요일이 한글로 바뀌었나 확인해봐야지! : ",
    Object.keys(day_text_dict).map((_d, idx) => day_text_dict[_d])
  );

  //날짜 구하기

  const week_days = Object.keys(day_text_dict).map((_d, idx) => {
    // 오늘 날짜
    let today = new Date().getDay();

    // _d는 day_text_dict의 key 값 => 0 ~ 6의 값이 들어옴
    // 딕셔너리에 저장한 key 값은 자동으로 문자열로 변환되기 떄문에, 숫자로서 key값을 이용하고 싶다면 반드시 parseInt()와 같은 숫자로 변환하는
    // 함수를 이용한 후 사용해야 한다!!!!!!!!!
    let d =
      today + parseInt(_d) > 6
        ? today + parseInt(_d) - 7
        : today + parseInt(_d);

    // 아주 좋은 주석입니다. ^^7
    // console.log(d);
    return day_text_dict[d];
  });

  console.log("오늘이 제일 위로 오는 지 확인해봐야지! : ", week_days);

  /**
   * 요일 별 평점을 남겨야하니, 현재 요일만 배열로 선언되어 있으므로, 배열과 평점을 딕셔너리화 하면 좋겠다
   *
   * 평점을 랜덤하게 보여주려면 Math.random() 써보자
   *
   * 평균은 각 요일 별 평점을 다 더한 후 요일 배열의 길이로 나누면 나오겠지
   */

  // 평점 합계
  let rate_sum = 0;

  // 요일별 점수를 랜덤하게 더해주자(평균 구해야지)
  const week_rates = week_days.map((w, idx) => {
    const random = Math.floor(Math.random() * (5 - 0)) + 0; //최대 최소 범위 정하는 방법이 (Math.random()*(최대값 - 최소값)) + 최소값
    rate_sum += random;

    // day : 요일 / rate : 랜덤 평점
    return {
      day: w,
      rate: random,
    };
  });

  //친절한 소오스 ^^7
  console.log(
    "평점이 랜덤하게 들어간 배열이 잘 나왔는 지 확인해봐야지! : ",
    week_rates,
    week_rates.length
  );

  const rate_avg = (rate_sum / week_rates.length).toFixed(1); //소수점 첫째자리까지 보여준다
  const [avg, setAvg] = useState(rate_avg);

  return (
    <>
      <Wrap>
        <Title>내 일주일은?</Title>
        {week_rates.map((w, idx) => {
          return (
            <RatesOfDays key={`week_day_${idx}`}>
              <p style={{ margin: "0 0.5rem 0 0", fontWeight: "bold" }}>
                {w.day}
              </p>

              {Array.from({ length: 5 }, (item, idx) => {
                return (
                  <CircleDesign
                    key={idx}
                    style={{
                      backgroundColor: w.rate < idx ? "#ddd" : "#ffeb3b",
                    }}
                  ></CircleDesign>
                );
              })}

              <ArrowDesign
                onClick={() => {
                  history.push(`/review/${w.day}`);
                }}
              ></ArrowDesign>
            </RatesOfDays>
          );
        })}
        <AvgWrap>
          평균 평점 {avg}
          <AvgBtn
            onClick={() => {
              setAvg(parseInt(0).toFixed(1));
            }}
          >
            <p style={{ color: "white", fontSize: "18px" }}>Reset</p>
          </AvgBtn>
        </AvgWrap>
      </Wrap>
    </>
  );
};

// Styled-Components
const Wrap = styled.div`
  max-width: 350px;
  width: 80vw;
  height: 90vh;
  margin: 5vh auto;
  padding: 5vh 0;
  border: 3px solid #ddd;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Title = styled.h3`
  text-align: center;
`;

const RatesOfDays = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
`;

const CircleDesign = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 5px;
`;

const ArrowDesign = styled.div`
  appearance: none;
  background-color: transparent;
  border-color: purple;
  width: 0;
  height: 0;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1.6rem solid purple;
  color: #fff;
  cursor: pointer;
`;

const AvgWrap = styled.div`
  width: 8rem;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: blue;
  padding: 9px;
  font-size: 25px;
  font-weight: bold;
`;

const AvgBtn = styled.div`
  width: inherit;
  height: fit-content;
  background-color: dodgerblue;
  border-radius: 6px;
  text-align: center;
  margin: 10px 0 0 0;
  cursor: pointer;
`;

export default MyWeek;
