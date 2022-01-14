import React from "react";
import ReactDOM from "react-dom";

export default class Popup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = this.props.username;
    this.newWindow = null;
  }

  componentDidMount() {
    this.newWindow = window.open(
      this.props.url,
      this.props.username,
      this.props.style
    );
    this.newWindow.document.body.appendChild(this.el);
    this.newWindow.document.title = this.props.username;
    this.newWindow.onkeydown = (e) => {
      if (e.key === "Escape") {
        this.props.callback(false);
        this.newWindow.close();
      }
    };
  }

  componentWillUnmount() {
    this.newWindow.close();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
