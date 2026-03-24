import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotos from "../hooks/use-photos";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";

export default function PhotosList() {
    const { isLoadingPhotos, photos } = usePhotos();

    return (
        <div className="space-y-6">
            <Text as="div" variant="paragraph-large" className="flex items-center justify-end text-accent-span gap-1">Total: {' '} {!isLoadingPhotos ? <div>{photos.length}</div> : <Skeleton className="w-6 h-6" />}</Text>
            {!isLoadingPhotos && photos.length > 0 &&
                <div className="grid grid-cols-5 gap-9">
                    {photos.map(photo => <PhotoWidget key={photo.id} photo={photo} loading={isLoadingPhotos} />
                    )}
                </div>}

            {isLoadingPhotos &&
                <div className="grid grid-cols-5 gap-9">
                    {Array.from({ length: 10 }).map((_, index) => <PhotoWidget key={`photo-loading-${index}`} photo={{} as Photo} loading={isLoadingPhotos} />)}
                </div>
            }

            {
                !isLoadingPhotos && photos.length === 0 && <div className="flex justify-center items-center h-full">
                    <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
                </div>
            }
        </div >
    )
}