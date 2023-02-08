import ImportSLNETtoDynamoDB from './setupHelpers/ImportSLNETtoDynamoDB'
import SearchComponent from './searchPage/SearchComponent'

const App = ()=> {
 
  return (<div>
    <ImportSLNETtoDynamoDB/>
    <SearchComponent/>
    </div>
  );
}

export default App;
