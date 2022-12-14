import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import SnipperCard from "../../components/SnippetCard"
import snippetService from "../../services/snippets.services"
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Loader from "../Loader";
const CarouselHome = () => {

    const [snippets, setSnippets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [carrouselPeek, setCarrouselPeek] = useState(50)

    useEffect(() => {
        setIsLoading(true)
        loadSnippet()
        updatePeek()
    }, [])

    const updatePeek = () => {
        if (window.innerHeight < 800) {
            setCarrouselPeek(0)
        } else {
            setCarrouselPeek(50)

        }
    }

    const loadSnippet = () => {
        snippetService.getSnippets({ limit: 20 })
            .then(({ data }) => {
                setIsLoading(false)
                setSnippets(data)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const responsive = {
        0: { items: 1 },
        568: {
            items: 2,
        },
        1024: {
            items: 3,
        },
    };

    const items = snippets.map(
        snippet => {
            return (
                <Container>
                    <SnipperCard {...snippet} />
                </Container>
            )
        }
    )

    const onResized = (e) => {
        updatePeek()
    };

    console.log(window.innerWidth)
    console.log({ carrouselPeek })
    const Carousel = () => (
        <AliceCarousel

            activeIndex={3}

            autoPlay
            autoPlayStrategy="none"
            autoPlayInterval={1000}
            animationDuration={1000}
            infinite
            touchTracking={false}
            disableDotsControls
            disableButtonsControls
            paddingLeft={carrouselPeek}
            paddingRight={carrouselPeek}
            mouseTracking
            items={items}
            onResized={onResized}
            responsive={responsive}
            autoPlayDirection='rtl'
        />
    )

    return (
        <>
        {isLoading ?
            <Loader/>
            :    
            Carousel()
            }
        </>
    )
}

export default CarouselHome