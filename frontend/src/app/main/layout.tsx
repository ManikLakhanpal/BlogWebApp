import NavigationBar from "@/containers/navigationBar";
import RightSideBar from "@/components/RightSideBar";
import LeftSideBar from "@/components/LeftSideBar";
import {ShowCreateProvider} from "@/context/showCreate";

export default function VerificationLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ShowCreateProvider>
            <section>
                <NavigationBar/>
                <LeftSideBar/>
                <RightSideBar/>
                {children}
            </section>
        </ShowCreateProvider>
    );
}
  