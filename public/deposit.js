function Deposit() {
  const { user, contextDispatch } = useAppContext();
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [depositAmount, setDepositAmount] = React.useState(0);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function balanceDeposit() {
    if (!validate(depositAmount, "balance")) return;

    // user.balance = +parseInt(depositAmount);

    const url = `/account/${user.email}/deposit/${depositAmount}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      contextDispatch({ action_type: "SET_BALANCE", payload: user.balance + parseInt(depositAmount) });
      console.log(data);
    })();

    console.log("Remaining Balance: $" + user.balance);
    setShow(false);
    return user.balance;
  }

  function clearForm() {
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <>
            Account: {user.email}
            <br />
            Balance: ${user.balance}
            <br />
            <input
              type="number"
              className="form-control"
              id="balance"
              placeholder="Enter amount to Deposit"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" onClick={balanceDeposit}>
              {" "}
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success! Remaining balance: ${user.balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              clear
            </button>
          </>
        )
      }
    />
  );
}
