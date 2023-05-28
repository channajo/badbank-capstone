 function Home(){
  const {user} = useAppContext()
    return (
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title={`${user?.email}, Welcome to the bank`}
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
  }
  