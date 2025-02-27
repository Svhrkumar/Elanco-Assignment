import { FC } from "react"

interface SearchBarProps {
    searchTerm: string,
    setSearchTerm: (value: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-4 flex justify-center items-center w-full">
            <div className="flex flex-col content-between w-[50%]">
                <input
                    id="search"
                    type="text"
                    placeholder="Enter country name"
                    className="border border-gray-300 p-3 w-100 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

        </div>
    )
}

export default SearchBar;