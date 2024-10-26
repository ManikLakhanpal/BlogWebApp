import Image from "next/image";

// For type safety
interface userData {
  name: string | null;
  photos: string | null;
}

// GitHub sign in Image here
function GitHubImage(props: userData) {
  console.log(props);
  return (
    <Image
      src={
        props.photos ||
        "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg"
      }
      height={150}
      width={150}
      alt="User's Google Profile"
      className="rounded-full border-2"
    />
  );
}

// GitHub sign in text here
function GitHubText(props: userData) {
  return (
    <h1 className="font-black mt-5 text-white text-xl">Welcome {props.name}</h1>
  );
}

export { GitHubImage, GitHubText };
