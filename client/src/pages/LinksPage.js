import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http"
import Loader from "../components/Loader"
import LinksList from "../components/LinksList"

const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loading)
        return <Loader/>

    return (
        <>
            <LinksList links={links} />
        </>
    )
}

export default LinksPage