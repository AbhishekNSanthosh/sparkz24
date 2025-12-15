import Footer from "@/widgets/common/Footer";
import Header from "@/widgets/common/Header";
import React from "react";

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
