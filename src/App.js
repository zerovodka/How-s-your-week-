import React from "react";
import { Route } from "react-router-dom";

import Main from "./Main";
import Review from "./Review";

function App() {
  return (
    <div className="App">
      {/* exact 안주면 '/' <== 이게 포함된 모든 경로는 다 보여줘 버림 ㄹㅇ 안쓰면 페이지 똥망  */}
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/review/:week_day" exact>
        <Review />
      </Route>
    </div>
  );
}

export default App;
