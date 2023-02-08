import React, {useEffect, useState} from 'react';

import "@aws-amplify/ui-react/styles.css";
import "../App.css";
import {API} from 'aws-amplify'
import { listGitHubProjects } from '../graphql/queries';
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
  } from "@aws-amplify/ui-react";

  const SearchComponent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [noOfSearchResult, setNoOfSearchResult] = useState(-1);
    useEffect(()=>{
        setNoOfSearchResult(-1);
      },[]);
    async function searchProjects(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const queryText = form.get('searchText').toLowerCase();
        console.log('queryText');
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
        event.target.reset();

    }
    return (
        <View className="App">
            <View as="form" margin="3rem 0" onSubmit={searchProjects}>
                <Flex direction="row" justifyContent="center">
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
            </View>
            {
            noOfSearchResult===0?alert('No Simulink project found'):
            <View margin="3rem 0">
                {searchResults.map((githubproject) => (
                <Flex
                key={githubproject.id || githubproject.repo_name}
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                <Text as="strong" fontWeight={700}>
                    {githubproject.repo_name}
                </Text>
                <Text as="span">{githubproject.owner_name}</Text>
                <Text as="span">{githubproject.Description}</Text>

                </Flex>
                ))}
            </View>
            }
        </View>
    );
  }

  export default SearchComponent