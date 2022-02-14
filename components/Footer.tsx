import styles from '../styles/Layout.module.css'
import { svg, Btn } from '../dir/elements'
import React from 'react'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        Made with ❤ in Israel © 2022 Siman tov Jamberu. All rights reserved.
      </span>
      <div className={styles.footerBtnContainer}>
        <a
          href="https://github.com/jamberusimantov"
          rel="noopener noreferrer"
          target="_blank">
          <Btn child={svg('github')} className={styles.footerBtn} />
        </a>
        <a
          href="https://www.linkedin.com/in/siman-tov-jamberu/"
          rel="noopener noreferrer"
          target="_blank">
          <Btn child={svg('linkedin')} className={styles.footerBtn} />
        </a>
      </div>
    </footer>
  )
}

export default Footer