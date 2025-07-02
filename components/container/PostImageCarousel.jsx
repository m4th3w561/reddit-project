import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function PostImageCarousel ({ images }) {
  if (!images?.length) {
    return;
  }

  // Helper function to check if URL is a video
  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.includes("v.redd.it");
  };

  return (
    <Carousel className="w-full mb-4">
      <CarouselContent>
        { images.map((media, idx) => (
          <CarouselItem key={ idx } className="flex justify-center">
            <div className="max-w-md w-full max-h-[40rem]">
              {isVideo(media) ? (
                <video
                  src={media}
                  controls
                  className="w-full h-auto max-h-[40rem] object-contain rounded-md"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={ media }
                  alt={ `Post visual ${idx + 1}` }
                  width={ 400 }
                  height={ 0 }
                  className="w-full h-auto max-h-[40rem] object-contain rounded-md"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={ idx === 0 }
                />
              )}
            </div>
          </CarouselItem>
        )) }
      </CarouselContent>
      {/* Built-in arrows - only show if more than 1 image */ }
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-2 cursor-pointer" />
          <CarouselNext className="right-2 cursor-pointer" />
        </>
      )}
      {/* Dots are built-in and can be customized if you want */ }
    </Carousel>
  );
}
