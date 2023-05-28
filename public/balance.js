function Balance() {
  // const db = firebase.database();
  // const [show, setShow] = React.useState(true);
  // const [balance, setBalance] = React.useState(UserContext);
  // const [email, setEmail] = React.useState(UserContext);
  // const user = React.useContext(UserContext);
  const {user} = useAppContext()

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
