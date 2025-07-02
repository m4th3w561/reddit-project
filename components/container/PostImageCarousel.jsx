import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function PostImageCarousel({ images }) {
  if (!images?.length) {
    return null;
  }

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.includes("v.redd.it");
  };

  return (
    <Carousel className="w-full mb-4">
      <CarouselContent>
        {images.map((media, idx) => (
          <CarouselItem key={idx} className="flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md">
              {isVideo(media) ? (
                <AspectRatio ratio={4 / 3} className="bg-[#232324] rounded-md">
                  <video
                    src={media}
                    controls
                    className="w-full h-full object-contain rounded-md"
                    preload="metadata"
                    poster=""
                  >
                    Your browser doesn't support the video file.
                  </video>
                </AspectRatio>
              ) : media.toLowerCase().endsWith('.gif') ? (
                <AspectRatio ratio={4 / 3} className="bg-[#232324] rounded-md">
                  <img
                    src={media}
                    alt={`Post visual ${idx + 1}`}
                    className="w-full h-full object-contain rounded-md"
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{ display: 'block' }}
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={4 / 3} className="bg-[#232324] rounded-md">
                  <Image
                    src={media}
                    alt={`Post visual ${idx + 1}`}
                    fill
                    className="object-contain rounded-md"
                    sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 60vw, 400px"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </AspectRatio>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-2 cursor-pointer" />
          <CarouselNext className="right-2 cursor-pointer" />
        </>
      )}
    </Carousel>
  );
}
