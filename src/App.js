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

  loadContent = (event) => {
    event.preventDefault();

    axios.get(`/api/?i=${this.state.searchText}&p=1`).then((res)=>{
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
            <Search onclickLoad={this.loadContent} onChangeHandleSearch={this.handleSearch} />
          </Header>
          <AppContent data={this.state.appData} isLoading={this.state.isLoading} />
        </>
    )
  }

}

export default App;
