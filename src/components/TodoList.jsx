import React from "react";
import styled from "styled-components";
import toFixed from "../utils/toFixed";

const Wrap = styled.div`
  border: 2px solid #333;
  background: #eee;
  > div {
    border-bottom: 1px solid;
  }
  > div:last-child {
    border-bottom: none;
  }
`;
const Item = styled.div`
  padding: 8px;
  display: flex;
  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 16.6%;
  }
  > div:first-child {
    width: unset;
    flex: 1;
  }
`;

export default function TodoList({
  sourceData = [],
  title = "",
  totalText = "",
  onChange = () => {},
}) {
  const [tRUB, tCNY, tUSD] = sourceData.reduce(
    (acc, cur) => {
      acc[0] = toFixed(acc[0] + cur.RUB, 5);
      acc[1] = toFixed(acc[1] + cur.CNY, 5);
      acc[2] = toFixed(acc[2] + cur.USD, 5);
      return acc;
    },
    [0, 0, 0]
  );

  if (sourceData.length === 0) {
    return null;
  }

  return (
    <div>
      {title && (
        <Item>
          <div style={{ marginLeft: "-8px" }}>{title}: </div>
        </Item>
      )}
      <Wrap>
        {sourceData.map((date, i) => {
          const { task, RUB, USD, CNY, done, id } = date;
          return (
            <Item key={i} onClick={onChange(id)}>
              <div
                style={{
                  textDecoration: done && "line-through",
                }}
              >
                <input type="checkbox" checked={done} readOnly />
                {task}
              </div>
              <Currency unit="₽" value={RUB} fractionDigits={5} />
              <Currency unit="¥" value={CNY} fractionDigits={5} />
              <Currency unit="$" value={USD} fractionDigits={5} />
            </Item>
          );
        })}
      </Wrap>
      {totalText && (
        <Item>
          <div style={{ marginLeft: "-8px" }}>{totalText}:</div>
          <Currency unit="₽" value={tRUB} fractionDigits={5} />
          <Currency unit="¥" value={tCNY} fractionDigits={5} />
          <Currency unit="$" value={tUSD} fractionDigits={5} />
        </Item>
      )}
    </div>
  );
}

function Currency({ value = 0, unit = "", fractionDigits = 0 }) {
  const str = unit + toFixed(value, fractionDigits).toString();

  return <div title={str}>{str}</div>;
}
