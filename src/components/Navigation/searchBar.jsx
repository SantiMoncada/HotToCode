import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { Menu, MenuItem, AsyncTypeahead } from 'react-bootstrap-typeahead';
import userService from "../../services/user.services";

import './Navigation.css'
import { Button, Form } from "react-bootstrap"
import { MdOutlineSearch } from 'react-icons/md'


const SearchBar = () => {

    const [fetchingUserData, setFetchingUserData] = useState(true);
    const [userSearchResult, setUserSearchResult] = useState([]);

    let navigate = useNavigate();

    const handlerSearchQuery = (query) => {
        setFetchingUserData(true)
        userService.getAllUsers({ username: query })
            .then(({ data }) => {
                const userLabels = data.map(user => { return { label: user.username, id: user._id } })
                setUserSearchResult(userLabels)
                setFetchingUserData(false)
            })
            .catch(err => {
                setFetchingUserData(false)
                console.log(err)
            })
    }


    const childRender = (results, menuProps) => (
        <Menu {...menuProps}>
            {results.map((result, index) => (
                <MenuItem
                    key={result.id}
                    onClick={() => navigate(`/user/${result.id}`)}
                    option={result}
                    position={index}>
                    {result.label}
                </MenuItem>
            ))}
        </Menu>
    )

    const handleSearchButton = () => {
        if (userSearchResult[0]) {
            navigate(`/user/${userSearchResult[0].id}`)
        }
    }

    return (
        <Form className="SearchBarForm">

            <AsyncTypeahead
                id='user-search-bar-aysnc'
                isLoading={fetchingUserData}
                labelKey={option => (option.label)}
                placeholder="Search Users ..."
                minLength={1}
                onSearch={handlerSearchQuery}
                options={userSearchResult}
                renderMenu={childRender}
            />
            <Button onClick={handleSearchButton} variant="outline-success"><MdOutlineSearch /></Button>


        </Form>
    )
}

export default SearchBar