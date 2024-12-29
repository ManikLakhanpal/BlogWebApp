import NavigationBar from "@/containers/navigationBar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

export default function VerificationLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section>
        <NavigationBar />
          {/*<LeftSideBar user={user} setShowCreate={setShowCreate} />*/}
          <RightSideBar />
          {children}
      </section>  
    );
  }
  