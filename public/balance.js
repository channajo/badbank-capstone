function Balance() {
  // const db = firebase.database();
  // const [show, setShow] = React.useState(true);
  // const [balance, setBalance] = React.useState(UserContext);
  // const [email, setEmail] = React.useState(UserContext);
  // const user = React.useContext(UserContext);
  const { user, password, contextDispatch } = useAppContext();

  const fetchBalance = () => {
    //use password if it has a vaalue or ask the user to enter a password
    // const tempPassword = password ?? prompt("Enter your password to preceed");

    fetch(`/account/userdata/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        user.balance = data.balance;
        contextDispatch({ action_type: "SET_USER", payload: { ...user } });
      });
  };

  React.useEffect(fetchBalance, []);

  return (
    <Card
      bgcolor="primary"
      header="User Balance"
      body={
        user ? (
          <>
            Account: {user.email}
            <br />
            Balance: ${user.balance}
            <br />
          </>
        ) : (
          <></>
        )
      }
    />
  );
}
