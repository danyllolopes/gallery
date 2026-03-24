import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotos from "../../photos/hooks/use-photos";
import useAlbums from "../hooks/use-albums";
import cx from 'classnames';

interface AlbumsFilterProps extends React.ComponentProps<'div'> { }

export default function AlbumsFilter({ className, ...props }: AlbumsFilterProps) {
    const { albums, isLoadingAlbums } = useAlbums();
    const { filters } = usePhotos();

    return <div className={cx(`flex items-center gap-3.5 overflow-x-auto`, className)} {...props}>
        <Text variant="heading-small">Álbums</Text>
        <div className="flex gap-3">
            {!isLoadingAlbums ? (
                <>
                    <Button size="sm" className="cursor-pointer" variant={filters.albumId === null ? 'primary' : 'ghost'} onClick={() => filters.setAlbumId(null)}>Todos</Button>
                    {albums.map((album) => (
                        <Button size="sm" className="cursor-pointer" variant={filters.albumId === album.id ? 'primary' : 'ghost'} key={album.id} onClick={() => filters.setAlbumId(album.id)}>{album.title}</Button>
                    ))}
                </>
            ) : (
                Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={`album-button-loading-${index}`} className="w-28 h-7" />
                ))
            )}
        </div>
    </div>
}