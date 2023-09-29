import { images } from "@/constants";

/**
 * @description youtube tutorial: https://www.youtube.com/watch?v=hJ7Rg1821Q0&t=8s
 */
const Gallery = (): JSX.Element => {
  return (
    <div className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {images.map((current) => (
        <div
          key={current.lg}
          className=" bg-cover bg-center min-h-[220px] flex justify-center items-center"
          style={{ backgroundImage: `url(images/${current.xs})` }}
        >
          <img
            src={`images/${current.lg}`}
            alt="..."
            loading="lazy"
            className="w-full block object-center object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
