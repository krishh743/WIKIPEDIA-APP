import React, {useState} from "react";
import './App.css';

function App() {
  const [wikiLinks, setWikiLinks] = useState([]);
  const [wikiLinkTexts, setWikiLinkTexts] = useState([]);

  // console.log(wikiLinks);
  // console.log(wikiLinkTexts);

  function makeApiCall(e) {
    let str = e.target.value;
    // console.log(e.target.value ? e.target.value : 'Not getting Event' );
    if(str) {
    let url = 'https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=' + str ;

    fetch(url)
    .then(data => {
      return data.json();
    }).then(json => {
      //console.log(json);
      setWikiLinks(wikiLinks => json[3]);
      setWikiLinkTexts(wikiLinkTexts => json[1]);
    })
    }
    else {
      setWikiLinks(wikiLinks => []);
      setWikiLinkTexts(wikiLinkTexts => []);
    }
  }

  // Debounce fn
  var timer;
  const searchHandler = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      makeApiCall(e);
      timer = undefined;
    }, 500);
    
  };


  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Wikipedia Search App</h3>
          </div>
          <div className="col-sm-12">
            <input type="text" class="search-text" onChange={searchHandler} />
          </div>
        </div>

        <div className="row display_links">
          <div className="col-sm-12">
            {
              wikiLinkTexts && wikiLinkTexts.map((item, index) => 
                <>
                <a href={wikiLinks[index]} target="_blank">{item}</a>
                <br/>
                </>
              )
            }
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;