import React from 'react'
import styles from './Element.module.css'

const handleRightClick = (callback) => (e) => {
    e.preventDefault();
    callback()
}

function Element({ number, symbol, name, group, grouping, selected, onLeftClick, onRightClick }) {
    return (
        <div className={`${styles.element} ${styles[grouping]} ${selected ? styles.selected : ""}`} onClick={onLeftClick} onContextMenu={handleRightClick(onRightClick)}>
            <div className={styles.atomicNumber}>{number}</div>
            <div className={styles.symbol}>{symbol}</div>
            <div className={styles.name}>{name}</div>
        </div>
    )
}

export default Element