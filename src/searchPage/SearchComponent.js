import React, {useEffect, useState} from 'react'; 
import "@aws-amplify/ui-react/styles.css";
import "../App.css";
import {API} from 'aws-amplify'
import { listGitHubProjects } from '../graphql/queries';
import SimpleSearchResult from './SimpleSearchResult'

import {
    Button,
    Flex,
    TextField,
    View,
  } from "@aws-amplify/ui-react";

  const SearchComponent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [noOfSearchResult, setNoOfSearchResult] = useState(-1);

    
    //useEffect(()=>{
    //    setNoOfSearchResult(-1);
    //  },[]);
    async function searchProjects(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const queryText = form.get('searchText').toLowerCase();

        let filter = {or:[
            {repo_name_lower: {contains:queryText} },
            {Description_lower: {contains:queryText} },
            {Topics_lower: {contains:queryText} },
            {model_files_lower: {contains:queryText} }

        ]};

        try{
            const apiData = await API.graphql({query: listGitHubProjects, variables:{filter} });
            const filteredGitHubProjects = apiData.data.listGitHubProjects.items;
            setSearchResults(filteredGitHubProjects);
            setNoOfSearchResult(filteredGitHubProjects.length);
           
        }catch(error){
            console.log("Error while fetching the query result",error)
        }
        
        //event.target.reset();

    }
    var searchBarJSX = (
    <View as="form" margin="3rem 0" onSubmit={searchProjects}>
        <Flex direction="row" justifyContent="center" alignItems="stretch">
            <TextField
                name="searchText"
                size="large"
                placeholder="Type 'control' to search for Simulink Projects"
                label="searchText"
                width = "50%"
                labelHidden
                variation="quiet"
                required
            />
            <Button type="submit" variation="primary">
                Search Simulink Project
            </Button>
        </Flex>
    </View>);

    if (noOfSearchResult===0){
        alert('No Simulink project found');

        return (<View className="App">  {searchBarJSX}  </View>);
        
    }else if (noOfSearchResult<0){
        return (<View className="App"> {searchBarJSX} </View>);
    }else {
        return (<View className="App">  
        {searchBarJSX}  
        <SimpleSearchResult projects={searchResults} total={noOfSearchResult}/>
        </View>);
    }
  }

  export default SearchComponent