const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

const useAppContext = () => {
  const ctx = React.useContext(UserContext);
  return ctx;
};
const useUserContext = () => {
  const { user } = useAppContext();
  return user;
};

const LoggedIn = ({ children }) => {
  const { user } = useAppContext();

  return ![null, undefined].includes(user) ? children : <></>;
};

const NotLoggedIn = ({ children }) => {
  const { user } = useAppContext();
  return [null, undefined].includes(user) ? children : <></>;
};

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

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
