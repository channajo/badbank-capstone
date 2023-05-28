// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { Home } from "./home";

function Spa() {
  const [user, setUser] = React.useState({
    name: "abel",
    email: "abel@mit.edu",
    password: "secret",
    balance: 100,
  });
  //firebase key
  const firebaseConfig = {
    apiKey: "AIzaSyCcnc1HKebgR8Om8QMDpf_653UP7h3kYQs",
    authDomain: "badbank-capstone-7dac5.firebaseapp.com",
    databaseURL: "https://badbank-capstone-7dac5-default-rtdb.firebaseio.com",
    projectId: "badbank-capstone-7dac5",
    storageBucket: "badbank-capstone-7dac5.appspot.com",
    messagingSenderId: "12632048590",
    appId: "1:12632048590:web:524734aa22935832fa619f",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //fb handle db
  const db = firebase.database();

  //changing user data
  const setAll = (name, email, password, balance) => {
    setUser({
      ...user,
      name: name,
      email: email,
      password: password,
      balance: balance,
    });
    console.log("setAll was called");
  };
  // const user =

  return (
    <HashRouter>
      <UserContext.Provider
        value={{
          users: [user],
          user,
        }}
      >
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          {/* <Route path="/transactions/" component={Transactions} /> */}
          <Route path="/balance/" component={Balance} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Spa />
//   </React.StrictMode>
// );
// root.render(<Spa />);

ReactDOM.render(<Spa />, document.getElementById("root"));
