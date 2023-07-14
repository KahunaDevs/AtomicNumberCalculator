import React from 'react'
import styles from './Element.module.css'

function Element({ number, symbol, name, onLeftClick, onRightClick }) {
    return (
        <div className={styles.element} onClick={onLeftClick} onContextMenu={onRightClick}>
            <div className={styles.atomicNumber}>{number}</div>
            <div className={styles.symbol}>{symbol}</div>
            <div className={styles.name}>{name}</div>
        </div>
    )
}

export default Element