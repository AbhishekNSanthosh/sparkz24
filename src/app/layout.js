
import { Merienda } from "next/font/google";
import '@styles/main.scss'
import styles from '@styles/scss/home.module.scss'
import Navbar from "@widgets/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Merienda({ subsets: ["latin"] });

export const metadata = {
  title: "SPARKZ'24",
  description: "Official website of SparkzCCET 2024",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
          <div className={styles.container}>
            {children}
          </div>
          <ToastContainer />
      </body>
    </html>
  );
}
