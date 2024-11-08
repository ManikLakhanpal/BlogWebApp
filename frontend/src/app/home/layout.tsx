import NavigationBar from "@/containers/navigationBar";

export default function VerificationLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section>
        <NavigationBar />
          {children}
      </section>  
    );
  }
  