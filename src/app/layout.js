import { Plus_Jakarta_Sans } from "next/font/google";
import styles from '@styles/main.scss'
const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "SPARKZ'24",
  description: "Official website of SparkzCCET 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          {children}
        </div>
      </body>
    </html>
  );
}
