import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image"; // Or the image component you use

export default function PostImageCarousel({ images }) {
  if (!images?.length) {
    return ;
  }

  return (
    <Carousel className="w-full mb-4">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={idx} className="flex justify-center">
            <div className="relative aspect-video w-full h-full">
              <Image
                src={img}
                alt={`Post visual ${idx + 1}`}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 640px"
                priority={idx === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Built-in arrows */}
      <CarouselPrevious className="left-2 cursor-pointer" />
      <CarouselNext className="right-2 cursor-pointer" />
      {/* Dots are built-in and can be customized if you want */}
    </Carousel>
  );
}
