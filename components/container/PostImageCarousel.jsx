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
            <div className="max-w-md w-full">
              {isVideo(media) ? (
                <AspectRatio ratio={16 / 9} className="bg-[#232324] rounded-md">
                  <video
                    src={media}
                    controls
                    className="w-full h-full object-contain rounded-md"
                    preload="metadata"
                  >
                    Your browser doesn't support the video file.
                  </video>
                </AspectRatio>
              ) : media.toLowerCase().endsWith('.gif') ? (
                <AspectRatio ratio={16 / 9} className="bg-[#232324] rounded-md">
                  <img
                    src={media}
                    alt={`Post visual ${idx + 1}`}
                    className="w-full h-full object-contain rounded-md"
                    loading={idx === 0 ? "eager" : "lazy"}
                    style={{ display: 'block' }}
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9} className="bg-[#232324] rounded-md">
                  <Image
                    src={media}
                    alt={`Post visual ${idx + 1}`}
                    fill
                    className="object-contain rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
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
