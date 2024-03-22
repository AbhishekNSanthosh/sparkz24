
import { Merienda } from "next/font/google";
import { ColorModeScript } from '@chakra-ui/react'
import '@styles/main.scss'
import styles from '@styles/scss/home.module.scss'
import Navbar from "@widgets/Navbar";
import { ChakraProvider } from '@chakra-ui/react'
const inter = Merienda({ subsets: ["latin"] });
import theme from '@styles/theme'

export const metadata = {
  title: "SPARKZ'24",
  description: "Official website of SparkzCCET 2024",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>

          <ColorModeScript initialColorMode={"dark"} />
          <Navbar />
          <div className={styles.container}>
            {children}
          </div>
        <ChakraProvider  />
      </body>
    </html>
  );
}
