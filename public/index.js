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

    return firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in:", user);
        const plainUser = user;
        //write the user to context
        contextDispatch({ action_type: "SET_USER", payload: { balance: 0, ...plainUser } });
      } else {
        console.log("User logged out");
        contextDispatch({ action_type: "SET_USER", payload: null });
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
