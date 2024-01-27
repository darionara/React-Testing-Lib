import { useState, MouseEvent } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { toLocaleString } from "./utils/toLocaleString";
import { removeSpaces } from "./utils/removeSpaces";

type CalculatorState = {
  sign: string;
  num: number | string; 
  res: number | string; 
};

const btnValues: (number | string)[][] = [
  [7, 8, 9, "C"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "/", "X", "="],
];

function App() {
  const [calc, setCalc] = useState<CalculatorState>({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    if (removeSpaces(calc.num.toString()).length < 16) {
      setCalc((prevCalc) => ({
        ...prevCalc,
        num:
          removeSpaces(prevCalc.num.toString()) % 1 === 0
            ? toLocaleString(
                Number(removeSpaces(prevCalc.num.toString() + value))
              )
            : toLocaleString(prevCalc.num.toString() + value),
        res: !prevCalc.sign ? 0 : prevCalc.res,
      }));
    }
  };

  const signClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc((prevCalc) => ({
      ...prevCalc,
      sign: value,
      res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
      num: 0,
    }));
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a: number, b: number, sign: string) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc((prevCalc) => ({
        ...prevCalc,
        res:
          prevCalc.sign === "/" && prevCalc.num === '0'
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(prevCalc.res.toString())),
                  Number(removeSpaces(prevCalc.num.toString())),
                  prevCalc.sign
                )
              ),
        sign: "",
        num: 0,
      }));
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Calculator>
      <Screen
        data-testid="calculator-screen"
        value={calc.num ? calc.num : calc.res}
      />
      <ButtonBox>
        {btnValues.flat().map((btn, index) => (
          <Button
            key={index}
            className={btn === "=" ? "calculator__button--equals" : ""}
            value={btn}
            onClick={
              btn === "C"
                ? resetClickHandler
                : btn === "="
                ? equalsClickHandler
                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                ? signClickHandler
                : numClickHandler
            }
          />
        ))}
      </ButtonBox>
    </Calculator>
  );
}

export default App;
