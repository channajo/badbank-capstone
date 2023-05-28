function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const user = React.useContext(UserContext);
  const history = ReactRouterDOM.useHistory()

  //get elements
  const navWithdraw = document.getElementById("navWithdraw");
  const navDeposit = document.getElementById("navDeposit");
  const navAllData = document.getElementById("navAllData");
  const navBalance = document.getElementById("navBalance");
  const userNameDisplay = document.getElementById("name-display");
  const db = firebase.database();
  let currentUserEmail = ""; // variable to store the current user's email

  // validate if fields are filled in
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function updateCurrentUser(userEmail) {
    // userNameDisplay.innerHTML = userEmail;
    // currentUserEmail = userEmail;
    //currentUserBalance = userBalance;
  }

  function handleCreate() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    //login for FB
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then((resp) => {
      console.log("User Login Response: ", resp);
      updateCurrentUser(resp.user.email);
      //go to index/home page
      
      history.push('/')
    });

    promise.catch((e) => console.log(e.message));
    console.log(email, password);
    setShow(false);
    // alert("Please check the console to see if you have logged on.");

    // call to index.js
    // const url = `/account/${email}/info`;
    // (async () => {
    //   var res = await fetch(url);
    //   var data = await res.json();
    //   console.log(data);
    //   user.setAll(data.name, data.email, data.password, data.balance);
    // })();

    // // reset fields
    // setEmail("");
    // setPassword("");

    // enable the navbar buttons
    // navWithdraw.className = "nav-link";
    // navDeposit.className = "nav-link";
    // navAllData.className = "nav-link";
    // navBalance.className = "nav-link";
  }

  //log out of FB
  function clearForm() {
    firebase
      .auth()
      .signOut()
      .then((resp) => {
        console.log("Logout Response: ", resp);
        updateCurrentUser("");
      })
      .catch((e) => console.warn(e.message));

    // clear fields
    setEmail("");
    setPassword("");
    setShow(true);
    alert("You are logged out");

    navWithdraw.className = "nav-link disabled";
    navDeposit.className = "nav-link disabled";
    navAllData.className = "nav-link disabled";
    navBalance.className = "nav-link disabled";
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        <>
          Email
          <br />
          <input type="input" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <br />
          Password
          <br />
          <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <br />
          <p>
            <button type="submit" id="login" className="btn btn-light" onClick={handleCreate}>
              {" "}
              Login
            </button>

            <button type="submit" id="logout" className="btn btn-light" onClick={clearForm}>
              {" "}
              Clear
            </button>
          </p>
        </>
      }
    />
  );
}
