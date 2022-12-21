const basetext = `# Welcome to my React Markdown Editor!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      text: basetext,
      preview: this.parseMarked(basetext)
    }
  }
  
  handleValue = (ev) => {
    console.log(ev.target.value);
    this.setState({
      text: ev.target.value,
      preview: this.parseMarked(ev.target.value)
    });
  }
  
  parseMarked = (val) =>{
    return  DOMPurify.sanitize(marked.parse(val, {breaks: true}))
  }
  
  render() {
    return(<>
        <Editor handleValue={this.handleValue} value={this.state.text}/>
        <Previewer output={this.state.preview} />
      </>);
  }
};

const Editor = ({handleValue, value}) => {
  return <div className={"editorWrap"}><h2 className={'title'}>Editor</h2><textarea id="editor" value={value} onChange={handleValue}/></div>
}

const Previewer = ({output}) => {
  return <div className={"previewWrap"}><h2 className={'title'}>Previewer</h2><div id="preview" dangerouslySetInnerHTML={{__html: output}}></div></div>
}

ReactDOM.render(<App/>, document.querySelector('.app'));