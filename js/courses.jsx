class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={"result"}>
        <h3>{this.props.title}</h3>
        <h4>code</h4>
        <div className={"result-box"}>
          <div className={"code"}>
            {this.props.code}
          </div>
        </div>
        <h4>text</h4>
        <div className={"result-box"}>
          <div className={"text"}>
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      data: null
    };
  }

  onFocus = () => {
    document.getElementById('main').style.visibility = 'hidden'
    // document.getElementById('tab').style.visibility = 'hidden'
  };

  onBlur = () => {
    document.getElementById('main').style.visibility = 'visible'
    // document.getElementById('tab').style.visibility = 'visible'

  };


  searchKeyword = () => {
    let keyword = document.getElementsByClassName('keyword').item(0).value;
    console.log(keyword);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/api?msg=' + keyword);
    xhr.onload = () => {
      if (xhr.status === 200) {
        let parseElement = JSON.parse(xhr.responseText)['data'];
        console.log(parseElement);
        this.setState({
          data: parseElement
        })
      } else {
        console.log(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.log(xhr.statusText);
    };
    xhr.send();

    // console.log(document.getElementsByClassName('keyword').item(0));
  };

  ret = () => {
    return (
      <form>
        <input className={'keyword'} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.searchKeyword}/>
        <button onClick={this.searchKeyword}>search</button>
        <Result title={"title"} code={"code"} text={"text"}/>
        <h1>Hi</h1>
      </form>
    )
  }

  render() {
    if (this.state.data) {
      return (

        <div>
          <input className={'keyword'} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.searchKeyword}/>
        {this.state.data.map((value) => {
          let title = value['title'][0];
          let text = value['text'][0];
          let code = value['code'][0];

          return <Result title={title} text={text} code={code}/>
        })
        }</div>
      );

    }
    return (
      <form>
        <input className={'keyword'} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.searchKeyword}/>
      </form>
    );
  }
}

const search_bar = document.getElementById('search-bar');

ReactDOM.render(<App/>, search_bar);
