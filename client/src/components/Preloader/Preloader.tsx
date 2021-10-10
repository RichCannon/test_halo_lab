import { FC } from 'react'
import styles from './Preloader.module.scss'

type PreloaderP = {};

const Preloader: FC<PreloaderP> = ({ }) => {
   return (
      <div className={styles.ldsHourglass}>
      </div>
   )
}



export default Preloader