import React from 'react'

import styles from './Spacer.module.css'


function Spacer({ start, end }) {
    return (
        <div className={styles.gridSpacer} style={{ "gridColumn": `${start} / ${end}` }}></div>
    )
}

export default Spacer