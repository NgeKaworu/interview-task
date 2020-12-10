import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  select:invalid {
    color: gray;
  }
  height: 28px;

  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  grid-template-columns: 3fr 1fr 2fr 2fr;
  justify-content: left;
  
  .btn {
    margin-left: 8px;
    border: none;
    border-radius: 4px;
  }
`;

export default function InputForm({ onSubmit = () => {} }) {
  const [data, setData] = useState({
    task: "",
    price: "",
    type: "",
  });

  function formChangeHandler(field) {
    return (e) => {
      setData({
        ...data,
        [field]: e.currentTarget.value,
      });
    };
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
    >
      <input
        
        required
        placeholder="任务"
        value={data["task"]}
        onChange={formChangeHandler("task")}
      ></input>
      <input
        
        className="price"
        required
        placeholder="价格"
        value={data["price"]}
        onChange={formChangeHandler("price")}
        type="number"
        min={0}
        step={0.01}
      ></input>
      <select
        
        required
        value={data["type"]}
        onChange={formChangeHandler("type")}
      >
        <option value="" disabled hidden>
          货币类型
        </option>
        <option value="RUB">₽</option>
        <option value="CNY">¥</option>
        <option value="USD">$</option>
      </select>
      <input className="btn" type="submit" value="添加"></input>
    </Form>
  );
}
