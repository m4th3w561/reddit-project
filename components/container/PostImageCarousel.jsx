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

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.includes("v.redd.it");
  };

  return (
    <Carousel className="w-full mb-4">
      <CarouselContent>
        { images.map((media, idx) => (
          <CarouselItem key={ idx } className="flex justify-center">
            <div className="max-w-sm sm:max-w-md w-full max-h-[20rem] sm:max-h-[30rem] lg:max-h-[40rem]">
              {isVideo(media) ? (
                <video
                  src={media}
                  controls
                  className="w-full h-auto max-h-[20rem] sm:max-h-[30rem] lg:max-h-[40rem] object-contain rounded-md"
                  preload="metadata"
                  playsInline
                  muted
                >
                  Your browser doesn't support the video file.
                </video>
              ) : (
                media.toLowerCase().endsWith('.gif') ? (
                  <img
                    src={media}
                    alt={`Post visual ${idx + 1}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-auto max-h-[20rem] sm:max-h-[30rem] lg:max-h-[40rem] object-contain rounded-md"
                    style={{ display: 'block' }}
                  />
                ) : (
                  <Image
                    src={ media }
                    alt={ `Post visual ${idx + 1}` }
                    width={ 400 }
                    height={ 0 }
                    className="w-full h-auto max-h-[20rem] sm:max-h-[30rem] lg:max-h-[40rem] object-contain rounded-md"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 400px"
                    priority={ idx === 0 }
                    loading={idx === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                )
              )}
            </div>
          </CarouselItem>
        )) }
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-1 sm:left-2 cursor-pointer h-8 w-8 sm:h-10 sm:w-10" />
          <CarouselNext className="right-1 sm:right-2 cursor-pointer h-8 w-8 sm:h-10 sm:w-10" />
        </>
      )}
    </Carousel>
  );
}
