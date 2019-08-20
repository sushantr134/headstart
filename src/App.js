import React from 'react';
import {Header} from './components/Header'
import {Search} from './components/Search'

import axios from 'axios';
import './app.global.scss';
import {AppContent} from "./components/AppContent";
import {LandingPage} from "./components/LandingPage";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {appData: [], searchText: "", isLoading: true, index: 1, height: 730, removeLandingPage:false};
        this.loadContent = this.loadContent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.iScroll = React.createRef();
    }

    loadMore() {
        this.setState((prev) => {
            return {
                index: prev.index + 1
            }
        })
    }

    componentDidMount() {
        console.log(this.iScroll);
        if (this.iScroll.current !== undefined) {
            console.log(this.iScroll);
            this.iScroll.current.addEventListener("scroll", () => {
                if (this.iScroll.current.scrollTop + this.iScroll.current.clientHeight >= this.iScroll.current.scrollHeight) {
                    this.loadMore();
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.index !== this.state.index) {
            this.loadContent();
        }
    }


    handleSearch = (event) => {
        event.preventDefault();
        this.setState({searchText: event.target.value})
    };

    updateSearch = (event, newvalue) => {
        event.preventDefault();
        const newAppData = this.state.appData.filter((obj) => obj.ingredients.includes(newvalue));
        console.log(newAppData);
        this.setState((prev) => {
            return {
                searchText: prev.searchText + ", " + newvalue,
                appData: [...prev.appData, ...newAppData]
            }
        });
    };

    loadContent = (event) => {
        //event.preventDefault();
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        let endpoint = `/api/?i=${this.state.searchText}&p=${this.state.index}`;
        this.setState({removeLandingPage:true});
        if (process.env.REACT_APP_API_URL) {
            endpoint = `${process.env.REACT_APP_API_URL}/api/?i=${this.state.searchText}&p=${this.state.index}`
        }
        axios.get(proxyUrl + endpoint).then((res) => {
            this.setState(prev => {
                return {appData: [...prev.appData, ...res.data.results], isLoading: false}
            })
        }).catch((err) => {
            console.log(err.message);
        })

    };

    render() {
        const SearchPanel = ( <Search animate={this.state.removeLandingPage} defaultValue={this.state.searchText} onclickLoad={this.loadContent}
                                      onChangeHandleSearch={this.handleSearch}/>);

        return (
            <div ref={this.iScroll} style={{height: "100vh", overflow: "auto"}}>
                <Header text={"Recipe Search"} subText={"A search engine to find their recipes by the ingredients."}/>
                <LandingPage animate={this.state.removeLandingPage} searchPanel={SearchPanel} />

                <AppContent loadMore={this.loadMore} data={this.state.appData} updateSearch={this.updateSearch}
                            isLoading={this.state.isLoading}/>
            </div>
        )
    }

}

export default App;
