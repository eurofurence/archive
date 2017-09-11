import { Component } from 'react';

class HeadAugmenter extends Component {
  constructor(props) {
    super(props);

    const isSubpage = !!this.props.match.params.year;
    const relativePrefix = isSubpage ? '../' : '';
    
    // <link rel="manifest" href="manifest.json">
    this.manifest = document.createElement('link');
    this.manifest.setAttribute('rel', 'manifest');
    this.manifest.setAttribute('href', relativePrefix + 'manifest.json');
    document.head.appendChild(this.manifest);

    // <link rel="shortcut icon" href="ef-icon.png">
    this.shortcut = document.createElement('link');
    this.shortcut.setAttribute('rel', 'shortcut icon');
    this.shortcut.setAttribute('href', relativePrefix + 'ef-icon.png');
    document.head.appendChild(this.shortcut);

    // <link rel="canonical" href="https://archive.eurofurence.org/">
    const linkContent = 'https://archive.eurofurence.org/' + (isSubpage ? (this.props.match.params.year + '/') : '')
    this.canonical = document.createElement('link');
    this.canonical.setAttribute('rel', 'canonical');
    this.canonical.setAttribute('href', linkContent);
    document.head.appendChild(this.canonical);
  }

  componentWillUnmount() {
    [this.manifest, this.shortcut, this.canonical].forEach(el => {
      el.parentNode.removeChild(el);
    });
  }

  render() {
    return null;
  }
}

export default HeadAugmenter;
