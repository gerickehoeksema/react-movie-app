import React, { Component } from 'react';

// Components
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

// Styles
import './Home.css'

// Configs
import {
    API_URL
    ,API_KEY
    ,IMAGE_BASE_URL
    ,BACKDROP_SIZE
    ,POSTER_SIZE
} from '../../config'

// Statefull component
class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    // Life cycle methods
    componentDidMount() {
        // Check local storeage before doing api call
        if (localStorage.getItem('HomeState')) {
            const state = JSON.parse(localStorage.getItem('HomeState'))
            this.setState({...state})
        }
        else{
            this.setState({loading: true})
            this.fetchItems(this.createEndpoint('movie/popular', false, ''))
        }
        
    }

    //#region custom methods
    fetchItems = async endpoint => {
        // ES6 Destruturing the state
        const { movies, heroImage, searchTerm } = this.state

        try {
            const result = await (await fetch(endpoint)).json()

            this.setState({
                movies: [...movies, ...result.results],// make copy of old array and then append new items
                heroImage: heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            }, () => {
                // Don't store search results
                if (searchTerm === '') {
                    // Store data to local browser storage
                    localStorage.setItem('HomeState', JSON.stringify(this.state))
                }
            })
        }
        catch(e) {
            console.error(`Error: ${e}`)
        }
        
    }

    
    // fetchItems = (endpoint) => {
    //     // ES6 Destruturing the state
    //     const { movies, heroImage, searchTerm } = this.state

    //     fetch(endpoint)
    //     .then(result => result.json())
    //     .then(result => {
    //         this.setState({
    //             movies: [...movies, ...result.results],// make copy of old array and then append new items
    //             heroImage: heroImage || result.results[0],
    //             loading: false,
    //             currentPage: result.page,
    //             totalPages: result.total_pages
    //         })
    //     }, () => {
    //         // Don't store search results
    //         if (searchTerm === '') {
    //             // Store data to local browser storage
    //             localStorage.setItem('HomeState', JSON.stringify(this.state))
    //         }
    //     })
    // }

    // loadMoreItems = () => {
    //     let endpoint = '';
    //     this.setState({loading: true})

    //     if(this.state.searchTerm === '') {
    //         endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
    //     }
    //     else {
    //         endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    //     }

    //     this.fetchItems(endpoint)
    // }

    createEndpoint = (type, loadMore, searchTerm) => {
        return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore && this.state.currentPage + 1}&query=${searchTerm}`;
    }

    updateItems = (loadMore, searchTerm) => {
        this.setState({
            movies: loadMore ? [...this.state.movies] : [],
            loading: true,
            searchTerm: loadMore ? this.state.searchTerm : searchTerm
        }, () => {
            this.fetchItems(
                !this.state.searchTerm
                ? this.createEndpoint('movie/popular',loadMore, '')
                : this.createEndpoint('search/movie', loadMore, this.state.searchTerm)
            )
        })
    }

    // searchItems = (searchTerm) => {
    //     let endpoint = ''
    //     this.setState({
    //         movies: [],
    //         loading: true,
    //         searchTerm
    //     })

    //     if(searchTerm === '') {
    //         endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    //     }
    //     else {
    //         endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    //     }

    //     this.fetchItems(endpoint)
    // }
    //#endregion

    render() {
        // ES6 destructuring the state
        const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state

        return(
            <div className="rmdb-home">
                { heroImage ?
                    <div>
                        <HeroImage 
                            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                            title={heroImage.original_title}
                            text={heroImage.overview}
                        />
                        <SearchBar callback={this.updateItems} />
                    </div>
                : null }
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={loading}
                    >
                        { movies.map( (element,i) => {
                            return <MovieThumb
                                        key={i}
                                        clickable={true}
                                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}` : './images/no_image.jpg'}
                                        movieId={element.id}
                                        movieName={element.original_title}
                                    />
                        })}
                    </FourColGrid>
                    { loading ? <Spinner /> : null }
                    {(currentPage < totalPages && !loading) ?
                        <LoadMoreBtn 
                            text="Load More"
                            onClick={this.updateItems}
                        />
                        : null }
                </div>
            </div>
        )
    }

}

export default Home;