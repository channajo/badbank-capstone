
function NavBar(){
    const ctx = React.useContext(UserContext);
    let user = ctx.user;
    const [show, setshow] = React.useState(true);
    function handleLogout() {
  
        firebase.auth().signOut();
        setshow(false);
        user.email = null;
        user.password = null;
        user.balance = null;
        user.name = null;
        let activeuser = document.getElementById('activeuser');
        activeuser.innerText = "Log In";
  
    }
      return(
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">BadBank</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/CreateAccount/">Create Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">Balance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/alldata/">AllData</a>
              </li>          
            </ul>
            <a className="nav-link" data-toggle="tooltip" title="user email" href="#/login/" id="activeuser">
               Log In </a>
            <a className="nav-link" data-toggle="tooltip" title="logout" id="logout" href="#/login/" onClick={handleLogout}>{user.email ? "Logout" : "Logout"}</a>
          </div>
        </nav>
    
      );
    }