import React from "react";
import axios from "./api/api";
import ItemsPage from "./components/Pages/ItemsPage";
import NavCustomer from "./components/nav/NavCustomer";
import NavStoreManager from "./components/nav/NavStoreManager";
import NavNotLogged from "./components/nav/NavNotLogged";
import "./App.css";

import AddItemPage from "./components/Pages/AddItemPage";
import EditItemsPage from "./components/Pages/EditItemsPage";
import LoginRegisterCustomer from "./components/User/LoginRegisterCustomer";
import EditProfile from "./components/User/EditProfile";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            selectedItemCount: 0,
            selectedItem: {},
            whereTo: "LoginRegister",
            user: {},
            role: "",
            totalPrice: 0.0,
            paymentInProcess: false,
        };

        this.onBuyBtnClick = this.onBuyBtnClick.bind(this);
        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.logOutUser = this.logOutUser.bind(this);
        this.handleSession = this.handleSession.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

        this.goToItems = this.goToItems.bind(this);
        this.goToAddItem = this.goToAddItem.bind(this);
        this.goToEditItems = this.goToEditItems.bind(this);
        this.goToLoginRegister = this.goToLoginRegister.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.viewItem = this.viewItem.bind(this);

		this.handleSession();
    }

	componentDidMount() {
		this.handleSession();
	}
	
    componentWillReceiveProps(nextProps) {
        this.setState({ item: nextProps.item });
    }
	
	handleSession() {
		if (localStorage.getItem("user") != null) {
			let user = localStorage.getItem("user");
			user = JSON.parse(user);
            this.setState({ user: user, role: user.role }, () => {
                if (localStorage.getItem("lastVisitedPage") != null) {
                    let lastVisitedPage = localStorage.getItem("lastVisitedPage");
                    this.setState({ whereTo: lastVisitedPage });
                }
            });
		}
	}

    onBuyBtnClick() {
        this.props.addItemToCart(this.state.item);
    }
	
    removeItemFromCart(item) {
        let indexToRemove = -1;
        let idToRemove = item.id;
        let selectedItems = this.state.selectedItems;

        selectedItems.map((selectedItem, index) => {
            let result = -1;
            if (selectedItem.id === idToRemove) { indexToRemove = index; result = index; }
            return result;
        });
        if (indexToRemove > -1) {
            selectedItems.splice(indexToRemove, 1);
        }

        this.setState({ selectedItems: selectedItems, selectedItemCount: selectedItems.length },
            this.calculateTotalPrice
        );
    }

    onSuccessfulLogin(user) {
        this.setState({ user: user, role: user.role }, this.goToItems());
		    localStorage.setItem("user", JSON.stringify(user));
    }

    logOutUser() {
        this.setState({ user: {}, role: "", whereTo: "LoginRegister" })
		localStorage.removeItem("user");
		localStorage.removeItem("lastVisitedPage");
    }

    updateProfile(user) {
      axios.put('/users', { user })
      .then(res => { 
        if (res.data.successful) {
          alert(`User ${user.name} updated successfully`); 
          localStorage.setItem("user", JSON.stringify(user));
          this.setState({ user: user });
        }
        else alert(`User ${user.name} failed to update because ${res.data.body}`);
      })
      .catch(error => { alert(`User ${user.name} failed to update because ${error}`); })
    }

    viewItem(item) {

        this.setState({ selectedItem: item }, () => { this.setState({ whereTo: "Item" }) });
    }
    goToPage(page) {
        this.setState({ whereTo: page });
        localStorage.setItem("lastVisitedPage", page);
    }
    goToItems() {
        this.setState({ whereTo: "ItemsPage" });
    }
    goToAddItem() {
        this.setState({ whereTo: "AddItemPage" });
    }
    goToEditItems() {
        this.setState({ whereTo: "EditItemsPage" });
    }
    goToLoginRegister() {
        this.setState({ whereTo: "LoginRegister" });
    }

    render() {
        let body;
        switch (this.state.whereTo) {
            case "ItemsPage":
                body = < ItemsPage addItemToCart = { this.addItemToCart }
                viewItem = { this.viewItem }
                addToWishList = { this.addToWishList }
                />; break;
            case "AddItemPage":
                body = < AddItemPage /> ;
                break;
            case "EditItemsPage":
                body = < EditItemsPage /> ;
                break;
            case "Profile":
                body = < EditProfile user={this.state.user} updateProfile={this.updateProfile}/> ;
                break;
            default:
                body =  < LoginRegisterCustomer onSuccessfulLogin = { this.onSuccessfulLogin }
                />; break;
        }

        let nav;
        switch (this.state.user.role) {
            case "customer":
                nav = < NavCustomer user = { this.state.user }
                goToPage = { this.goToPage }
                selectedItemCount = { this.state.selectedItemCount }
                logout = { this.logOutUser }
                />; break;
            case "manager":
                nav = < NavStoreManager user = { this.state.user }
                selectedItemCount = { this.state.selectedItemCount }
                goToPage = { this.goToPage }
                logout = { this.logOutUser }
                />; break;
            default:
                nav = < NavNotLogged goToPage = { this.goToPage }
                />; break;
        }

        return ( 
            <div >
            <div > { nav } </div> 
            <div className = "container-fluid" > { body } </div> 
            </div >
        );
    }
}

export default App;
