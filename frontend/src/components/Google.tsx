import Image from "next/image";

// For type safety
interface userData {
    name: string | null;
    photos: string | null;
}

// Google sign in Image here
function GoogleImage(props: userData) {
    console.log(props);
    return (
        <Image
            src={props.photos || 'https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg'}
            height={150}
            width={150}
            alt="User's Google Profile"
            className="rounded-full border-2"
        />
    );
}

// Google sign in text here
function GoogleText(props: userData) {
    return (
        <h1 className="font-black mt-5 text-white text-xl">
          Welcome {props.name}
        </h1>
    );
}

export {GoogleImage, GoogleText};
