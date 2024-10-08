import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/githib/github.api";
import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../componenets/RepoCard";

const HomePage = () => {

    const [search, setSearch] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const debounced = useDebounce(search);
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    });

    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    const clickHandler = (username: string) => {
        fetchRepos(username);
        setDropdownOpen(false)
    }

    useEffect(() => {
        setDropdownOpen(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data]);


    return (
        <div className="flex justify-center pt-10 mx-auto w-screen">
            {isError && <p className="text-center text-red-700">Somethins went wrong...</p>}
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdownOpen &&
                    <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                        {isLoading && <p className="text-center">Loading...</p>}
                        {data?.map(user => (
                            <li key={user.id}
                                className="py-2 px-4 hover:bg-gray-500
                                            hover:text-white transition-colors duration-200 cursor-pointer"
                                onClick={() => clickHandler(user.login)}
                            >
                                {user.login}
                            </li>
                        ))}

                    </ul>}
                <div className="container">
                    {areReposLoading && <p className="text-center">Repository are loading</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;