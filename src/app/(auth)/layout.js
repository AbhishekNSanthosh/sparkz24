import { Merienda } from "next/font/google";
import '@styles/main.scss'
import styles from '@styles/scss/home.module.scss'
import Navbar from "@widgets/Navbar";
const inter = Merienda({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
      <div className={inter.className}>
        <Navbar />
        <div className={styles.container}>
          {children}
        </div>
      </div>
  );
}
