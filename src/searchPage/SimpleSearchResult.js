import ScrollDialog from './ScrollDialog';
import {
    Flex,
    Text,
    View,
    Card,
    Link,
    Grid,
    useTheme
  } from "@aws-amplify/ui-react";
  
export default function SimpleSearchResult(props){
    const { tokens } = useTheme();
    return (
                <View backgroundColor={tokens.colors.background.primary}
                padding={tokens.space.xxxl}>
                    <Flex 
                            key="noOfSearchResult" 
                            direction="row"
                            justifyContent="center"
                            >
                    <Text width="80%" variation="primary" as="p" style={{textAlign: 'left'}} alignItems="left">
                        Search Results: {props.total}</Text>
                    </Flex>
                    {props.projects.map((githubproject) => (
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
    
                                        <Grid item="true" justifyContent="right"  columnStart="4"  columnEnd ="-1">
                                           <ScrollDialog label="Show Full Project Metadata" metadata={JSON.stringify(githubproject,null, 4)}/>
                                        </Grid>
                                    </Grid>
                                </Card>
                                
                            </Flex>
                            
    
                    ))
                }
            </View>
        );
}