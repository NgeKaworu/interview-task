import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";

import toFixed from "./utils/toFixed";

const RatePanel = styled.div`
  display: flex;
  justify-content: flex-end;
  > span {
    margin-right: 8px;
  }
`;

function App() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.globus.furniture/forex").then((res) => res.json())
  );

  const [sourceData, setSourceData] = useState([
    {
      CNY: 0.08918538073239035,
      RUB: 1,
      USD: 0.01364150400309935,
      done: false,
      id: 0,
      task: "去吃麻辣烫",
    },

    {
      CNY: 0.08918538073239035,
      RUB: 1,
      USD: 0.01364150400309935,
      done: false,
      id: 1,
      task: "去吃海底捞",
    },

    {
      CNY: 0.08918538073239035,
      RUB: 1,
      USD: 0.01364150400309935,
      done: true,
      id: 2,
      task: "去看电影",
    },
  ]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  // 人民币换美元
  const CNY2USD = data?.USD?.value,
    // 人命币换卢布
    CNY2RUB = data?.RUB?.value,
    // 美元换人民币
    USD2CNY = 1 / CNY2USD,
    // 美元换卢布
    USD2RUB = CNY2RUB / CNY2USD,
    // 卢布换人民币
    RUB2CNY = 1 / CNY2RUB,
    // 卢布换美元
    RUB2USD = 1 / USD2RUB;

  const [doneList, activeList] = sourceData.reduce(
    (acc, cur) => {
      let [dList, aList] = acc;
      if (cur.done === true) {
        return [dList.concat(cur), aList];
      } else {
        return [dList, aList.concat(cur)];
      }
    },
    [[], []]
  );

  function checkedHandler(id) {
    return () => {
      let tmp = [...sourceData];
      tmp[id]["done"] = !tmp[id]["done"];
      setSourceData(tmp);
    };
  }

  console.log(sourceData);
  return (
    <div>
      <InputForm
        onSubmit={({ price, task, type }) => {
          const priceNumber = +price;
          let baseObj = {
            id: sourceData.length,
            done: false,
            task,
          };
          switch (type) {
            case "RUB": {
              baseObj.RUB = priceNumber;
              baseObj.USD = RUB2USD * priceNumber;
              baseObj.CNY = RUB2CNY * priceNumber;
              break;
            }
            case "CNY": {
              baseObj.CNY = priceNumber;
              baseObj.RUB = CNY2RUB * priceNumber;
              baseObj.USD = CNY2USD * priceNumber;
              break;
            }
            case "USD": {
              baseObj.USD = priceNumber;
              baseObj.RUB = USD2RUB * priceNumber;
              baseObj.CNY = USD2CNY * priceNumber;
              break;
            }
            default:
              console.error("Invalid type: ", type);
          }

          setSourceData(sourceData.concat(baseObj));
        }}
      ></InputForm>

      <RatePanel>
        <span>{toFixed(CNY2RUB, 3)} ₽/¥</span>
        <span>{toFixed(USD2RUB, 3)} ₽/$</span>
        <span>{toFixed(USD2CNY, 3)} ¥/$</span>
      </RatePanel>

      <TodoList
        title="计划"
        totalText="将要花费"
        sourceData={activeList}
        onChange={checkedHandler}
      ></TodoList>

      <TodoList
        title="已完成"
        totalText="一共花了"
        sourceData={doneList}
        onChange={checkedHandler}
      ></TodoList>
    </div>
  );
}

export default App;
