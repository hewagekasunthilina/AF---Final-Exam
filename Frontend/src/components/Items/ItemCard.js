import React from "react";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: this.props.item};
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({item: nextProps.item});
    }

    onItemClick() {
        this.props.viewItem(this.state.item);
    }

    render() {
        return (
            <div
                className="card text-center card border-dark mb-3"
                style={{
                    width: "21.5rem",
                    maxHeight: "33.5rem",
                    minHeight: "33.5rem",
                    margin: "1rem",
                    padding: ".1rem",
                    backgroundColor: "#d6b5f7",
                }}
            >
                <div
                    className="align-items-center justify-content-center"
                    onClick={this.onItemClick}
                >
                    <img
                        src={this.state.item.image}
                        className="card-img-top"
                        alt={this.state.item.title}
                        style={{
                            maxHeight: "14rem",
                            maxWidth: "21rem",
                            minHeight: "14rem",
                            minWidth: "21rem",
                        }}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title" style={{fontWeight: "bolder"}}>{this.state.item.title}</h5>
                    <div className="row align-items-center justify-content-center">

                    </div>
                    <br/>
                    <small className="card-text">{this.state.item.body}</small>

                </div>
            </div>
        );
    }
}

export default ItemCard;
