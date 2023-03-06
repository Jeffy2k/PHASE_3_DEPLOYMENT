import './App.css';
import SignForm from './components/signform ';
import { Switch,Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoginForm from './components/Login';
import Homepage from './components/Homepage';
import ProjectPage from './components/Projectpage';

function App() {

  const [myEmail, setEmail] = useState('');

  // Load the Email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("myEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Store the Email in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("myEmail", myEmail);
  }, [myEmail]);


  function exportValue(value) {
    console.log(value)
    setEmail(value);
  }

  console.log(myEmail);

  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
         <Homepage/>
        </Route>
        <Route exact path="/sign">
          <SignForm/>
        </Route>
        <Route exact path="/login">
          <LoginForm exportValue={exportValue}/>
        </Route>
        <Route exact path="/projectpage">
          <ProjectPage myEmail={myEmail}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
