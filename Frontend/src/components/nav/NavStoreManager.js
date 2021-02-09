import React from "react";

class NavStoreManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedItemCount: 0, user: this.props.user};

        this.onNavItemClick = this.onNavItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedItemCount: nextProps.selectedItemCount, user: nextProps.user});
    }

    onNavItemClick(e) {
        let clickedItem = e.target.id;

        switch (clickedItem) {
            case "items":
                this.props.goToPage("ItemsPage");
                break;
            case "add-item":
                this.props.goToPage("AddItemPage");
                break;
            case "edit-items":
                this.props.goToPage("EditItemsPage");
                break;
            case "name":
                this.props.goToPage("Profile");
                break;
            case "logout":
                this.props.logout();
                break;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#202C55"}}>
                <div className="container-fluid">
          <span className="navbar-brand" href="#" style={{
              color: "#FFD9D9",
              fontSize: "2rem",
              marginRight: "5%",
              fontFamily: "Cairo, sans-serif",
              fontWeight: "bold",
              fontStyle: "oblique"
          }}>
            TRIP MAN
          </span>
                    <span
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
            <span className="navbar-toggler-icon"></span>
          </span>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                <span id="items" className="nav-link" href="#"
                      style={{marginRight: "2rem", color: "#ffffff", marginTop: "-.2rem"}}
                      onClick={this.onNavItemClick}>
                  PLACES
                </span>
                            </li>
                            <li className="nav-item">
                <span id="add-item" className="nav-link" href="#"
                      style={{marginRight: "2rem", color: "#ffffff", marginTop: "-.2rem"}}
                      onClick={this.onNavItemClick}>
                  NEW PLACE
                </span>
                            </li>
                            <li className="nav-item">
                <span id="edit-items" className="nav-link" href="#"
                      style={{marginRight: "2rem", color: "#ffffff", marginTop: "-.2rem"}}
                      onClick={this.onNavItemClick}>
                  UPDATE PLACE
                </span>
                            </li>
                        </ul>
                        <span id="name" style={{color: "#ffffff"}} onClick={this.onNavItemClick}>
              Hi {this.state.user.name}!
            </span>
                        <span id="logout" style={{marginLeft: "2rem"}}>
                <span id="logout" className="btn btn-danger" href="#" onClick={this.onNavItemClick}>
                  Log out
                </span>
              </span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavStoreManager;
