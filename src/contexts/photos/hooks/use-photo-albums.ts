import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";


export default function usePhotoAlbums() {
    const queyClient = useQueryClient();

    async function managePhotoOnAlbum(photoId: string, albumsIds: string[]) {
        try {
            await api.put(`/photos/${photoId}/albums`, {
                albumsIds
            })

            queyClient.invalidateQueries({ queryKey: ['photo', photoId] });
            queyClient.invalidateQueries({ queryKey: ['photos'] });

            toast.success('Álbuns atualizados.')
        } catch (e) {
            toast('Erro ao gerenciar álbuns da foto.')
            throw e;
        }
    }

    return {
        managePhotoOnAlbum
    }
}