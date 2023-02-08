import React, {useEffect, useState} from 'react'; 

import "@aws-amplify/ui-react/styles.css";
import "../App.css";
import {API} from 'aws-amplify'
import { listGitHubProjects } from '../graphql/queries';
import {
    Button,
    Flex,
    Text,
    TextField,
    View,
    Card,
    Link,
    Grid,
    useTheme
  } from "@aws-amplify/ui-react";

  const SearchComponent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [noOfSearchResult, setNoOfSearchResult] = useState(-1);

    const { tokens } = useTheme();
    useEffect(()=>{
        setNoOfSearchResult(-1);
      },[]);
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
    return (
        <View className="App">
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
            </View>
            {
            noOfSearchResult===0?alert('No Simulink project found'):
            <View backgroundColor={tokens.colors.background.primary}
            padding={tokens.space.xxxl}>
                <Flex 
                        key="noOfSearchResult" 
                        direction="row"
                        justifyContent="center"
                    
                        >
                <Text width="80%" variation="primary" as="p" style={{textAlign: 'left'}} alignItems="left">Search Results: {noOfSearchResult}</Text>
                </Flex>
                {searchResults.map((githubproject) => (
                        <Flex 
                        key={githubproject.id || githubproject.repo_name} 
                        direction="row"
                        justifyContent="center"
                        >
                            <Card width="80%" margin="10px" backgroundColor={tokens.colors.background.secondary} variation="elevated">
                                <Grid
                                templateColumns="1fr 1fr 1fr 1fr"
                                templateRows="1fr 1fr"
                                rowGap="1.2rem"
                                >
                                    <Grid item="true" columnStart="1"  columnEnd ="2" justifyContent="left" >
                                        <Link href= {githubproject.project_url} isExternal="true">{githubproject.repo_name}</Link>
                                    </Grid>
                                    <Grid item="true" justifyContent="left"  columnStart="2"  columnEnd ="-1">
                                        <Text isTruncated={true}>{githubproject.Description}</Text>
                                    </Grid>
                                    <Grid item="true"  columnStart="1"  columnEnd ="2" justifyContent="left" >
                                        <Text isTruncated={true}>{githubproject.license}</Text>
                                    </Grid>
                                    <Grid item="true" justifyContent="left"  columnStart="2"  columnEnd ="3">
                                        <Text isTruncated={true}>Updated on {githubproject.updated_at}</Text>
                                    </Grid>

                                    <Grid item justifyContent="right"  columnStart="4"  columnEnd ="-1">
                                        <Link >Show Full Project Metadata</Link>
                                    </Grid>
                                </Grid>
                            </Card>
                            <br/>
                            <br/>
                            
                        </Flex>
                        

                ))}
    <br/>
                            <br/>
                            <br/><br/><br/>
                            <br/>
                            <br/><br/>
            </View>
            }
        </View>
    );
  }

  export default SearchComponent