import { useTransition } from "react";
import Divider from "../../../components/divider";
import InputCheckbox from "../../../components/input-checkbox";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";
import type { Photo } from "../../photos/models/photo";
import useAlbums from "../hooks/use-albums";

interface AlbumsListSelectableProps {
    photo: Photo;
}

export default function AlbumsListSelectable({ photo }: AlbumsListSelectableProps) {
    const { albums, isLoadingAlbums } = useAlbums();
    const { managePhotoOnAlbum } = usePhotoAlbums();
    const [ isUpdatingPhoto, setIsUpdatingPhoto ] = useTransition();

    function isChecked(albumId: string) {
        return photo?.albums.some(album => album.id === albumId);
    }

    async function handlePhotoOnAlbums(albumId: string) {
        let albumsIds = [];

        if (isChecked(albumId)) {
            albumsIds = photo.albums.filter((album) => album.id !== albumId).map((album) => album.id);
        } else {
            albumsIds = [...photo!.albums.map(album => album.id), albumId]
        }

        setIsUpdatingPhoto(async() => {
            await managePhotoOnAlbum(photo.id, albumsIds);
        })
    }

    return <ul className="flex flex-col gap-4">
        {!isLoadingAlbums && albums.length > 0 && albums.map((album, index) => (
            <li key={album.id}>
                <div className="flex items-center justify-between gap-1">
                    <Text variant="paragraph-large" className="flex items-center justify-between gap-1 truncate">{album.title}</Text>
                    <InputCheckbox defaultChecked={isChecked(album.id)} onChange={() => handlePhotoOnAlbums(album.id)} disabled={isUpdatingPhoto} />
                </div>
                {index !== albums.length - 1 && <Divider className="mt-4" />}
            </li>
        ))}

        {isLoadingAlbums && Array.from({ length: 5 }).map((_, index) => (
            <li key={`albums-list-${index}`}>
                <Skeleton className="h-[2.5rem]"/>
            </li>
        ))}
    </ul>
}