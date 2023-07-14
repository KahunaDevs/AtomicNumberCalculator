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

  const handleAdd = (element) => {
    setCurrentSum(currentSum + element.Number);
    setSelections([...selections, element]);
  }

  const handleRemove = (element) => {
    setCurrentSum(currentSum - element.Number);
    // Remove only one instance of the number from the selections array
    const index = selections.indexOf(element);
    if (index > -1) {
      selections.splice(index, 1);
    }
    setSelections([...selections]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/data.json');
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
              if (element.Number === 0) {
                return <Spacer key={index} start={element.Start} end={element.End} />
              } else {
                return <Element key={index} number={element.Number} symbol={element.Symbol} name={element.Name} onLeftClick={() => handleAdd(element)} onRightClick={() => handleRemove(element)} />

              }
            })
          }
        </div>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <div className={styles.targetInput}><label htmlFor="target">Target Sum</label><input type="text" id="target" name="target" placeholder="Target Atomic Number" value={target} /></div>
          <p>{currentSum}</p>
        </div>
        <textarea id="output" name="output" rows="10" cols="50" placeholder="Output"></textarea>
      </div>

    </main>
  )
}
