'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Element from './components/Element.js';
import Spacer from './components/Spacer';


export default function Home() {
  const [elements, setData] = useState([]);
  const [target, setTarget] = useState(200);
  const [currentSum, setCurrentSum] = useState(0);
  const [selections, setSelections] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  const handleAdd = (element) => {
    setCurrentSum(currentSum + element.number);
    setSelections([...selections, element]);
  }

  const handleRemove = (element) => {
    // Remove only one instance of the number from the selections array
    const index = selections.indexOf(element);
    if (index > -1) {
      selections.splice(index, 1);
      setCurrentSum(currentSum - element.number);
    }
    setSelections([...selections]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./data/data.json');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Atomic Number Calculator
      </h1>
      <div className={styles.periodicTableContainer}>
        <div className={styles.periodicTable}>
          {
            // Loop through the elements array and create an Element component for each element. If Number is 0, instead create a spacer item
            elements.map((element, index) => {
              if (element.number === 0) {
                return <Spacer key={index} start={element.start} end={element.end} />
              } else {
                return <Element key={index} number={element.number} symbol={element.symbol} name={element.name} group={element.group} grouping={element.grouping} selected={selections.some(x => x === element)} onLeftClick={() => handleAdd(element)} onRightClick={() => handleRemove(element)} />
              }
            })
          }
        </div>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <div className={styles.targetInput}>
            <label htmlFor="target">Target Sum</label>
            <input type="text" id="target" name="target" placeholder="Target Atomic Number" onChange={(evt => setTarget(evt.target.value))} value={target} />
          </div>
          <div className={styles.currentSumOutput}>
            <label htmlFor="current">Current Sum</label>
            <p name="current" className={currentSum < target ? styles.underTarget : currentSum > target ? styles.overTarget : styles.correct}>{currentSum}</p>
          </div>
        </div>
        <textarea id="output" name="output" rows="10" cols="50" placeholder="Elements" readOnly value={
          selections.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.symbol;
          }, "")
        }
          onClick={
            (evt) => {
              // Check to see if we have text, if not skip the copy
              if (evt.target.value === "") {
                return;
              }

              if (!navigator.clipboard) {
                evt.target.select();
                document.execCommand("copy");
              } else {
                var outputText = evt.target.value
                navigator.clipboard.writeText(outputText).then(
                  function () {
                    setSnackbar("Copied to clipboard");
                    setTimeout(() => {
                      setSnackbar(null);
                    }, 2000);
                  })
                  .catch(
                    function () {
                      setSnackbar("Error copying to clipboard");
                      setTimeout(() => {
                        setSnackbar(null);
                      }, 2000);
                    });
              }
            }
          }></textarea>
        <div id="snackbar" className={snackbar ? "visible" : ""}>{snackbar}</div>
      </div>

    </main>
  )
}
