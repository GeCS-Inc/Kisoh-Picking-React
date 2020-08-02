import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Settings from "./Settings";
import Top from "./Top";

const Container = styled.div`
  padding: 48px;

  text-align: center;

  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <Container>
      <Router>
        <div>
          <Route exact path="/" component={Top} />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    </Container>
  );
}

export default App;
