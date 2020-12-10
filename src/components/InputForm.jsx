import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  select:invalid {
    color: gray;
  }
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-content: left;
  .price {
    width: 48px;
  }
  .btn {
    width: 128px;
    margin-left: 8px;
  }
`;

export default function InputForm({ onSubmit = () => {} }) {
  const [date, setDate] = useState({
    task: "",
    price: "",
    type: "",
  });

  function formChangeHandler(field) {
    return (e) => {
      setDate({
        ...date,
        [field]: e.currentTarget.value,
      });
    };
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(date);
      }}
    >
      <input
        
        required
        placeholder="任务"
        value={date["task"]}
        onChange={formChangeHandler("task")}
      ></input>
      <input
        
        className="price"
        required
        placeholder="价格"
        value={date["price"]}
        onChange={formChangeHandler("price")}
        type="number"
        min={0}
        step={0.01}
      ></input>
      <select
        
        required
        value={date["type"]}
        onChange={formChangeHandler("type")}
      >
        <option value="" disabled hidden>
          货币类型
        </option>
        <option value="RUB">₽</option>
        <option value="CNY">¥</option>
        <option value="USD">$</option>
      </select>
      <input className="btn" type="submit" value="提交"></input>
    </Form>
  );
}
