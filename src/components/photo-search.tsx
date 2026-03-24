import { useState, useCallback } from "react";
import InputText from "./input-text";
import SearchIcon from '../assets/icons/search.svg?react';
import { debounce } from "../helpers/inputs";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotoSearch() {
    const [inputValue, setInputValue] = useState('');
    const { filters } = usePhotos();

    const debounceSetValue = useCallback(debounce((value: string) => filters.setQ(value), 200), [filters.setQ]);

    function handleInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {

        setInputValue(target.value);
        debounceSetValue(target.value);
    }

    return (
        <InputText icon={SearchIcon} placeholder="Buscar fotos" className="flex-1" value={inputValue} onChange={handleInputChange}/>
    );
}