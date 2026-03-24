import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function Home() {
    return <Container>
        <AlbumsFilter className="mb-9" />
        <PhotosList />
    </Container>
}