const appReducer = (state, { action_type, payload }) => {
  let result = state;
  switch (action_type) {
    case "SET_USER":
      result = { ...state, user: payload };
      break;
    /**
     * add a new action using the template above
     */
    case "SET_BALANCE": {
      const user = { ...state.user, balance: payload };
      result = { ...state, user };
      break;
    }
    case "SET_PASSWORD": {
      result = { ...state, password: payload };
      break;
    }
    case "CLEAR_PASSWORD": {
      result = { ...state, password: undefined };
      break;
    }
    default:
      console.log("no state change");
  }
  return result;
};

const defaultUser = {
  name: "abel",
  email: "abel@mit.edu",
  password: "secret",
  balance: 100,
};

function AppContext({ children }) {
  const [store, contextDispatch] = React.useReducer(appReducer, {
    user: undefined,
    password: undefined,
  });
  const useEffect = React.useEffect;

  //changing user data
  // const setAll = (name, email, password, balance) => {
  //   setUser({
  //     ...user,
  //     name: name,
  //     email: email,
  //     password: password,
  //     balance: balance,
  //   });
  //   console.log("setAll was called");
  // };

  function watchFirebaseAuthUser() {
    const firebaseAuth = firebase.auth();

    return firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User logged in:", user);
        const plainUser = user;

        const balance = await fetch(`/account/userdata/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            return data.balance;
          })
          .catch(() => 0);
        //write the user to context
        contextDispatch({ action_type: "SET_USER", payload: { balance, ...plainUser } });
      } else {
        console.log("User logged out");
        contextDispatch({ action_type: "SET_USER", payload: null });
        contextDispatch({ action_type: "CLEAR_PASSWORD" });
      }
    });
  }

  useEffect(() => watchFirebaseAuthUser(), []);

  return (
    <UserContext.Provider
      value={{
        // users: [user],
        ...store,
        contextDispatch,
      }}
    >
      {store.user === undefined ? <>Loading...</> : children}
    </UserContext.Provider>
  );
}

function Spa() {
  const { user, contextDispatch } = useAppContext();

  return (
    <HashRouter>
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
    </HashRouter>
  );
}

ReactDOM.render(
  <AppContext>
    <Spa />
  </AppContext>,
  document.getElementById("root")
);
