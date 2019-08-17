import React from 'react';
import {Header} from './components/Header'
import {Search} from './components/Search'

import axios from 'axios';
import './app.global.scss';
import {AppContent} from "./components/AppContent";

class App extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {appData:[],searchText:"",isLoading:true}
    this.loadContent = this.loadContent.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/?i=onions,garlic&p=3').then((res)=>{
    //   this.setState({appData:res.data.results})
    // }).catch((err)=>{
    //   console.log(err.message);
    // })
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.setState({searchText:event.target.value})
  }

  updateSearch = (event,newvalue) => {
    event.preventDefault();
       const newAppData = this.state.appData.filter((obj)=>obj.ingredients.includes(newvalue));
       console.log(newAppData);
    this.setState((prev)=>{
      return {
        searchText: prev.searchText+", "+newvalue,
        appData: newAppData
      }
    });
  }

  loadContent = (event) => {
    event.preventDefault();
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var endpoint = `/api/?i=${this.state.searchText}&p=1`;
    if(process.env.REACT_APP_API_URL)
    {
      endpoint = `${process.env.REACT_APP_API_URL}/api/?i=${this.state.searchText}&p=1`
    }
      axios.get(proxyUrl+endpoint).then((res)=>{
        this.setState({appData:res.data.results,isLoading:false})
      }).catch((err)=>{
        console.log(err.message);
      })

  }

  render()
  {
    return (
        <>
          <Header text={"Recipe Search"} subText={"A search engine to find their recipes by the ingredients"}>
            <Search defaultValue={this.state.searchText} onclickLoad={this.loadContent} onChangeHandleSearch={this.handleSearch} />
          </Header>
          <AppContent data={this.state.appData} updateSearch={this.updateSearch} isLoading={this.state.isLoading} />
        </>
    )
  }

}

export default App;
