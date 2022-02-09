import styles from '../styles/Layout.module.css'
import { svg } from '../dir/functions'
import React from 'react'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        Made with ❤ in Israel © 2022 Siman tov Jamberu. All rights reserved.
      </span>
      <div>
        <a
          href="https://github.com/jamberusimantov"
          target="_blank"
          rel="noopener noreferrer">
          <span>
          {svg('github')}
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/siman-tov-jamberu/"
          target="_blank"
          rel="noopener noreferrer">
          <span>
          {svg('linkedin')}
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer