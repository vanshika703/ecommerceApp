import Image from "next/image";

const ImageComponent = () => {
  return (
    <Image
      src={
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/450ed1df-8e17-4d87-a244-85697874661c/NIKE+REVOLUTION+7.png"
      }
      alt={"image"}
      width={200}
      height={200}
      className="w-full h-48 object-cover rounded-md mb-4"
      priority={true}
    />
  );
};

export default ImageComponent;
