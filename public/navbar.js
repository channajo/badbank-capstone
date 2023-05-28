function NavBar() {
  const { user } = useAppContext();
  // let user = ctx.user;
  const [show, setshow] = React.useState(true);
  const history = ReactRouterDOM.useHistory();

  function handleLogout() {
    firebase.auth().signOut();
    history.push("/");
    // setshow(false);
    // user.email = null;
    // user.password = null;
    // user.balance = null;
    // user.name = null;
    // let activeuser = document.getElementById("activeuser");
    // activeuser.innerText = "Log In";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NotLoggedIn>
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
          </NotLoggedIn>

          <LoggedIn>
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/">
                Deposit
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/">
                Withdraw
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/balance/">
                Balance
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">
                AllData
              </a>
            </li>
          </LoggedIn>
        </ul>
        <NotLoggedIn>
          <a className="nav-link" data-toggle="tooltip" title="user email" href="#/login/" id="activeuser">
            Log In
          </a>
        </NotLoggedIn>
        <LoggedIn>
          <a className="nav-link" data-toggle="tooltip" title="logout" id="logout" href="#/login/" onClick={handleLogout}>
             "Logout" 
          </a>
          <a className="nav-link" data-toggle="tooltip" title="logout" id="logout" onClick={() => {}}>
            {user?.email}
          </a>
        </LoggedIn>
      </div>
    </nav>
  );
}
