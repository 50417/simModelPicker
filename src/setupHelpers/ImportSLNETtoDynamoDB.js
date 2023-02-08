import React, {useEffect, useState} from 'react';
import '../App.css';
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View
} from "@aws-amplify/ui-react";
import {listGitHubProjects} from '../graphql/queries'
import 
{createGitHubProjects as createGitHubProjectsMutation} from '../graphql/mutations';

const ImportSLNETtoDynamoDB = ()=> {
  const [gitHubProjects,setGitHubProjects] =  useState([]);

  useEffect(()=>{
    fetchGitHubProjects();
  },[]);

  async function fetchGitHubProjects(){
    const apiData = await API.graphql({query: listGitHubProjects});
    //console.log(apiData)
    const gitHubProjectsFromAPI = apiData.data.listGitHubProjects.items;
    setGitHubProjects(gitHubProjectsFromAPI);
  }

  async function createGitHubProjects(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    //const input_text = form.get('githubP');
    //const line_arr = input_text.split(/\r?\n/);
    //for(var i = 0 ; i< line_arr.length;i++){
      //  console.log(line_arr[i]);
      //  console.log('=======================')
    //}
    //return;
    var [id_key,r_name,o_name, i_private,p_url,desc,i_forked,a_url,c_at,u_at,p_at,h_url,s_kb,s_count,w_count,
    lang, f_count,o_count,m_branch,d_branch,topic,licen,m_files,n_files,v_sha] = form.get('githubP').split(';');
    //console.log(new Date(c_at))
    const data = {
        id: parseInt(id_key),
        repo_name: r_name,
        owner_name: o_name,
        is_private: i_private==="0"? false:true,
        project_url: p_url,
        Description: desc,
        is_forked: i_forked==="0"? false:true,
        api_url: a_url,
        created_at: new Date(c_at).toISOString(),
        updated_at: new Date(u_at).toISOString(),
        pushed_at: new Date(p_at).toISOString(),
        homepage_url: h_url,
        size_in_kb: s_kb===''?-1:parseInt(s_kb),
        stargazers_count: parseInt(s_count),
        watchers_count: parseInt(w_count),
        language: lang,
        forks_count: parseInt(f_count),
        open_issues_count: parseInt(o_count),
        master_branch: m_branch,
        default_branch: d_branch,
        Topics: topic,
        license: licen,
        model_files: m_files,
        num_model_file: parseInt(n_files),
        version_sha: v_sha,
        repo_name_lower: r_name.toLowerCase(),
        owner_name_lower: o_name.toLowerCase(),
        Description_lower: desc.toLowerCase(),
        Topics_lower: topic.toLowerCase(),
        model_files_lower: m_files.toLowerCase()
    };
    //console.log(data)
    try{
    await API.graphql({
      query: createGitHubProjectsMutation,
      variables: {input: data}
    });
  }catch(err){
    console.log(err)
  }
   
    fetchGitHubProjects();
    event.target.reset();
  }
  return (
    <View className="App">
    <Heading level={1}>GitHub Project</Heading>
    <View as="form" margin="3rem 0" onSubmit={createGitHubProjects}>
    <Flex direction="row" justifyContent="center">
          <TextField
          component="pre"
            name="githubP"
            placeholder="Enter row of data from SLNET"
            label="github Projects"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create GitHub Project
          </Button>
        </Flex>
      </View>
      <Heading level={2}>GitHub Project</Heading>
      <View margin="3rem 0">
        {gitHubProjects.map((githubproject) => (
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
      </View>
  );
}

export default ImportSLNETtoDynamoDB;
